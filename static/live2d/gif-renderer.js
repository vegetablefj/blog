const modes = ["loop", "speed-follow", "range-follow"];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function createGifPlayback({
  mode = "loop",
  durations,
  top = 0.2,
  bottom = 0.9,
  followMs = 150,
  minRate = 0.5,
  maxRate = 2,
  startFrame = 0,
  endFrame,
  frameHeight,
  rangeScale,
}) {
  if (!modes.includes(mode) || !Array.isArray(durations) || !durations.length ||
      durations.some(ms => !Number.isFinite(ms) || ms <= 0)) {
    throw new Error("Invalid GIF playback mode or frame durations");
  }
  const lastFrame = durations.length - 1;
  endFrame ??= lastFrame;
  const isFrame = frame => Number.isInteger(frame) && frame >= 0 && frame <= lastFrame;
  if (mode === "range-follow" && ![startFrame, endFrame].every(isFrame)) {
    throw new Error("GIF frame range is outside the atlas");
  }
  if (rangeScale !== undefined && (mode !== "range-follow" || !Number.isInteger(frameHeight) ||
      !isFrame(rangeScale?.frame) || [rangeScale.from, rangeScale.to].some(bounds =>
        !Number.isInteger(bounds?.top) || !Number.isInteger(bounds?.bottom) ||
        bounds.top < 0 || bounds.top >= bounds.bottom || bounds.bottom > frameHeight))) {
    throw new Error("Invalid GIF range scaling frame or bounds");
  }
  if (mode !== "loop" && (![top, bottom, followMs].every(Number.isFinite) ||
      top < 0 || top >= bottom || bottom > 1 || followMs < 0)) {
    throw new Error("Invalid GIF pointer bounds or follow time");
  }
  if (mode === "speed-follow" && (![minRate, maxRate].every(Number.isFinite) || minRate <= 0 || maxRate <= minRate)) {
    throw new Error("GIF minimum speed must be positive and below maximum speed");
  }

  let period = 0;
  const frameEnds = durations.map(ms => (period += ms));
  let elapsed = 0;
  let progress = mode === "speed-follow" ? clamp((1 - minRate) / (maxRate - minRate), 0, 1) : 0;
  let target = progress;

  return {
    get moving() {
      return mode !== "range-follow" || progress !== target;
    },
    setPointer(y, viewportHeight) {
      if (mode !== "loop" && viewportHeight > 0) {
        target = clamp((bottom - y / viewportHeight) / (bottom - top), 0, 1);
      }
    },
    advance(delta) {
      if (progress !== target) {
        // Treat followMs as the time to cover about 95% of the remaining distance.
        const blend = followMs === 0 ? 1 : -Math.expm1(-3 * delta / followMs);
        progress += (target - progress) * blend;
        if (Math.abs(target - progress) < 0.001) progress = target;
      }
      if (mode === "range-follow") {
        return rangeScale ? progress : Math.round(startFrame + (endFrame - startFrame) * progress);
      }

      const rate = mode === "speed-follow" ? minRate + (maxRate - minRate) * progress : 1;
      elapsed = (elapsed + delta * rate) % period;
      return frameEnds.findIndex(end => elapsed < end);
    },
  };
}

export async function prepareGifRole(manifestUrl, manifest) {
  const { image, frameWidth, frameHeight, columns, durations, displayScale = 1 } = manifest;
  if (typeof image !== "string" || !image.trim() ||
      ![frameWidth, frameHeight, columns].every(n => Number.isInteger(n) && n > 0) ||
      !Number.isFinite(displayScale) || displayScale <= 0) {
    throw new Error("Invalid GIF atlas dimensions, image path, or display scale");
  }
  const playback = createGifPlayback(manifest);
  // Fetch with CORS so the canvas can be read for hit testing and photos.
  const response = await fetch(new URL(image, manifestUrl), { signal: AbortSignal.timeout(12_000) });
  if (!response.ok) throw new Error("Could not load GIF atlas: " + response.status);
  const bitmap = await createImageBitmap(await response.blob());
  try {
    const rows = Math.ceil(durations.length / columns);
    if (bitmap.width < columns * frameWidth || bitmap.height < rows * frameHeight) {
      throw new Error("GIF atlas is too small for the declared frames");
    }
    return createGifCanvas(bitmap, manifest, playback);
  } catch (error) {
    bitmap.close();
    throw error;
  }
}

function createGifCanvas(bitmap, { frameWidth, frameHeight, columns, mode = "loop", rangeScale, displayScale = 1 }, playback) {
  const canvas = document.createElement("canvas");
  canvas.id = "live2d";
  canvas.width = 600;
  canvas.height = 470;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create a 2D context for the GIF role");
  const scale = Math.min(canvas.width / frameWidth, canvas.height / frameHeight) * displayScale;
  const width = frameWidth * scale;
  const height = frameHeight * scale;
  const left = (canvas.width - width) / 2;
  const top = canvas.height - height;
  let currentPosition = -1;
  let widget;
  let observer;
  let request;
  let previousTime;
  let disposed = false;

  function drawFrame(frame, sourceTop = 0, sourceBottom = frameHeight,
      targetTop = sourceTop, targetBottom = sourceBottom) {
    context.drawImage(bitmap, (frame % columns) * frameWidth, Math.floor(frame / columns) * frameHeight + sourceTop,
      frameWidth, sourceBottom - sourceTop, left, top + targetTop * scale, width, (targetBottom - targetTop) * scale);
  }

  function drawRange(progress) {
    const { frame, from, to } = rangeScale;
    const targetTop = from.top + (to.top - from.top) * progress;
    const targetBottom = from.bottom + (to.bottom - from.bottom) * progress;
    drawFrame(frame, to.top, to.bottom, targetTop, targetBottom);
  }

  function draw(position) {
    if (position === currentPosition) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (rangeScale) drawRange(position);
    else drawFrame(position);
    currentPosition = position;
  }

  function visible() {
    return !disposed && !document.hidden && canvas.isConnected &&
      widget.classList.contains("waifu-active") && !widget.classList.contains("live2d-switching");
  }

  function pause() {
    if (request !== undefined) cancelAnimationFrame(request);
    request = undefined;
    previousTime = undefined;
  }

  function schedule() {
    if (!visible()) {
      pause();
      return;
    }
    if (request !== undefined || !playback.moving) return;
    previousTime ??= performance.now();
    request = requestAnimationFrame(now => {
      request = undefined;
      if (visible()) {
        draw(playback.advance(Math.max(0, now - previousTime)));
        previousTime = playback.moving ? now : undefined;
      }
      schedule();
    });
  }

  function onPointer(event) {
    if (event.pointerType === "touch" || !visible()) return;
    playback.setPointer(event.clientY, window.innerHeight);
    schedule();
  }

  function onClick(event) {
    if (!visible()) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) * canvas.width / rect.width);
    const y = Math.floor((event.clientY - rect.top) * canvas.height / rect.height);
    if (x >= 0 && y >= 0 && x < canvas.width && y < canvas.height &&
        context.getImageData(x, y, 1, 1).data[3] > 16) {
      window.dispatchEvent(new Event("live2d:character-interaction"));
    }
  }

  // Prepare the first frame before replacing the old role's canvas.
  draw(playback.advance(0));
  return {
    canvas,
    mount(container) {
      widget = container;
      observer = new MutationObserver(schedule);
      observer.observe(container, { attributes: true, attributeFilter: ["class"] });
      document.addEventListener("visibilitychange", schedule);
      if (mode !== "loop") window.addEventListener("pointermove", onPointer);
      canvas.addEventListener("click", onClick);
      schedule();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      pause();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("click", onClick);
      bitmap.close();
    },
  };
}
