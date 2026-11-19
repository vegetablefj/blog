// Reimu loads this entry point in place of the widget's default autoload.js.
(() => {
  if (screen.width < 768) return;

  const widgetAssets = "https://cdn.jsdelivr.net/npm/live2d-widgets@1.0.1/dist/";
  const localAsset = new URL(".", document.currentScript.src);

  async function startWidget() {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = widgetAssets + "waifu.css";
    const portrait = document.createElement("link");
    portrait.rel = "stylesheet";
    portrait.href = new URL("portrait.css?v=production-2", localAsset);
    document.head.append(styles, portrait);

    const [outfitsResponse] = await Promise.all([
      fetch(new URL("outfits.json", localAsset)),
      import(new URL("widget.js?v=production-8", localAsset)),
    ]);
    if (!outfitsResponse.ok) {
      throw new Error(`Could not load the outfit list: ${outfitsResponse.status}`);
    }

    window.initWidget({
      waifuPath: widgetAssets + "waifu-tips.json",
      cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
      modelListPath: new URL("models.json?v=production-7", localAsset).href,
      textureOverrides: await outfitsResponse.json(),
      cubism2Path: widgetAssets + "live2d.min.js",
      cubism5Path: "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
      initialModel: location.hostname === "localhost" ? new URLSearchParams(location.search).get("model") : null,
      tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
    });
  }

  startWidget().catch(error => console.error("Could not start Live2D widget:", error));
})();
