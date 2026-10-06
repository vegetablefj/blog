export const normalizeSearchText = (value) =>
  String(value || '').normalize('NFKC').toLowerCase();

function normalizeSearchPath(value) {
  try {
    return normalizeSearchText(decodeURIComponent(value || ''));
  } catch {
    return normalizeSearchText(value);
  }
}

export function prepareSearchEntries(entries) {
  return entries.map((entry) => ({
    ...entry,
    titleText: normalizeSearchText(entry.title),
    descriptionText: normalizeSearchText(entry.description),
    contentText: normalizeSearchText(entry.content),
    taxonomyText: normalizeSearchText([...(entry.tags || []), ...(entry.categories || [])].join(' ')),
    pathText: normalizeSearchPath(entry.url),
  }));
}

function scoreDocument(entry, terms, phrase) {
  const fields = [entry.titleText, entry.descriptionText, entry.taxonomyText, entry.contentText, entry.pathText];
  if (!terms.every((term) => fields.some((field) => field.includes(term)))) return 0;
  let score = 0;
  for (const term of terms) {
    if (entry.titleText.includes(term)) score += 30;
    if (entry.descriptionText.includes(term)) score += 10;
    if (entry.taxonomyText.includes(term)) score += 8;
    if (entry.contentText.includes(term)) score += 2;
    if (entry.pathText.includes(term)) score += 4;
  }
  if (entry.titleText.includes(phrase)) score += 50;
  else if (entry.descriptionText.includes(phrase)) score += 15;
  else if (entry.contentText.includes(phrase)) score += 5;
  else if (entry.pathText.includes(phrase)) score += 4;
  return score;
}

export function findSearchMatches(documents, query) {
  const phrase = normalizeSearchText(query).trim();
  if (!phrase) return [];
  const terms = phrase.split(/\s+/).filter(Boolean);
  return documents
    .map((entry) => ({ entry, score: scoreDocument(entry, terms, phrase) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || Number(b.entry.date) - Number(a.entry.date))
    .map((match) => match.entry);
}
