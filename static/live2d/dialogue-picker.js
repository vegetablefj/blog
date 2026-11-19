import { characterDialogue, commonDialogue, getPioDialogue, idleDialogueWeights, specialDialogue, tabReturnDialogue, toolbarDialogue } from "./dialogue.js?v=production-1";

export { tabReturnDialogue };

function pickLine(lines) {
  if (Array.isArray(lines)) return lines[Math.floor(Math.random() * lines.length)];
  return lines;
}

export function pickSpecialDialogue(id, scene) {
  return pickLine(specialDialogue[id]?.[scene] ?? []);
}

export function pickToolbarDialogue(id, selector) {
  const button = toolbarDialogue[selector];
  if (button) return pickSpecialDialogue(id, button.scene) ?? button.text;
}

export function pickDialogue(id, source, template) {
  const configured = Object.hasOwn(characterDialogue, id) ? characterDialogue[id] : [];
  const personal = id === "pio" ? getPioDialogue(template) : configured;
  if (source === "interaction") return pickLine(personal);
  if (source !== "idle") return;
  if (!commonDialogue.length) return pickLine(personal);
  if (!personal.length) return pickLine(commonDialogue);

  const { character, common } = idleDialogueWeights;
  return pickLine(Math.random() * (character + common) < character ? personal : commonDialogue);
}
