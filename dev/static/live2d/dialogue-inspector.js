import { loadTemplateDialogue } from "./dialogue-inspector-defaults.js?v=page-dialogue-2";

const names = {
  pio: "Pio",
  hiyori: "桃濑日和", atri: "ATRI", bocchi: "波奇酱",
  tomori: "高松灯", anon: "千早爱音", rana: "要乐奈", soyo: "长崎爽世", taki: "椎名立希",
  mutsumi: "若叶睦",
  sakiko: "丰川祥子",
  murasame: "丛雨",
  "friends-drink": "朋友的酒",
  yao: "遥",
  "night-heron": "夜鹭",
  common: "公共", all: "通用",
};
const statusNames = { active: "在用", reference: "参考" };
const query = document.getElementById("query");
const role = document.getElementById("role");
const scene = document.getElementById("scene");
const results = document.getElementById("results");
const note = document.getElementById("note");
const detail = document.getElementById("detail");
const detailTitle = document.getElementById("detail-title");
const detailLines = document.getElementById("detail-lines");
const tabs = document.querySelectorAll("[data-section]");

let section = "special";
const records = [];
let templateState = "unloaded";
let settings;
let templateSpecialDialogue = {};
let roleIds = [];
let slotNames;

function labelFor(id) {
  return names[id] ?? id;
}

function addLines(section, role, scene, lines, detail = "") {
  for (const line of lines) {
    const record = { section, role, scene, text: line, detail, status: "active" };
    if (line === settings.craftingBagDialogue) {
      const markup = document.createElement("template");
      markup.innerHTML = line;
      record.text = markup.content.textContent.trim().replace(/\s+/g, " ");
      record.html = line;
    }
    records.push(record);
  }
}

function addSpecialLines(id, scenes, detail = "") {
  for (const [slot, lines] of Object.entries(scenes)) {
    if (!slotNames.has(slot)) continue;
    for (const line of lines) {
      const text = line.replace(/<\/?strong>/g, "");
      records.push({ text, slot, section: "special", role: id, scene: slotNames.get(slot), status: "active", detail });
    }
  }
}

function visibleSection(record) {
  return section === "all" || record.section === section;
}

function updateOptions(select, initialLabel, options) {
  const previous = select.value;
  const unique = [...new Set(options)];
  select.replaceChildren(new Option(initialLabel, ""), ...unique.map(value =>
    new Option(select === role ? labelFor(value) : value, value)
  ));
  select.value = unique.includes(previous) ? previous : "";
}

function normalize(value) {
  return value.normalize("NFKC").toLocaleLowerCase();
}

function element(tag, value, className) {
  const node = document.createElement(tag);
  if (value) node.textContent = value;
  if (className) node.className = className;
  return node;
}

function tableRegion(table, label) {
  const region = element("div", "", "table-region");
  region.tabIndex = 0;
  region.setAttribute("role", "region");
  region.setAttribute("aria-label", label);
  region.append(table);
  return region;
}

function slotCell(id, key, matchedLines) {
  const cell = element("td", "", "entry");
  if (!matchedLines.length) {
    cell.append(element("span", "—", "empty"));
    return cell;
  }

  const dedicated = settings.specialDialogue[id]?.[key];
  const lines = dedicated ?? templateSpecialDialogue[id][key];
  const label = labelFor(id) + " · " + slotNames.get(key);
  const button = element("button", "", "entry-btn");
  button.type = "button";
  button.title = matchedLines[0];
  button.setAttribute("aria-label", label + " · " + lines.length + " 条台词");
  button.append(element("span", matchedLines[0], "entry-preview"));
  if (lines.length > 1) {
    button.classList.add("has-more");
    button.append(element("span", "+" + (lines.length - 1), "line-count"));
  }
  button.addEventListener("click", () => {
    detailTitle.textContent = dedicated ? label : label + " · 默认文案";
    detailLines.replaceChildren(...lines.map(line => element("li", line.replace(/<\/?strong>/g, ""))));
    detail.showModal();
  });
  cell.append(button);
  return cell;
}

function renderMatrix(content, filtered, searching) {
  const groups = settings.specialDialogueGroups
    .map(group => ({ ...group, slots: group.slots.filter(([key]) => !scene.value || slotNames.get(key) === scene.value) }))
    .filter(group => group.slots.length);
  if (!groups.length || (searching && !filtered.length)) return;

  const matchingRoles = new Set(filtered.map(record => record.role));
  const ids = roleIds.filter(id => (!role.value || role.value === id) && (!searching || matchingRoles.has(id)));
  if (!ids.length) return;

  const linesByCell = new Map();
  for (const record of filtered) {
    const identifier = record.role + ":" + record.slot;
    if (!linesByCell.has(identifier)) linesByCell.set(identifier, []);
    linesByCell.get(identifier).push(record.text);
  }

  const table = element("table", "", "matrix");
  const slotCount = groups.reduce((count, group) => count + group.slots.length, 0);
  table.style.minWidth = 90 + 72 * slotCount + "px";
  table.append(element("colgroup"));
  for (const group of groups) {
    const columns = element("colgroup");
    columns.span = group.slots.length;
    table.append(columns);
  }
  const head = table.createTHead();
  const headings = head.insertRow();
  const subheadings = head.insertRow();
  const roleHeading = element("th", "角色", "role");
  roleHeading.scope = "col";
  roleHeading.rowSpan = 2;
  headings.append(roleHeading);
  for (const group of groups) {
    const header = element("th", group.label, "group-end");
    header.scope = "colgroup";
    header.colSpan = group.slots.length;
    headings.append(header);
    group.slots.forEach(([, text], index) => {
      const slotHeading = element("th", text, index === group.slots.length - 1 ? "group-end" : "");
      slotHeading.scope = "col";
      subheadings.append(slotHeading);
    });
  }

  const body = table.createTBody();
  for (const id of ids) {
    const row = body.insertRow();
    const name = element("th", labelFor(id), "role");
    name.scope = "row";
    row.append(name);
    for (const group of groups) {
      group.slots.forEach(([key], index) => {
        const cell = slotCell(id, key, linesByCell.get(id + ":" + key) ?? []);
        if (index === group.slots.length - 1) cell.classList.add("group-end");
        row.append(cell);
      });
    }
  }
  content.append(tableRegion(table, "特殊动作台词表"));
}

function renderPlainList(content, entries) {
  if (!entries.length) return;
  const table = element("table", "", "plain-list");
  const headings = table.createTHead().insertRow();
  for (const text of ["角色", "场景", "台词", "说明"]) {
    const heading = element("th", text);
    heading.scope = "col";
    headings.append(heading);
  }
  const body = table.createTBody();
  for (const record of entries) {
    const row = body.insertRow();
    const name = element("th", labelFor(record.role), "row-role");
    name.scope = "row";
    const detailText = [record.status === "reference" ? statusNames.reference : "", record.detail].filter(Boolean).join(" · ");
    const dialogueCell = element("td", record.text);
    if (record.html) dialogueCell.innerHTML = record.html;
    row.append(name, element("td", record.scene), dialogueCell, element("td", detailText, "minor"));
  }
  content.append(tableRegion(table, "日常及模板台词"));
}

function render() {
  const words = normalize(query.value).split(/\s+/).filter(Boolean);
  const filtered = records.filter(record => {
    if (!visibleSection(record) || (role.value && record.role !== role.value) ||
        (scene.value && record.scene !== scene.value)) return false;
    const searchable = normalize([
      record.text, labelFor(record.role), record.role, record.scene, statusNames[record.status], record.detail,
    ].join(" "));
    return words.every(word => searchable.includes(word));
  });

  const showSpecial = section === "special" || section === "all";
  const showTemplate = section === "template" || section === "all";
  const special = filtered.filter(record => record.section === "special");
  const plain = filtered.filter(record => record.section !== "special");
  const notices = [filtered.length + " 条台词"];
  if (showSpecial) notices.push("点开有文字的格子查看全文。短横线表示该格未列出台词。");
  if (section === "daily") {
    const weights = settings.idleDialogueWeights;
    notices.push("静置时专属与公共按 " + weights.character + "∶" + weights.common + " 抽取。点击角色只抽专属。");
  }
  if (showTemplate) notices.push("一言由外部实时抽取。");
  if (templateState === "loading") notices.push("正在加载模板文案…");
  if (templateState === "failed") notices.push("模板文案暂时无法加载。");
  note.textContent = notices.join("  ");
  if (templateState === "failed") {
    const retry = element("button", "重试");
    retry.type = "button";
    retry.addEventListener("click", readTemplate);
    note.append(" ", retry);
  }
  const content = document.createDocumentFragment();
  if (showSpecial) renderMatrix(content, special, words.length > 0);
  renderPlainList(content, plain);
  if (!content.childNodes.length && templateState !== "loading") {
    content.append(element("p", "没有符合条件的台词。", "note"));
  }
  results.replaceChildren(content);
}

function refreshFilters() {
  const entries = records.filter(visibleSection);
  const showSpecial = section === "special" || section === "all";
  updateOptions(role, "全部角色", [...(showSpecial ? roleIds : []), ...entries.map(record => record.role)]);
  updateOptions(scene, "全部场景", [...(showSpecial ? slotNames.values() : []), ...entries.map(record => record.scene)]);
  render();
}

async function readTemplate() {
  if (templateState === "ready" || templateState === "loading") return;
  templateState = "loading";
  render();
  try {
    const { template, records: templateRecords, special } = await loadTemplateDialogue();
    records.push(...templateRecords);
    addLines("daily", "pio", "角色日常", settings.getPioDialogue(template), "模板文案");
    for (const [id, scenes] of Object.entries(special)) {
      templateSpecialDialogue[id] = { ...templateSpecialDialogue[id], ...scenes };
      const missingScenes = Object.entries(scenes).filter(([slot]) => !settings.specialDialogue[id]?.[slot]);
      addSpecialLines(id, Object.fromEntries(missingScenes), "模板文案");
    }
    templateState = "ready";
  } catch (error) {
    console.warn("Could not load template dialogue", error);
    templateState = "failed";
  }
  refreshFilters();
}

async function fetchRegistry(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) throw new Error(path + ": " + response.status);
  return response.json();
}

async function start() {
  const revision = Date.now();
  const [dialogue, candidates, registry] = await Promise.all([
    import("./dialogue.js?inspect=" + revision),
    import("./cubism-candidates.js?inspect=" + revision),
    fetchRegistry("./models.json"),
  ]);
  settings = dialogue;
  slotNames = new Map(dialogue.specialDialogueGroups.flatMap(group =>
    group.slots.map(([key, text]) => [key, group.label + " · " + text])
  ));
  roleIds = registry.characterIds;
  for (const id of roleIds) {
    const lines = dialogue.characterDialogue[id];
    if (lines) addLines("daily", id, "角色日常", lines);
  }
  addLines("daily", "common", "公共闲聊", dialogue.commonDialogue);
  const { minimumAwayMs, text: welcomeBack } = dialogue.tabReturnDialogue;
  addLines("template", "all", "返回页面", [welcomeBack], `标签页在后台至少 ${minimumAwayMs / 60000} 分钟`);

  for (const id of roleIds) {
    const events = dialogue.specialDialogue[id];
    if (events) addSpecialLines(id, events);
  }

  const toolbarDefaults = Object.values(dialogue.toolbarDialogue);
  for (const id of roleIds) {
    const missing = toolbarDefaults.filter(({ scene }) => !dialogue.specialDialogue[id]?.[scene]);
    const scenes = Object.fromEntries(missing.map(({ scene, text }) => [scene, [text]]));
    templateSpecialDialogue[id] = scenes;
    addSpecialLines(id, scenes, "通用按钮提示");
  }
  addLines("template", "all", "工具栏悬停", toolbarDefaults.map(({ text }) => text), "通用按钮提示");

  roleIds.forEach((id, index) => {
    const text = registry.messages[index];
    if (text) addLines("template", id, "换人介绍", [text]);
  });
  for (const [id, outfits] of Object.entries(candidates.presets)) {
    if (roleIds.includes(id)) addLines("template", id, "换装名称", outfits.map(outfit => outfit.label));
  }
  for (const [id, outfits] of Object.entries(registry.outfitNames ?? {})) {
    if (roleIds.includes(id)) addLines("template", id, "换装名称", outfits);
  }

  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      section = tab.dataset.section;
      for (const option of tabs) option.setAttribute("aria-pressed", String(option === tab));
      refreshFilters();
    });
  }
  query.addEventListener("input", render);
  role.addEventListener("change", render);
  scene.addEventListener("change", render);
  refreshFilters();
  void readTemplate();
}

start().catch(error => {
  console.error(error);
  note.textContent = "读取本地台词失败，请刷新页面重试。";
});
