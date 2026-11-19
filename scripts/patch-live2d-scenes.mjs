// Checked patches for the pinned Live2D Widgets bundle.

function replaceOnce(source, before, after, label) {
  if (source.split(before).length !== 2) {
    throw new Error(`Live2D scene hook changed: ${label}`);
  }
  return source.replace(before, after);
}

function replaceMethod(source, start, next, replacement) {
  const begin = source.indexOf(start);
  const end = source.indexOf(next, begin + start.length);
  if (begin < 0 || end < 0 || source.indexOf(start, begin + start.length) >= 0) {
    throw new Error(`Live2D scene method changed: ${start}`);
  }
  return source.slice(0, begin) + replacement + source.slice(end);
}

const sceneHelpers = `
// Runtime scene hooks; keep empty character pools on the upstream behavior.
let activeDialogueManager;
function clearSceneDialogue() {
  clearTimeout(s);
  s = null;
  sessionStorage.removeItem("waifu-message-priority");
  const tips = document.getElementById("waifu-tips");
  tips?.classList.remove("waifu-tips-active");
  tips?.replaceChildren();
}
function waitForSceneFrame(manager) {
  return manager.currentModelVersion === 3
    ? waitForCubism5Frame(manager.cubism5model)
    : waitForCubism2Frame(manager.cubism2model);
}
function showSpecialScene(manager, scene, fallback, duration = 4e3, priority = 10) {
  const line = pickSpecialDialogue(manager?.dialogueId, scene) ?? fallback;
  i(line, duration, priority);
  return line;
}
`;

const loadModel = `async loadModel(message = "", modelId = this.modelId, outfitId = this.modelTexturesId) {
  let url, manifest;
  if (this.useCDN) {
    let target = this.modelList.models[modelId];
    if (Array.isArray(target)) target = target[outfitId];
    if (!target) return false;
    url = resolveManifest(this.cdnPath, target);
    manifest = await this.fetchWithCache(url);
    if (!manifest) return false;
    if (manifest.type !== "gif" && this.checkModelVersion(manifest) === 2) {
      const textures = await this.loadTextureCache(target);
      const selected = textures[outfitId];
      if (selected) manifest = { ...manifest, textures: typeof selected === "string" ? [selected] : selected };
    }
  } else {
    url = this.models[modelId].paths[outfitId];
    manifest = await this.fetchWithCache(url);
    if (!manifest) return false;
  }
  if (!await renderModel(this, url, manifest, o)) return false;
  this.modelId = modelId;
  this.modelTexturesId = outfitId;
  this.dialogueId = this.modelList?.characterIds?.[modelId];
  i(message, 4e3, 10);
  return true;
}
async changeSelection(modelId, outfitId, message) {
  if (await this.loadModel(message, modelId, outfitId)) return true;
  if (!this.rendered && !await this.loadModel() && (this.modelId !== 0 || this.modelTexturesId !== 0)) {
    await this.loadModel("", 0, 0);
  }
  i("加载失败，请稍后再试。", 4e3, 11);
  return false;
}`;

const loadOutfit = `async loadRandTexture(success = "", failure = "") {
  const reaction = pickSpecialDialogue(this.dialogueId, "switchOutfit");
  if (this.currentModelVersion === 3) {
    const label = cycleCandidateOutfit(this.cubism5model);
    if (label) {
      if (await waitForSceneFrame(this)) i(reaction ?? label, 4e3, 10);
      return true;
    }
  }
  let count;
  if (this.useCDN) {
    const target = this.modelList.models[this.modelId];
    count = Array.isArray(target) ? target.length : (await this.loadTextureCache(target)).length;
  } else {
    count = this.models[this.modelId].paths.length;
  }
  if (count < 2) {
    i(failure, 4e3, 10);
    return false;
  }
  const next = pickNextIndex(count, this.modelTexturesId, "outfit");
  const outfitName = this.modelList?.outfitNames?.[this.dialogueId]?.[next];
  return this.changeSelection(this.modelId, next, reaction ?? outfitName ?? success);
}`;

const loadNextModel = `async loadNextModel() {
  const models = this.useCDN ? this.modelList.models : this.models;
  if (models.length < 2) return false;
  clearSceneDialogue();
  const modelId = pickNextIndex(models.length, this.modelId, "model");
  const introduction = this.useCDN ? this.modelList.messages[modelId] : models[modelId].message;
  return this.changeSelection(modelId, 0, introduction);
}`;

export function patchPageDialogue(source) {
  const toolbarHover = `window.addEventListener("mouseover",event=>{
    const button = event.target?.closest?.("#waifu-tool > span[id]");
    const selector = button ? "#" + button.id : "";
    if (l === selector) return;
    l = selector;
    if (!button) return;
    i(pickToolbarDialogue(dialogueManager?.dialogueId, selector),4e3,8);
  }),`;
  const tabReturn = `document.addEventListener("visibilitychange",()=>{
    if (document.hidden) {
      hiddenSince ??= Date.now();
      return;
    }
    if (hiddenSince === null) return;
    const awayTime = Date.now() - hiddenSince;
    hiddenSince = null;
    clearInterval(o);
    o = null;
    s = true;
    if (awayTime >= tabReturnDialogue.minimumAwayMs && document.querySelector("#waifu.waifu-active")) {
      i(tabReturnDialogue.text,6e3,9);
    }
  })`;
  let patched = replaceMethod(source, 'window.addEventListener("mouseover",(o=>{',
    'window.addEventListener("click",(o=>{', toolbarHover);
  patched = replaceOnce(patched, 'const speak=(source,duration)=>{if(document.querySelector(',
    'const speak=(source,duration)=>{if(!document.hidden&&document.querySelector(', "pause background dialogue");
  patched = replaceOnce(patched, 'function(t){let o,s=!1;let l;',
    'function(t){let o,s=!1;let l,hiddenSince=document.hidden?Date.now():null;', "tab visibility state");
  return replaceOnce(patched, 'window.addEventListener("visibilitychange",(()=>{document.hidden||i(t.message.visibilitychange,6e3,9)}))',
    tabReturn, "tab return greeting");
}

export function patchRuntimeScenes(source) {
  if (source.includes("// Runtime scene hooks;")) throw new Error("Scene hooks already applied.");
  let patched = source;

  patched = replaceMethod(patched, "static async initCheck(", "set modelId(", `static async initCheck(options, models = []) {
    const manager = new c(options, models);
    if (!manager.useCDN) return manager;
    manager.textureOverrides = options.textureOverrides;
    const response = await fetch(options.modelListPath);
    if (!response.ok) throw new Error("Could not load Live2D roster: " + response.status);
    const list = manager.modelList = await response.json();
    const requested = list.characterIds.indexOf(options.initialModel);
    const saved = list.characterIds.indexOf(localStorage.getItem("blog-live2d-character"));
    manager._modelId = requested >= 0 ? requested :
      saved >= 0 ? saved : pickNextIndex(list.models.length, -1, "model");
    const target = list.models[manager.modelId];
    const count = Array.isArray(target) ? target.length : (await manager.loadTextureCache(target)).length;
    manager._modelTexturesId = requested >= 0 || saved < 0 || manager.modelTexturesId < 0 ||
      manager.modelTexturesId >= count ? 0 : manager.modelTexturesId;
    return manager;
  }`);
  patched = replaceOnce(patched, 'localStorage.setItem("modelId",e.toString())',
    'localStorage.setItem("blog-live2d-character",this.modelList?.characterIds?.[e]??"")', "save rendered character");
  patched = replaceOnce(patched, 'localStorage.getItem("modelTexturesId")',
    'localStorage.getItem("blog-live2d-outfit")', "restore outfit");
  patched = replaceOnce(patched, 'localStorage.setItem("modelTexturesId",e.toString())',
    'localStorage.setItem("blog-live2d-outfit",e.toString())', "save rendered outfit");
  patched = replaceMethod(patched, "async fetchWithCache(", "checkModelVersion(", `async fetchWithCache(url) {
    if (url in this.modelJSONCache) return this.modelJSONCache[url];
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const manifest = adaptMyGOManifest(url, await response.json());
      this.modelJSONCache[url] = manifest;
      return manifest;
    } catch (error) {
      console.warn("Could not fetch Live2D assets:", url, error);
      return null;
    }
  }`);
  patched = replaceMethod(patched, "async loadLive2D(", "async loadModel(", `async loadTextureCache(target) {
    if (isManifestUrl(target)) return [];
    const outfits = this.textureOverrides?.[target];
    if (outfits?.length) return outfits;
    return await this.fetchWithCache(this.cdnPath + "model/" + target + "/textures.cache") || [];
  }`);
  patched = replaceMethod(patched, "async loadModel(e){", "async loadRandTexture(", loadModel);
  patched = replaceMethod(patched, "async loadRandTexture(", "async loadNextModel(){", loadOutfit);
  patched = replaceMethod(patched, "async loadNextModel(){", "}class d{", loadNextModel);

  patched = patchPageDialogue(patched);
  patched = replaceOnce(patched, "callback:()=>{i(o.message.photo,6e3,9);const e=document.getElementById(\"live2d\");",
    "callback:()=>{const e=document.getElementById(\"live2d\");", "photo action start");
  patched = replaceOnce(patched, "s.click(),document.body.removeChild(s)}},info:",
    's.click(),document.body.removeChild(s);showSpecialScene(activeDialogueManager,"photo",o.message.photo,6e3,9)}},info:', "photo action finished");
  patched = replaceOnce(patched, "i(o.message.goodbye,2e3,11)",
    'showSpecialScene(activeDialogueManager,"hide",o.message.goodbye,2e3,11)', "hide scene");

  const oldGame = 'callback:()=>{if(window.Asteroids)window.ASTEROIDSPLAYERS||(window.ASTEROIDSPLAYERS=[]),window.ASTEROIDSPLAYERS.push(new window.Asteroids);else{const e=document.createElement("script");e.src="https://fastly.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js",document.head.appendChild(e)}}';
  const newGame = `callback:()=>{
    const manager=activeDialogueManager,id=manager?.dialogueId;
    const reaction=pickSpecialDialogue(id,"asteroids");
    const finished=()=>{if(reaction&&manager?.dialogueId===id)i(reaction,4e3,10)};
    if(window.Asteroids){
      window.ASTEROIDSPLAYERS||(window.ASTEROIDSPLAYERS=[]);
      window.ASTEROIDSPLAYERS.push(new window.Asteroids);
      finished();
    }else{
      const script=document.createElement("script");
      script.src="https://fastly.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js";
      if(reaction)script.addEventListener("load",()=>{if(window.Asteroids)finished()},{once:true});
      document.head.appendChild(script);
    }
  }`;
  patched = replaceOnce(patched, oldGame, newGame, "game action finished");

  patched = replaceOnce(patched, "async function r(t){var o;let dialogueManager;",
    'async function r(t,appearanceScene="appear"){var o;let dialogueManager,pendingGreeting;', "appearance state");
  patched = replaceOnce(patched, "}(s),i(function(e,t,o){", "}(s),pendingGreeting=function(e,t,o){", "defer default greeting");
  patched = replaceOnce(patched, "}(s.time,s.message.welcome,s.message.referrer),7e3,11)",
    "}(s.time,s.message.welcome,s.message.referrer)", "store default greeting");
  patched = replaceOnce(patched,
    'const a=dialogueManager=await c.initCheck(t,l);await a.loadModel(""),new d(a,t,s).registerTools()',
    `const a=activeDialogueManager=dialogueManager=await c.initCheck(t,l);
    const loaded=await a.loadModel() || ((a.modelId!==0||a.modelTexturesId!==0) && await a.loadModel("",0,0));
    if(!loaded) console.warn("No Live2D model could be drawn");
    i(pickSpecialDialogue(a.dialogueId,appearanceScene)??pendingGreeting,7e3,11);
    new d(a,t,s).registerTools()`, "appearance after loading");
  patched = replaceOnce(patched, 'null===(e=document.getElementById("waifu"))||void 0===e||e.classList.add("waifu-active")}),0)',
    'null===(e=document.getElementById("waifu"))||void 0===e||e.classList.add("waifu-active");showSpecialScene(activeDialogueManager,"reappear",void 0,4e3,11)}),0)', "same-page restoration");

  const pickerImport = 'import { pickDialogue, pickSpecialDialogue, pickToolbarDialogue, tabReturnDialogue } from "./dialogue-picker.js?v=production-7";';
  const pickerPattern = /import \{ pickDialogue \} from "[^"\n]*dialogue-picker\.js(?:\?[^"\n]*)?";\n?/;
  if (pickerPattern.test(patched)) patched = patched.replace(pickerPattern, pickerImport + "\n");
  else patched = pickerImport + "\n" + patched;
  const frameImport = 'import { waitForCubism2Frame, waitForCubism5Frame } from "./renderer-ready.js";\n';
  return frameImport + sceneHelpers + patched;
}
