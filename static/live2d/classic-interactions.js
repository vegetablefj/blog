import { pickNextIndex } from "./selection.js";

// Adapter for the pinned Cubism 2 renderer.
export function enableClassicInteractions(renderer) {
  const initCanvas = renderer.initL2dCanvas.bind(renderer);
  const originalTap = renderer.modelTurnHead.bind(renderer);
  const pixel = new Uint8Array(4);
  const latestMotions = new WeakMap();

  renderer.initL2dCanvas = id => {
    initCanvas(id);
    // The renderer's wheel listener also prevents the browser from scrolling.
    renderer.canvas.removeEventListener("mousewheel", renderer._boundMouseEvent);
  };

  renderer.modelTurnHead = event => {
    const { live2DMgr: manager, canvas, gl } = renderer;
    const model = manager.model;
    if (!model || manager.reloading || event.button > 0) return;

    const settings = model.modelSetting;
    const head = settings.getHitAreaCustom()?.head_y;
    if (!head?.length || !settings.getMotionNum("flick_head")) {
      originalTap(event);
      return;
    }

    if (!gl || gl.isContextLost()) return;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (!(x >= 0 && x < 1 && y >= 0 && y < 1)) return;

    // The renderer preserves a transparent framebuffer, including the current costume and pose.
    const pixelX = Math.floor(x * gl.drawingBufferWidth);
    const pixelY = gl.drawingBufferHeight - 1 - Math.floor(y * gl.drawingBufferHeight);
    gl.readPixels(pixelX, pixelY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    if (pixel[3] < 16) return;

    const modelY = renderer.transformViewY(y * canvas.height);
    const isHead = modelY >= Math.min(...head);
    const group = isHead ? "flick_head" : "tap_body";
    const count = settings.getMotionNum(group);
    const priority = 2;
    const queue = model.mainMotionManager;
    if (count && queue.getCurrentPriority() < priority && queue.getReservePriority() < priority) {
      let history = latestMotions.get(model);
      if (!history) latestMotions.set(model, history = new Map());
      const index = pickNextIndex(count, history.get(group), "interaction");
      model.startMotion(group, index, priority);
      history.set(group, index);
    }
    window.dispatchEvent(new Event("live2d:character-interaction"));
  };
}
