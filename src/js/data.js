const RAW = window.ASTERA_DATA;
export const CATALOG = RAW.catalog;
export const CONTACTS = RAW.contacts;
export const ALL = CATALOG.flatMap(c => c.products);
export const BY_SLUG = Object.fromEntries(ALL.map(p => [p.slug, p]));

/* Hero & category hero images — picked best lifestyle JPG per category */
const _img = (slug) => {
  const p = BY_SLUG[slug];
  return p?.images.find(i => /\.jpg$/i.test(i)) || '';
};
export const HERO_IMG = _img('bella');
export const CATEGORY_HEROES = {
  'Дизайн':       _img('eclissi'),
  'Классика':     _img('novita-felicia'),
  'Минимализм':   _img('melford'),
  'Неоклассика':  _img('astoria'),
};
export const EDITORIAL_IMG = _img('eclissi');

export function fmt(n) {
  return Math.round(n).toLocaleString('ru-RU');
}

export function parseSpecs(text) {
  if (!text) return [];
  const HEADS = ['Варианты остекления','Варианты покрытия','Варианты оформления','Варианты цветов','Стандартные размеры','Нестандартные размеры'];
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const sections = [];
  let cur = null, i = 0, descLines = [];
  while (i < lines.length && !HEADS.some(h => lines[i].startsWith(h))) { descLines.push(lines[i++]); }
  if (descLines.length) sections.push({ title: 'Описание', body: descLines.join('\n') });
  while (i < lines.length) {
    const line = lines[i];
    if (HEADS.some(h => line.startsWith(h))) { cur = { title: line.replace(/:\s*$/, ''), body: '' }; sections.push(cur); }
    else if (cur) cur.body += (cur.body ? '\n' : '') + line;
    i++;
  }
  return sections.filter(s => s.body.trim() || s.title === 'Описание');
}

export function thumbOf(p) {
  return p.images.find(i => /\.(jpg|jpeg)$/i.test(i)) || p.images[0] || '';
}

export function variantImgs(p) {
  return p.images.filter(i => /\.png$/i.test(i));
}

export function lifestyleImgs(p) {
  return p.images.filter(i => /\.(jpg|jpeg)$/i.test(i));
}
