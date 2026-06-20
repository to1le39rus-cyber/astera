import { CATALOG, ALL, fmt, variantImgs, HERO_IMG, CATEGORY_HEROES, EDITORIAL_IMG } from './data.js';
import { assetPath } from './asset.js';
import { appHref, categoryHref, navigateTo } from './routes.js';

const ARR_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const FACTS = [
  ['2014', 'в Калининграде'],
  ['9000+', 'установленных дверей'],
  ['5.0', 'рейтинг на картах'],
];

const PROMOS = [
  {
    title: '1. Знакомимся с вашим интерьером',
    text: 'Подойдет план, фото, визуализация или список проемов. Сначала понимаем стиль, размеры и задачу, а не предлагаем случайную модель.',
  },
  {
    title: '2. Предлагаем подходящие варианты',
    text: 'Подбираем модели, покрытия, фурнитуру и, если нужно, смежные решения: панели, рейки, перегородки или входную дверь Astera.',
  },
  {
    title: '3. Рассчитываем и сопровождаем',
    text: 'Готовим понятный расчет, уточняем замеры, сроки, поставку и монтаж. Вам не нужно собирать решение по частям.',
  },
];

const OBJECT_CHECK = [
  ['Проемы', 'высота, ширина, стены, плинтус, скрытые узлы'],
  ['Интерьер', 'пол, мебель, свет, оттенки стен и сценарий комнаты'],
  ['Комплект', 'двери, панели, рейки, перегородки и входная группа'],
  ['Монтаж', 'замер, поставка, аккуратная установка и контроль результата'],
];

const ASTERA_LANES = [
  {
    index: '01',
    title: 'Межкомнатные двери',
    lead: 'Главный выбор для квартиры, дома или проекта. Двери задают ритм интерьеру: высоту, линии, оттенок и ощущение тишины.',
    href: appHref('catalog/doors'),
    cta: 'Перейти к дверям',
    image: CATEGORY_HEROES['Минимализм'] || CATEGORY_HEROES['Дизайн'] || HERO_IMG,
    points: ['LORD коллекции', 'расчет под проем', 'фурнитура и монтаж'],
  },
  {
    index: '02',
    title: 'Панели, рейки, перегородки',
    lead: 'Панели, рейки и перегородки помогают связать двери, стены и зоны комнаты в единый спокойный интерьер.',
    href: appHref('panels'),
    cta: 'Подобрать панели и рейки',
    image: EDITORIAL_IMG || CATEGORY_HEROES['Дизайн'] || HERO_IMG,
    points: ['стеновые панели', 'декоративные рейки', 'алюминиевые перегородки'],
  },
  {
    index: '03',
    title: 'Входные двери Astera',
    lead: 'Флагман салона. Заказная входная дверь под размер, фасад и интерьер: конструкция, тепло, тишина, отделка и монтаж.',
    href: appHref('entrance'),
    cta: 'Рассчитать входную дверь',
    image: imageOf(productBySlug('eclissi')) || HERO_IMG,
    points: ['свой бренд', 'контрактное производство', 'под ваш проем'],
  },
];

const CATEGORY_COPY = {
  'Классика': 'Глубокие профили, мягкая пластика и спокойная парадность без лишнего декора.',
  'Неоклассика': 'Классическая линия в более легком, современном прочтении.',
  'Минимализм': 'Ровные плоскости, скрытые решения и точная геометрия проема.',
  'Дизайн': 'Акцентные полотна со стеклом, молдингами и выразительной фрезеровкой.',
};

const BRAND_DIRECTIONS = ['Межкомнатные двери', 'Входные двери Astera', 'Стеновые панели и рейки', 'Алюминиевые перегородки'];
const HERO_TRUST = ['замер', 'расчет', 'монтаж'];

const PROJECT_SCENARIOS = [
  {
    id: 'flat',
    label: 'Квартира',
    title: 'Комплект дверей для квартиры',
    lead: 'Подбираем межкомнатные двери под планировку, высоту проемов, покрытие пола, стены и бюджет. Сразу считаем комплект, а не одну случайную модель.',
    result: 'На выходе: 3-5 подходящих моделей, ориентир по бюджету, список замеров и понятный следующий шаг.',
    route: appHref('catalog/doors'),
    cta: 'Смотреть двери',
    message: 'Здравствуйте! Хочу подобрать комплект межкомнатных дверей для квартиры в Калининграде.',
    steps: ['Планировка и количество проемов', 'Стиль и оттенки интерьера', 'Модели LORD и фурнитура', 'Расчет комплекта и монтаж'],
  },
  {
    id: 'house',
    label: 'Дом',
    title: 'Двери, вход и стены в одной логике',
    lead: 'Для дома важно собрать интерьер целиком: межкомнатные двери, входную группу, панели, рейки и перегородки без разнобоя в оттенках.',
    result: 'На выходе: единая спецификация по зонам дома, приоритеты закупки и расчет под реальные проемы.',
    route: appHref('entrance'),
    cta: 'Собрать дом',
    message: 'Здравствуйте! Хочу собрать двери, входную группу и панели для дома.',
    steps: ['Зоны дома и фасад', 'Входная дверь Astera', 'Межкомнатные двери', 'Панели, рейки и перегородки'],
  },
  {
    id: 'designer',
    label: 'Дизайнер',
    title: 'Закрываем дверные узлы в проекте',
    lead: 'Помогаем дизайнеру не терять авторскую идею: подбираем модели, отделки, высоты, скрытые решения, панели и монтажные узлы.',
    result: 'На выходе: подбор под визуализацию, расчет, спецификация и партнерские условия до 20%.',
    route: appHref('designers'),
    cta: 'Для дизайнеров',
    message: 'Здравствуйте! Я дизайнер/архитектор, хочу обсудить проект с Astera.',
    steps: ['Визуализация или план', 'Подбор под концепцию', 'Спецификация и расчет', 'Замер, поставка, монтаж'],
  },
  {
    id: 'entrance',
    label: 'Вход',
    title: 'Входная дверь Astera под ваш проем',
    lead: 'Флагманское направление: входные двери под размер, фасад и интерьер. Считаем конструкцию, отделку, тепло, тишину и монтаж.',
    result: 'На выходе: техническое решение, ориентир по цене и список данных для точного расчета.',
    route: appHref('entrance'),
    cta: 'Рассчитать вход',
    message: 'Здравствуйте! Хочу рассчитать входную дверь Astera под мой проем.',
    steps: ['Фото проема и фасада', 'Размер и сценарий эксплуатации', 'Отделка снаружи и внутри', 'Замер и производство'],
  },
];

function productBySlug(slug) {
  return ALL.find(p => p.slug === slug);
}

function imageOf(product, type = 'lifestyle') {
  if (!product) return '';
  if (type === 'product') return variantImgs(product)[0] || product.images[0] || '';
  return product.images.find(im => /\.(jpg|jpeg|webp)$/i.test(im)) || product.images[0] || '';
}

function featuredProducts() {
  return ['eclissi', 'futuristic', 'altro-sf', 'bella', 'melford', 'dolce']
    .map(productBySlug)
    .filter(Boolean);
}

function categoryHeroSlides() {
  return CATALOG.map((cat) => {
    const first = cat.products?.[0];
    const bg = CATEGORY_HEROES[cat.name] || imageOf(first);
    return {
      type: 'collection',
      kicker: 'Коллекция',
      title: cat.name,
      text: CATEGORY_COPY[cat.name] || 'Двери под архитектуру пространства.',
      bg,
      href: categoryHref(cat.name),
      cta: 'Смотреть коллекцию',
    };
  }).filter(slide => slide.bg);
}

function leadLink(label = 'Здравствуйте! Хочу обсудить проект Astera.') {
  return `https://t.me/asteradoors?text=${encodeURIComponent(label)}`;
}

function cardHTML(p) {
  const thumb = variantImgs(p)[0] || p.images[0] || '';
  const price = p.priceFrom ? `от ${fmt(p.priceFrom)} ₽` : 'расчет по проекту';
  const variants = variantImgs(p).length;

  return `
    <article class="door-card reveal" data-slug="${p.slug}" role="button" tabindex="0">
      <div class="door-card__media">
        ${thumb ? `<img src="${assetPath(thumb)}" alt="${p.name}" loading="lazy">` : ''}
        <span class="door-card__tag">${p.category}</span>
      </div>
      <div class="door-card__body">
        <div>
          <h3>${p.name}</h3>
          <p>${variants ? `${variants} вариантов отделки` : 'отделка под проект'}</p>
        </div>
        <div class="door-card__foot">
          <strong>${price}</strong>
          <span>Смотреть модель ${ARR_SVG}</span>
        </div>
      </div>
    </article>`;
}

function bindCards(container) {
  container.querySelectorAll('.door-card').forEach(el => {
    const go = () => navigateTo(`product/${el.dataset.slug}`);
    el.addEventListener('click', go);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  });
}

function bindLeadForms(container) {
  container.querySelectorAll('[data-lead-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || 'Без имени';
      const phone = data.get('phone') || '';
      const task = data.get('task') || 'Хочу обсудить проект';
      const message = `Здравствуйте! Меня зовут ${name}. ${task}. Телефон: ${phone}`;
      window.open(leadLink(message), '_blank', 'noopener,noreferrer');
    });
  });
}

function initMotion(container) {
  const parallaxItems = container.querySelectorAll('[data-parallax]');
  const run = () => {
    const vh = window.innerHeight || 1;
    parallaxItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const progress = (rect.top - vh) / (rect.height + vh);
      const y = Math.max(-42, Math.min(42, progress * -58));
      item.style.setProperty('--py', `${y}px`);
    });
  };
  requestAnimationFrame(() => {
    run();
    window.addEventListener('scroll', run, { passive: true });
  });
}

function bindHeroSlider(container) {
  const hero = container.querySelector('[data-hero-slider]');
  if (!hero) return;

  const slides = [...hero.querySelectorAll('[data-hero-slide]')];
  const bgLayers = [...hero.querySelectorAll('[data-hero-bg]')];
  const dots = [...hero.querySelectorAll('[data-hero-dot]')];
  const count = slides.length;
  if (count < 2) return;

  let active = 0;
  let hasInteracted = false;
  let timer = null;

  const setSlide = (index) => {
    active = (index + count) % count;
    if (hasInteracted) hero.classList.add('has-transitioned');
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === active));
    bgLayers.forEach((layer, i) => layer.classList.toggle('is-active', i === active));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === active));
  };

  const start = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      hasInteracted = true;
      setSlide(active + 1);
    }, 7000);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      hasInteracted = true;
      setSlide(i);
      start();
    });
  });
  hero.querySelector('[data-hero-prev]')?.addEventListener('click', () => {
    hasInteracted = true;
    setSlide(active - 1);
    start();
  });
  hero.querySelector('[data-hero-next]')?.addEventListener('click', () => {
    hasInteracted = true;
    setSlide(active + 1);
    start();
  });

  setSlide(0);
  window.setTimeout(start, 1200);
}

function bindScenarioSelector(container) {
  const section = container.querySelector('[data-scenario-selector]');
  if (!section) return;

  const buttons = [...section.querySelectorAll('[data-scenario-button]')];
  const title = section.querySelector('[data-scenario-title]');
  const lead = section.querySelector('[data-scenario-lead]');
  const result = section.querySelector('[data-scenario-result]');
  const steps = section.querySelector('[data-scenario-steps]');
  const primary = section.querySelector('[data-scenario-primary]');
  const secondary = section.querySelector('[data-scenario-secondary]');

  const render = (id) => {
    const scenario = PROJECT_SCENARIOS.find(item => item.id === id) || PROJECT_SCENARIOS[0];
    buttons.forEach(button => button.classList.toggle('is-active', button.dataset.scenarioButton === scenario.id));
    if (title) title.textContent = scenario.title;
    if (lead) lead.textContent = scenario.lead;
    if (result) result.textContent = scenario.result;
    if (steps) steps.innerHTML = scenario.steps.map((step, index) => `
      <li><span>${String(index + 1).padStart(2, '0')}</span>${step}</li>
    `).join('');
    if (primary) {
      primary.href = scenario.route;
      primary.innerHTML = `${scenario.cta} ${ARR_SVG}`;
    }
    if (secondary) secondary.href = appHref('project');
  };

  buttons.forEach(button => {
    button.addEventListener('click', () => render(button.dataset.scenarioButton));
  });
  render(PROJECT_SCENARIOS[0].id);
}

export function renderHome(main) {
  const heroProduct = productBySlug('eclissi') || ALL[0];
  const heroImage = HERO_IMG || imageOf(heroProduct);
  const heroSlides = [
    {
      type: 'brand',
      kicker: 'Astera / Калининград',
      title: 'Межкомнатные двери под ваш интерьер',
      text: BRAND_DIRECTIONS,
      bg: heroImage,
      href: appHref('catalog/doors'),
      cta: 'Смотреть двери',
    },
  ];
  const showcase = featuredProducts();
  const editorial = EDITORIAL_IMG || imageOf(productBySlug('futuristic')) || heroImage;

  main.innerHTML = `
    <section class="studio-hero" data-hero-slider>
      <div class="studio-hero__backgrounds" aria-hidden="true">
        ${heroSlides.map((slide, i) => `
          ${slide.bg ? `<div class="studio-hero__image${i === 0 ? ' is-active' : ''}" data-hero-bg data-parallax style="background-image:url('${assetPath(slide.bg)}')"></div>` : ''}
        `).join('')}
      </div>
      <div class="studio-hero__slides">
        ${heroSlides.map((slide, i) => `
          <article class="studio-hero__slide${i === 0 ? ' is-active' : ''}" data-hero-slide>
            <div class="studio-hero__inner">
              <div class="studio-hero__copy">
                <span class="studio-kicker">${slide.kicker}</span>
                ${i === 0 ? `<h1>${slide.title}</h1>` : `<h2>${slide.title}</h2>`}
                ${Array.isArray(slide.text)
                  ? `<div class="studio-hero__directions">${slide.text.map(item => `<span>${item}</span>`).join('')}</div>`
                  : `<p>${slide.text}</p>`}
                <div class="studio-hero__actions">
                  <a class="studio-btn studio-btn--light" href="${leadLink('Здравствуйте! Хочу получить расчет Astera по интерьеру и проемам.')}" target="_blank" rel="noopener noreferrer">Получить расчет</a>
                  <a class="studio-btn studio-btn--ghost" href="${slide.href}">${slide.cta} ${ARR_SVG}</a>
                </div>
                <div class="studio-hero__trust">
                  ${HERO_TRUST.map(item => `<span>${item}</span>`).join('')}
                </div>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
      <div class="studio-hero__veil"></div>
      ${heroSlides.length > 1 ? `
        <div class="studio-hero__nav" aria-label="Слайды коллекций">
          <button type="button" data-hero-prev aria-label="Предыдущий слайд">←</button>
          <div class="studio-hero__dots">
            ${heroSlides.map((slide, i) => `
              <button type="button" class="${i === 0 ? 'is-active' : ''}" data-hero-dot aria-label="${slide.title}">
                <span>${i === 0 ? 'Astera' : slide.title}</span>
              </button>
            `).join('')}
          </div>
          <button type="button" data-hero-next aria-label="Следующий слайд">→</button>
        </div>
      ` : ''}
    </section>

    <section class="astera-new-flow reveal" id="new-flow">
      <div class="astera-new-flow__intro">
        <span class="studio-kicker">Astera / маршрут покупки</span>
        <h2>Сначала понимаем интерьер. Потом подбираем двери.</h2>
        <p>Покупателю не нужен длинный рассказ о категориях. Ему нужно быстро понять, что подойдет в его квартиру, дом или проект, сколько это будет стоить и как не ошибиться с проемами, оттенками и монтажом.</p>
      </div>
      <div class="astera-new-flow__grid">
        <a class="astera-new-card astera-new-card--primary" href="${appHref('catalog/doors')}">
          <span>01 / главный выбор</span>
          <h3>Межкомнатные двери</h3>
          <p>Коллекции LORD, подбор под стиль, высоту, покрытие, фурнитуру и монтаж. Начинаем с дверей, потому что они задают ритм всему интерьеру.</p>
          <strong>Смотреть коллекции ${ARR_SVG}</strong>
        </a>
        <a class="astera-new-card" href="${appHref('panels')}">
          <span>02 / цельная отделка</span>
          <h3>Панели и рейки</h3>
          <p>Когда нужны акцентные стены, ТВ-зоны, прихожие, скрытые проходы и спокойные линии вокруг дверей.</p>
          <strong>Собрать стены ${ARR_SVG}</strong>
        </a>
        <a class="astera-new-card" href="${appHref('entrance')}">
          <span>03 / флагман Astera</span>
          <h3>Входная дверь на заказ</h3>
          <p>Собственное направление: конструкция, фасад, внутренняя отделка, тепло, тишина и монтаж под ваш проем.</p>
          <strong>Рассчитать вход ${ARR_SVG}</strong>
        </a>
      </div>
    </section>

    <section class="astera-buy-path reveal">
      <div class="astera-buy-path__media">
        ${editorial ? `<img src="${assetPath(editorial)}" alt="Подбор дверей и интерьерных решений Astera" loading="lazy">` : ''}
      </div>
      <div class="astera-buy-path__copy">
        <span class="studio-kicker">Не каталог ради каталога</span>
        <h2>В салоне собираем решение, а не просто показываем модель.</h2>
        <div class="astera-buy-path__steps">
          ${[
            ['Фото или план', 'Вы присылаете интерьер, проемы или визуализацию. Можно без точных размеров.'],
            ['Подбор', 'Мы предлагаем модели, оттенки, фурнитуру и смежные решения без визуального шума.'],
            ['Расчет', 'Считаем комплект под проем, отделку, короб, наличники, монтаж и сроки.'],
          ].map(([title, text], index) => `
            <article>
              <span>${String(index + 1).padStart(2, '0')}</span>
              <strong>${title}</strong>
              <p>${text}</p>
            </article>
          `).join('')}
        </div>
        <a class="studio-btn studio-btn--dark" href="${appHref('project')}">Начать с моего интерьера</a>
      </div>
    </section>

    <section class="astera-editorial-links reveal">
      <a href="${appHref('designers')}">
        <span>Дизайнерам</span>
        <h3>Спецификации, образцы, узлы и партнерские условия.</h3>
      </a>
      <a href="${appHref('developers')}">
        <span>Застройщикам</span>
        <h3>Повторяемые комплектации для объектов, сроков и монтажа.</h3>
      </a>
    </section>

    <section class="astera-diagnosis reveal">
      <div class="astera-diagnosis__copy">
        <span class="studio-kicker">Главное направление</span>
        <h2>Двери, с которых начинается интерьер</h2>
        <p>Поможем выбрать межкомнатные двери под стиль, высоту проемов, оттенки стен, покрытие пола и фурнитуру. Можно начать с фото, плана или просто рассказа о ремонте.</p>
        <a class="studio-btn studio-btn--light" href="${appHref('catalog/doors')}">Смотреть межкомнатные двери ${ARR_SVG}</a>
      </div>
      <div class="astera-diagnosis__grid">
        ${[
          ['Стиль', 'классика, неоклассика, минимализм, дизайн и скрытые решения'],
          ['Проемы', 'высота, ширина, короб, наличники, примыкания и плинтус'],
          ['Отделка', 'цвет полотна, покрытие, стекло, ручка и единая линия с интерьером'],
          ['Монтаж', 'замер, поставка, аккуратная установка и контроль результата'],
        ].map(([title, text], index) => `
          <article>
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${title}</strong>
            <p>${text}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="astera-selector reveal" data-scenario-selector>
      <div class="astera-selector__head">
        <span class="studio-kicker">С чем поможем</span>
        <h2>Подберем под квартиру, дом или проект</h2>
      </div>
      <div class="astera-selector__grid">
        <div class="astera-selector__tabs" role="tablist" aria-label="Сценарии подбора Astera">
          ${PROJECT_SCENARIOS.map((item, index) => `
            <button type="button" class="${index === 0 ? 'is-active' : ''}" data-scenario-button="${item.id}">
              <span>${String(index + 1).padStart(2, '0')}</span>
              ${item.label}
            </button>
        `).join('')}
        </div>
        <article class="astera-selector__panel">
          <div>
            <p class="astera-selector__eyebrow">Подберем решение под ваш дом или квартиру</p>
            <h3 data-scenario-title></h3>
            <p data-scenario-lead></p>
          </div>
          <ol class="astera-selector__steps" data-scenario-steps></ol>
          <div class="astera-selector__result" data-scenario-result></div>
          <div class="astera-selector__actions">
            <a class="studio-btn studio-btn--dark" href="${PROJECT_SCENARIOS[0].route}" data-scenario-primary>${PROJECT_SCENARIOS[0].cta} ${ARR_SVG}</a>
            <a class="studio-btn studio-btn--outline" href="${appHref('project')}" data-scenario-secondary>Получить расчет</a>
          </div>
        </article>
      </div>
    </section>

    <section class="astera-flagship reveal">
      <div class="astera-flagship__media">
        ${heroImage ? `<img src="${assetPath(heroImage)}" alt="Входные двери Astera под заказ" loading="lazy">` : ''}
      </div>
      <div class="astera-flagship__copy">
        <span class="studio-kicker">Флагман Astera</span>
        <h2>Входная дверь под фасад и интерьер</h2>
        <p>Собственное направление Astera: дверь проектируется под размер проема, улицу или подъезд, внутреннюю отделку, ручку, тепло, тишину и монтаж.</p>
        <div class="astera-flagship__specs">
          <span>размер под проем</span>
          <span>внутренняя отделка</span>
          <span>контрактное производство</span>
        </div>
        <a class="studio-btn studio-btn--light" href="${appHref('entrance')}">Собрать входную дверь ${ARR_SVG}</a>
      </div>
    </section>

    <section class="astera-proof reveal" aria-label="Опыт Astera">
      <div class="astera-proof__copy">
        <span class="studio-kicker">Почему доверяют</span>
        <p>Astera помогает выбрать решение, которое спокойно пройдет путь от салона до монтажа.</p>
      </div>
      <div class="astera-proof__facts">
        ${FACTS.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}
      </div>
    </section>

    <section class="astera-lines" id="solutions">
      <div class="astera-lines__head reveal">
        <span class="studio-kicker">Слои интерьера</span>
        <h2>Из чего собираем цельное пространство</h2>
      </div>
      <div class="astera-line-list">
        ${ASTERA_LANES.map((item) => `
          <article class="astera-line reveal">
            <a class="astera-line__media" href="${item.href}">
              ${item.image ? `<img src="${assetPath(item.image)}" alt="${item.title}" loading="lazy">` : ''}
              <span>${item.index}</span>
            </a>
            <div class="astera-line__body">
              <h3>${item.title}</h3>
              <p>${item.lead}</p>
              <div class="astera-line__points">
                ${item.points.map(point => `<span>${point}</span>`).join('')}
              </div>
              <a href="${item.href}">${item.cta} ${ARR_SVG}</a>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="studio-catalog-preview reveal">
      <div class="studio-section-head">
        <span class="studio-kicker">Коллекции дверей</span>
        <h2>Выберите настроение интерьера</h2>
        <p>Сначала выберите близкое направление. В салоне покажем образцы, оттенки, фурнитуру и рассчитаем комплект под ваши проемы.</p>
      </div>
      <div class="astera-collection-grid">
        ${categoryHeroSlides().map((slide, index) => `
          <a class="astera-collection-card" href="${slide.href}">
            ${slide.bg ? `<img src="${assetPath(slide.bg)}" alt="${slide.title}" loading="lazy">` : ''}
            <span>${String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>${slide.title}</h3>
              <p>${slide.text}</p>
            </div>
          </a>
        `).join('')}
      </div>
      <div class="studio-center">
        <a class="studio-btn studio-btn--dark" href="${appHref('catalog/doors')}">Открыть межкомнатные двери</a>
      </div>
    </section>

    <section class="astera-partners reveal" id="designer-teaser">
      <div>
        <span class="studio-kicker">Партнерство</span>
        <h2>Дизайнерам и объектам — отдельный рабочий путь</h2>
        <p>Для дизайнеров готовим подбор, образцы, расчет и спецификацию под визуализацию. Для объектов собираем повторяемые комплектации дверей, панелей, перегородок и входных групп под сроки и монтаж.</p>
      </div>
      <div class="astera-partners__actions">
        <a class="studio-btn studio-btn--light" href="${appHref('designers')}">Дизайнерам ${ARR_SVG}</a>
        <a class="studio-btn studio-btn--outline" href="${appHref('developers')}">Застройщикам ${ARR_SVG}</a>
      </div>
    </section>

    <section class="astera-offers reveal" id="promos">
      <span class="studio-kicker">Как проходит работа</span>
      <div class="astera-offers__grid">
        ${PROMOS.map(item => `
          <article>
            <strong>${item.title}</strong>
            <p>${item.text}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="studio-lead reveal" id="lead">
      <div class="studio-lead__copy">
        <span class="studio-kicker">Расчет</span>
        <h2>Пришлите план, фото или размеры</h2>
        <p>Мы предложим спокойный маршрут: какие двери смотреть, где нужны панели или рейки, что считать сразу, а что можно оставить на второй этап.</p>
      </div>
      <form class="studio-form" data-lead-form>
        <label><span>Имя</span><input name="name" autocomplete="name" required></label>
        <label><span>Телефон</span><input name="phone" autocomplete="tel" inputmode="tel" required></label>
        <label><span>Что планируете?</span><textarea name="task" rows="3" placeholder="Например: 5 дверей в квартиру, панели в прихожую, входная дверь..."></textarea></label>
        <button class="studio-btn studio-btn--dark" type="submit">Получить подбор</button>
        <small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</small>
      </form>
    </section>`;

  bindCards(main);
  bindLeadForms(main);
  initMotion(main);
  bindHeroSlider(main);
  bindScenarioSelector(main);
}

export { cardHTML, bindCards, leadLink, bindLeadForms };
