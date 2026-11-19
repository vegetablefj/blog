import { pickNextIndex } from "./selection.js";

const activeCandidates = new WeakMap();
const installedApps = new WeakSet();
export const presets = {
  atri: [
    { label: "默认", values: {} },
    { label: "睡衣", values: { Param18: 30 } },
    { label: "南瓜睡衣", values: { Param18: 30, Param9: 30 } },
    { label: "泳装", values: { Param17: 30 } },
  ],
  bocchi: [
    { label: "默认", values: {} },
    { label: "眼镜", values: { Param29: 1 } },
    { label: "箱子", values: { Param30: 1 } },
  ],
};

function candidateKind(url) {
  const href = new URL(url, location.href).href;
  return ["hiyori", "atri", "bocchi", "murasame"].find(kind =>
    href.startsWith(new URL(`candidates/${kind}/`, import.meta.url).href)
  );
}

function applyOutfit(state, index) {
  const rig = state.model.getModel();
  const outfit = presets[state.kind][index];
  rig.loadParameters();
  for (const [name, parameter] of state.parameters) {
    rig.setParameterValueByIndex(parameter.index, outfit.values[name] ?? parameter.defaultValue);
  }
  rig.saveParameters();
  state.outfit = index;
}

function maskBufferCount(rig) {
  const groups = new Set();
  const masks = rig.getDrawableMasks();
  const counts = rig.getDrawableMaskCounts();
  for (let index = 0; index < counts.length; index++) {
    if (counts[index] > 0) {
      groups.add(Array.from(masks[index]).slice(0, counts[index]).sort((a, b) => a - b).join(","));
    }
  }
  return groups.size <= 36 ? 1 : Math.ceil(groups.size / 32);
}

function visibleClickPosition(app, event) {
  const subdelegate = app.subdelegates.at(0);
  const canvas = subdelegate.getCanvas();
  if (event.target !== canvas) return;
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * canvas.width / rect.width;
  const y = (event.clientY - rect.top) * canvas.height / rect.height;
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
  const gl = subdelegate.getGlManager().getGl();
  if (!gl || gl.isContextLost()) return;
  const pixel = new Uint8Array(4);
  gl.readPixels(Math.floor(x), canvas.height - Math.floor(y) - 1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
  if (pixel[3] > 16) return { x, y };
}

function clearFace(state) {
  if (state.timer === undefined) return;
  clearTimeout(state.timer);
  state.timer = undefined;
  state.model._expressionManager.stopAllMotions();
}

function interact(app, event) {
  const state = activeCandidates.get(app);
  if (!state?.ready) return;
  const position = visibleClickPosition(app, event);
  if (!position) return;
  window.dispatchEvent(new Event("live2d:character-interaction"));
  const model = state.model;

  if (state.kind === "hiyori" || state.kind === "murasame") {
    // The portrait is scaled in CSS, so hit testing uses canvas pixels before scaling.
    const view = app.subdelegates.at(0)._view;
    const x = view.transformViewX(position.x);
    const y = view.transformViewY(position.y);
    if (state.kind === "hiyori" && !model.hitTest("Body", x, y)) return;

    const priority = 2;
    const queue = model._motionManager;
    if (queue.getCurrentPriority() >= priority || queue.getReservePriority() >= priority) return;
    if (state.kind === "hiyori" || !model.hitTest("face", x, y)) {
      const count = model._modelSetting.getMotionCount("TapBody");
      const index = pickNextIndex(count, state.motion, "interaction");
      if (index >= 0) {
        clearFace(state);
        model.startMotion("TapBody", index, priority);
        state.motion = index;
      }
      return;
    }
  }

  const index = pickNextIndex(state.faces.length, state.face, "interaction");
  if (index < 0 || !model._expressions.getValue(state.faces[index])) return;
  clearFace(state);
  model.setExpression(state.faces[index]);
  state.face = index;
  state.timer = setTimeout(() => clearFace(state), 1500);
}

export function installCandidateInputs(app) {
  if (installedApps.has(app)) return;
  installedApps.add(app);
  const transform = app.transformOffset.bind(app);
  app.transformOffset = event => transform({
    pageX: event.clientX ?? event.pageX,
    pageY: event.clientY ?? event.pageY,
  });

  const manager = app.subdelegates.at(0).getLive2DManager();
  const nativeTap = manager.onTap.bind(manager);
  manager.onTap = (x, y) => {
    if (!activeCandidates.has(app)) nativeTap(x, y);
  };
  const click = event => interact(app, event);
  document.addEventListener("click", click);
  const release = app.release.bind(app);
  app.release = () => {
    clearTimeout(activeCandidates.get(app)?.timer);
    activeCandidates.delete(app);
    document.removeEventListener("click", click);
    release();
  };
}

export function setupCandidateModel(app, url) {
  clearTimeout(activeCandidates.get(app)?.timer);
  activeCandidates.delete(app);
  const kind = candidateKind(url);
  if (!kind) return;
  const model = app.subdelegates.at(0).getLive2DManager()._models.at(0);
  const state = {
    kind, model, ready: false, parameters: new Map(),
    faces: [], face: -1, motion: -1, outfit: 0, timer: undefined,
  };
  activeCandidates.set(app, state);
  const createRenderer = model.createRenderer.bind(model);
  model.createRenderer = () => {
    const rig = model.getModel();
    createRenderer(maskBufferCount(rig));
    const setting = model._modelSetting;
    state.faces = Array.from({ length: setting.getExpressionCount() }, (_, index) =>
      setting.getExpressionName(index)
    ).filter(name => name.startsWith("face-"));
    if (presets[kind]) {
      const names = new Set(presets[kind].flatMap(outfit => Object.keys(outfit.values)));
      for (let index = 0; index < rig.getParameterCount(); index++) {
        const name = rig.getParameterId(index).getString().s;
        if (names.has(name)) {
          state.parameters.set(name, { index, defaultValue: rig.getParameterDefaultValue(index) });
        }
      }
      applyOutfit(state, state.outfit);
    }
    state.ready = true;
  };
}

export function cycleCandidateOutfit(app) {
  const state = activeCandidates.get(app);
  if (!state?.ready || !presets[state.kind]) return;
  const next = pickNextIndex(presets[state.kind].length, state.outfit, "outfit");
  applyOutfit(state, next);
  return presets[state.kind][next].label;
}
