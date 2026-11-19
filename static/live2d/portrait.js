const portraitFolders = [
  ["pio-portrait", "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Pio/"],
  ["bocchi-portrait", new URL("candidates/bocchi/", import.meta.url).href],
  ["atri-portrait", new URL("candidates/atri/", import.meta.url).href],
  ["hiyori-portrait", new URL("candidates/hiyori/", import.meta.url).href],
  ["mutsumi-portrait", new URL("candidates/mutsumi/", import.meta.url).href],
  ["sakiko-portrait", new URL("candidates/sakiko/", import.meta.url).href],
  ["murasame-portrait", new URL("candidates/murasame/", import.meta.url).href],
];
export function applyPortrait(modelUrl, gif = false) {
  const url = new URL(modelUrl, location.href).href;
  const widget = document.getElementById("waifu");
  widget.classList.toggle("gif-portrait", gif);
  for (const [className, folder] of portraitFolders) {
    const active = !gif && url.startsWith(folder);
    widget.classList.toggle(className, active);
  }
}
