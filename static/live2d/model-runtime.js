import { enableClassicInteractions } from "./classic-interactions.js";
import { installCandidateInputs, setupCandidateModel } from "./cubism-candidates.js?v=production-2";
import { prepareGifRole } from "./gif-renderer.js?v=production-1";
import { applyPortrait } from "./portrait.js?v=production-2";
import { waitForCubism2Frame, waitForCubism5Frame } from "./renderer-ready.js";

export function isManifestUrl(name) {
  return /^(?:https?:\/\/|\.\/)/.test(name);
}

export function resolveManifest(root, name) {
  return isManifestUrl(name) ? new URL(name, import.meta.url).href : `${root}model/${name}/index.json`;
}

function loseContext(gl) {
  if (gl && !gl.isContextLost()) gl.getExtension("WEBGL_lose_context")?.loseContext();
}

function resetRenderer(manager) {
  manager.gifRole?.dispose();
  manager.gifRole = null;
  const classic = manager.cubism2model;
  if (classic) {
    manager.cubism2model = null;
    const gl = classic.gl;
    classic.destroy();
    if (gl) classic.live2DMgr.releaseModel(gl);
    // Cubism 2 stores clipping buffers globally, outside a renderer's lifetime.
    window.Live2D?.dispose();
    loseContext(gl);
  }
  const modern = manager.cubism5model;
  if (modern) {
    manager.cubism5model = null;
    const gl = modern.subdelegates?.at(0)?.getGlManager().getGl();
    modern.release();
    loseContext(gl);
  }
  manager.resetCanvas();
}

const classicUrl = "https://cdn.jsdelivr.net/npm/live2d-widgets@1.0.1/dist/chunk/index.js";
const modernUrl = "https://cdn.jsdelivr.net/npm/live2d-widgets@1.0.1/dist/chunk/index2.js";

export async function renderModel(manager, url, manifest, loadScript) {
  if (manager.loading) return false;
  const widget = document.getElementById("waifu");
  manager.loading = true;
  let preparedGif;
  try {
    const gif = manifest.type === "gif";
    const version = gif ? "gif" : manager.checkModelVersion(manifest);
    const classic = version === 2;
    // Prepare the new renderer before discarding the currently visible canvas.
    let renderer;
    if (gif) {
      preparedGif = await prepareGifRole(url, manifest);
    } else {
      const core = classic ? manager.cubism2Path : manager.cubism5Path;
      if (!core) throw new Error("Live2D renderer is unavailable for Cubism " + version);
      if (classic ? !window.Live2D : !window.Live2DCubismCore) await loadScript(core);
      renderer = await import(classic ? classicUrl : modernUrl);
    }

    widget.classList.add("live2d-switching");
    applyPortrait(url, gif);
    manager.rendered = false;
    if (gif || classic || !manager.cubism5model) {
      if (manager.gifRole || manager.cubism2model || manager.cubism5model) resetRenderer(manager);
    }
    let drawn;
    if (gif) {
      manager.gifRole = preparedGif;
      widget.querySelector("#waifu-canvas").replaceChildren(preparedGif.canvas);
      preparedGif.mount(widget);
      drawn = true;
    } else if (classic) {
      const app = manager.cubism2model = new renderer.default();
      enableClassicInteractions(app);
      await app.init("live2d", url, manifest);
      drawn = await waitForCubism2Frame(app);
    } else {
      const fresh = !manager.cubism5model;
      const app = manager.cubism5model ??= new renderer.AppDelegate();
      if (fresh) {
        app.initialize();
        installCandidateInputs(app);
      }
      app.changeModel(url);
      setupCandidateModel(app, url);
      if (fresh) app.run();
      drawn = await waitForCubism5Frame(app);
    }
    if (!drawn) throw new Error("Live2D model did not draw a frame");
    manager.currentModelVersion = version;
    manager.rendered = true;
    widget.classList.remove("live2d-switching");
    return true;
  } catch (error) {
    console.warn("Could not load Live2D model:", url, error);
    if (!manager.rendered) {
      try {
        resetRenderer(manager);
      } catch (cleanupError) {
        console.warn("Could not release the Live2D renderer", cleanupError);
        manager.resetCanvas();
      }
    }
    return false;
  } finally {
    if (preparedGif && preparedGif !== manager.gifRole) preparedGif.dispose();
    manager.loading = false;
  }
}
