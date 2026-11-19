export const mygoAssetRoot = "https://cdn.jsdelivr.net/gh/panxuc/live2d-widget-mygo@2ee129159f5e75e376adfa997ae1b7de52d677d6/public/model/";

export function adaptMyGOManifest(url, manifest) {
  if (!url.startsWith(mygoAssetRoot) || !manifest) return manifest;

  const { model, physics, textures, motions } = manifest;
  const reactions = [...(motions.smile01 ?? []), ...(motions.smile02 ?? motions.angry01 ?? [])];
  const files = (group = []) => group.map(({ file }) => ({ file }));
  return {
    model,
    physics,
    textures,
    hit_areas_custom: { head_x: [], head_y: [-0.2], body_x: [], body_y: [] },
    motions: {
      idle: files(motions.idle01),
      flick_head: files(reactions),
      tap_body: files(reactions),
    },
  };
}
