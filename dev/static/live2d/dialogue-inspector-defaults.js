const templateUrl = "https://cdn.jsdelivr.net/npm/live2d-widgets@1.0.1/dist/waifu-tips.json";

const messageScenes = {
  default: "默认闲聊",
  console: "控制台提示",
  copy: "复制内容",
  visibilitychange: "返回页面",
  changeSuccess: "换装成功",
  changeFail: "无可用服装",
  photo: "拍照",
  goodbye: "隐藏看板娘",
  hitokoto: "一言来源",
  welcome: "阅读问候",
  referrer: "外部来源问候",
  hoverBody: "悬停角色",
  tapBody: "点击角色",
};

const removedMessagePools = new Set(["default", "hoverBody", "tapBody", "visibilitychange"]);
const oldCommentSelector = /\.(?:vnick|vmail|vlink|veditor|vcontrol|vemoji-btn|vpreview-btn|vsubmit|vcontent)\b|\[itemprop=['"]discussionUrl['"]\]/;

function* originalTexts(value) {
  if (typeof value === "string") {
    yield value;
  } else if (Array.isArray(value)) {
    for (const item of value) yield* originalTexts(item);
  }
}

export async function loadTemplateDialogue() {
  const response = await fetch(templateUrl);
  if (!response.ok) throw new Error(`模板台词加载失败（${response.status}）`);
  const template = await response.json();
  const records = [];

  function append(value, scene, status, detail) {
    for (const text of originalTexts(value)) {
      // Preserve markup as literal text. The inspector should render with textContent.
      records.push({ text, section: "template", role: "all", scene, status, detail });
    }
  }

  for (const [key, value] of Object.entries(template.message ?? {})) {
    append(
      value,
      messageScenes[key] ?? "模板消息",
      removedMessagePools.has(key) ? "reference" : "active",
      `message.${key}`
    );
  }

  for (const [field, scene] of [["mouseover", "悬停网页元素"], ["click", "点击网页元素"]]) {
    for (const rule of template[field] ?? []) {
      const disabledHover = field === "mouseover";
      const oldComment = oldCommentSelector.test(rule.selector);
      const hoverDetail = rule.selector.startsWith("#waifu-tool-") ? "工具栏原文，已换用通用提示" : "已停用页面悬停";
      append(
        rule.text,
        scene,
        disabledHover || oldComment ? "reference" : "active",
        disabledHover
          ? `${hoverDetail} · ${rule.selector}`
          : oldComment
          ? `旧评论区规则，现用 Giscus · ${rule.selector}`
          : `已配置规则 · ${rule.selector}`
      );
    }
  }

  for (const rule of template.seasons ?? []) {
    append(rule.text, "节日闲聊", "reference", rule.date);
  }
  for (const rule of template.time ?? []) {
    append(rule.text, "时段问候", "active", `${rule.hour} 时`);
  }
  const special = {
    pio: {
      switchOutfit: [template.message.changeSuccess],
      photo: [template.message.photo],
      hide: [template.message.goodbye],
    },
  };
  return { template, records, special };
}
