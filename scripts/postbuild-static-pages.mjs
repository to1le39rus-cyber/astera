import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const siteUrl = 'https://to1le39rus-cyber.github.io/astera';
const lastmod = '2026-06-10';

const sourceHtml = await readFile(join(dist, 'index.html'), 'utf8');
const dataText = await readFile(join(root, 'src/js/catalog-data.js'), 'utf8');
const json = dataText
  .replace(/^window\.ASTERA_DATA\s*=\s*/u, '')
  .replace(/;\s*$/u, '');
const data = JSON.parse(json);

const staticPages = [
  { route: '', title: 'Astera — двери и интерьерные решения в Калининграде', description: 'Межкомнатные двери LORD, входные двери Astera, панели, рейки и алюминиевые перегородки под интерьер, проемы и монтаж.', h1: 'Astera — двери и интерьерные решения в Калининграде', text: 'Салон Astera подбирает межкомнатные двери LORD, входные двери Astera на заказ, стеновые панели, декоративные рейки и алюминиевые перегородки под квартиру, дом или дизайн-проект.' },
  { route: 'catalog', title: 'Каталог Astera в Калининграде', description: 'Двери, панели, рейки, входные группы и перегородки Astera для квартир, домов и дизайн-проектов.', h1: 'Каталог Astera', text: 'В каталоге собраны межкомнатные двери, входные группы, стеновые панели, рейки и перегородки. Подбор и расчет выполняются под интерьер, размеры проемов и монтаж.' },
  { route: 'catalog/doors', title: 'Межкомнатные двери LORD в Калининграде | Astera', description: 'Коллекции межкомнатных дверей LORD: классика, неоклассика, минимализм и дизайн. Подбор, расчет и монтаж в Калининграде.', h1: 'Межкомнатные двери LORD в Калининграде', text: 'Astera подбирает межкомнатные двери LORD под стиль интерьера, высоту полотна, покрытие, короб, фурнитуру и монтаж. Доступны коллекции классика, неоклассика, минимализм и дизайн.' },
  { route: 'entrance', title: 'Входные двери Astera на заказ в Калининграде', description: 'Входные двери Astera под размер, фасад и интерьер: расчет, замер, отделка, доставка и монтаж.', h1: 'Входные двери Astera на заказ', text: 'Входные двери Astera проектируются под размер проема, фасад, внутреннюю отделку, тепло, тишину и монтаж. Подходят для квартир, домов и дизайн-проектов в Калининграде.', service: 'Входные двери на заказ' },
  { route: 'panels', title: 'Стеновые панели и декоративные рейки | Astera', description: 'Панели, рейки и скрытые проходы под интерьер: подбор оттенка, фактуры, примыканий и монтажа.', h1: 'Стеновые панели и декоративные рейки', text: 'Astera подбирает панели и рейки для прихожих, ТВ-зон, скрытых проходов и акцентных стен. Решение согласуется с дверями, мебелью и отделкой.' },
  { route: 'partitions', title: 'Алюминиевые перегородки в Калининграде | Astera', description: 'Алюминиевые перегородки под интерьер: профиль, стекло, открывание, расчет, замер и монтаж.', h1: 'Алюминиевые перегородки в Калининграде', text: 'Алюминиевые перегородки помогают зонировать интерьер без тяжелых стен. Astera подбирает профиль, стекло, открывание и монтажный узел.' },
  { route: 'designers', title: 'Дизайнерам, архитекторам и застройщикам | Astera', description: 'Партнерские условия Astera, подбор дверей, панелей, перегородок и входных групп под дизайн-проект.', h1: 'Дизайнерам, архитекторам и застройщикам', text: 'Astera помогает закрыть двери, панели, перегородки и входные группы одной спецификацией. Для дизайнеров доступны партнерские условия до 20%, подбор, расчет, замер и монтаж.', service: 'Комплектация дизайн-проектов дверями и интерьерными решениями' },
  { route: 'contacts', title: 'Контакты Astera — салон в Калининграде', description: 'Салон Astera: Калининград, улица Горького, 98. Подбор дверей и интерьерных решений.', h1: 'Контакты салона Astera', text: 'Салон Astera находится в Калининграде на улице Горького, 98. Можно приехать в салон, обсудить интерьер и получить ориентир по расчету.' },
];

for (const category of data.catalog || []) {
  staticPages.push({
    route: `catalog/${encodeURIComponent(category.name)}`,
    title: `${category.name}: межкомнатные двери LORD в Калининграде | Astera`,
    description: `Коллекция ${category.name}: подбор межкомнатных дверей LORD под интерьер, проемы, фурнитуру и монтаж в салоне Astera.`,
    h1: `${category.name}: межкомнатные двери LORD`,
    text: `Коллекция ${category.name} подходит для подбора межкомнатных дверей под интерьер, размеры проемов, короб, фурнитуру и монтаж в Калининграде.`,
  });

  for (const product of category.products || []) {
    staticPages.push({
      route: `product/${product.slug}`,
      title: `${product.name} — межкомнатная дверь LORD | Astera`,
      description: `Модель ${product.name}: подбор покрытия, размера, короба, фурнитуры и монтажа под интерьер в Калининграде.`,
      h1: `${product.name} — межкомнатная дверь LORD`,
      text: `Модель ${product.name} можно рассчитать под ваш проем, покрытие, короб, фурнитуру и монтаж. Astera помогает понять, как дверь будет смотреться в интерьере.`,
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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

  if (page.service) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.service,
      areaServed: 'Калининград',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Astera',
        telephone: '+74012336555',
      },
      description: page.description,
      url: canonical,
    });
  }

  return graph.map(item => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('\n  ');
}

function seoFallback(page) {
  return `
  <noscript>
    <section class="seo-fallback">
      <h1>${escapeHtml(page.h1 || page.title)}</h1>
      <p>${escapeHtml(page.text || page.description)}</p>
      <p>Телефон Astera: <a href="tel:+74012336555">+7 (4012) 33-65-55</a>. Адрес салона: Калининград, улица Горького, 98.</p>
    </section>
  </noscript>`;
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
  html = html.replace('</body>', `${seoFallback(page)}\n</body>`);
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
${staticPages.map(page => `  <url><loc>${siteUrl}${page.route ? `/${page.route}` : '/'}</loc><lastmod>${lastmod}</lastmod><changefreq>${page.route.startsWith('product/') ? 'monthly' : 'weekly'}</changefreq><priority>${page.route ? '0.8' : '1.0'}</priority></url>`).join('\n')}
</urlset>
`;

await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(dist, 'robots.txt'), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`, 'utf8');
