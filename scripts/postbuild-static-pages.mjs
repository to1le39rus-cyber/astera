import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const siteUrl = 'https://to1le39rus-cyber.github.io/astera';

const sourceHtml = await readFile(join(dist, 'index.html'), 'utf8');
const dataText = await readFile(join(root, 'src/js/catalog-data.js'), 'utf8');
const json = dataText
  .replace(/^window\.ASTERA_DATA\s*=\s*/u, '')
  .replace(/;\s*$/u, '');
const data = JSON.parse(json);

const staticPages = [
  { route: '', title: 'Astera — двери и интерьерные решения в Калининграде', description: 'Межкомнатные двери LORD, входные двери Astera, панели, рейки и алюминиевые перегородки под интерьер, проемы и монтаж.' },
  { route: 'catalog', title: 'Каталог Astera в Калининграде', description: 'Двери, панели, рейки, входные группы и перегородки Astera для квартир, домов и дизайн-проектов.' },
  { route: 'catalog/doors', title: 'Межкомнатные двери LORD в Калининграде | Astera', description: 'Коллекции межкомнатных дверей LORD: классика, неоклассика, минимализм и дизайн. Подбор, расчет и монтаж в Калининграде.' },
  { route: 'entrance', title: 'Входные двери Astera на заказ в Калининграде', description: 'Входные двери Astera под размер, фасад и интерьер: расчет, замер, отделка, доставка и монтаж.' },
  { route: 'panels', title: 'Стеновые панели и декоративные рейки | Astera', description: 'Панели, рейки и скрытые проходы под интерьер: подбор оттенка, фактуры, примыканий и монтажа.' },
  { route: 'partitions', title: 'Алюминиевые перегородки в Калининграде | Astera', description: 'Алюминиевые перегородки под интерьер: профиль, стекло, открывание, расчет, замер и монтаж.' },
  { route: 'designers', title: 'Дизайнерам, архитекторам и застройщикам | Astera', description: 'Партнерские условия Astera, подбор дверей, панелей, перегородок и входных групп под дизайн-проект.' },
  { route: 'contacts', title: 'Контакты Astera — салон в Калининграде', description: 'Салон Astera: Калининград, улица Горького, 98. Подбор дверей и интерьерных решений.' },
];

for (const category of data.catalog || []) {
  staticPages.push({
    route: `catalog/${encodeURIComponent(category.name)}`,
    title: `${category.name}: межкомнатные двери LORD в Калининграде | Astera`,
    description: `Коллекция ${category.name}: подбор межкомнатных дверей LORD под интерьер, проемы, фурнитуру и монтаж в салоне Astera.`,
  });

  for (const product of category.products || []) {
    staticPages.push({
      route: `product/${product.slug}`,
      title: `${product.name} — межкомнатная дверь LORD | Astera`,
      description: `Модель ${product.name}: подбор покрытия, размера, короба, фурнитуры и монтажа под интерьер в Калининграде.`,
      product,
      category: category.name,
    });
  }
}

function absoluteAsset(path = '') {
  const encoded = String(path).replace(/^\/+/, '').split('/').map((segment) => {
    try {
      return encodeURIComponent(decodeURIComponent(segment));
    } catch {
      return encodeURIComponent(segment);
    }
  }).join('/');
  return `${siteUrl}/${encoded}`;
}

function stripText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim().slice(0, 420);
}

function jsonLd(page, canonical) {
  const crumbs = [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/` },
  ];
  if (page.route?.startsWith('catalog')) {
    crumbs.push({ '@type': 'ListItem', position: 2, name: 'Каталог', item: `${siteUrl}/catalog` });
    if (page.route !== 'catalog') crumbs.push({ '@type': 'ListItem', position: 3, name: page.category || page.title, item: canonical });
  }
  if (page.route?.startsWith('product/') && page.product) {
    crumbs.push({ '@type': 'ListItem', position: 2, name: 'Каталог', item: `${siteUrl}/catalog` });
    crumbs.push({ '@type': 'ListItem', position: 3, name: page.category, item: `${siteUrl}/catalog/${encodeURIComponent(page.category)}` });
    crumbs.push({ '@type': 'ListItem', position: 4, name: page.product.name, item: canonical });
  }

  const graph = [];
  if (crumbs.length > 1) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs,
    });
  }

  if (page.product) {
    const product = page.product;
    const image = product.images?.[0] ? absoluteAsset(product.images[0]) : `${siteUrl}/branding/logo-astera-hor-monochrome.png`;
    const offer = product.priceFrom ? {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: Math.round(product.priceFrom),
      availability: 'https://schema.org/InStock',
      url: canonical,
      seller: {
        '@type': 'Store',
        name: 'Astera',
        telephone: '+74012336555',
      },
    } : undefined;

    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      brand: { '@type': 'Brand', name: 'LORD' },
      category: page.category || 'Межкомнатные двери',
      description: stripText(product.description) || page.description,
      image,
      url: canonical,
      ...(offer ? { offers: offer } : {}),
    });
  }

  return graph.map(item => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('\n  ');
}

function pageHtml(page, forceBase = false) {
  const canonical = `${siteUrl}${page.route ? `/${page.route}` : '/'}`;
  let html = sourceHtml;
  if (page.route || forceBase) {
    html = html.replace('<head>', '<head>\n    <base href="/astera/">');
  }
  html = html.replace(/<title>.*?<\/title>/u, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/u, `<meta name="description" content="${page.description}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/u, `<meta property="og:title" content="${page.title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/u, `<meta property="og:description" content="${page.description}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/u, `<meta property="og:url" content="${canonical}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/u, `<link rel="canonical" href="${canonical}">`);
  const structured = jsonLd(page, canonical);
  if (structured) html = html.replace('</head>', `  ${structured}\n</head>`);
  return html;
}

for (const page of staticPages) {
  const target = page.route ? join(dist, page.route, 'index.html') : join(dist, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, pageHtml(page), 'utf8');
}

await writeFile(join(dist, '404.html'), pageHtml(staticPages[0], true), 'utf8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url><loc>${siteUrl}${page.route ? `/${page.route}` : '/'}</loc><lastmod>2026-06-06</lastmod><changefreq>${page.route.startsWith('product/') ? 'monthly' : 'weekly'}</changefreq><priority>${page.route ? '0.8' : '1.0'}</priority></url>`).join('\n')}
</urlset>
`;

await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(dist, 'robots.txt'), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`, 'utf8');
