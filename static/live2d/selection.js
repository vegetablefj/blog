// Each setting can be "random" or "sequential".
export const selectionModes = {
  model: "random",
  outfit: "random",
  interaction: "random",
};

export function pickNextIndex(count, current, kind) {
  if (count === 0) return -1;
  if (count === 1) return 0;

  const hasCurrent = Number.isInteger(current) && current >= 0 && current < count;
  if (selectionModes[kind] === "sequential") return hasCurrent ? (current + 1) % count : 0;
  if (!hasCurrent) return Math.floor(Math.random() * count);

  const index = Math.floor(Math.random() * (count - 1));
  return index < current ? index : index + 1;
}

// The toolbar can issue either switch while a model is still being fetched.
const pendingSwitches = new WeakSet();

export async function switchSelection(manager, change) {
  if (pendingSwitches.has(manager)) return;
  pendingSwitches.add(manager);
  try {
    await change();
  } finally {
    pendingSwitches.delete(manager);
  }
}
