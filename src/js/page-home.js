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
    title: 'Подбор по фото',
    text: 'Пришлите план, визуализацию или фото проемов: предложим модели и отделки для первого расчета.',
  },
  {
    title: 'Комплект на объект',
    text: 'Соберем в один комплект двери, панели, рейки, перегородки и входную группу.',
  },
  {
    title: 'Условия салона',
    text: 'Актуальные предложения по коллекциям и комплектам уточним после подбора.',
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
    lead: 'Главная покупка. С нее начинается ощущение интерьера: высота, геометрия, покрытие, ручка и короб должны работать вместе.',
    href: appHref('catalog/doors'),
    cta: 'Перейти к дверям',
    image: CATEGORY_HEROES['Минимализм'] || CATEGORY_HEROES['Дизайн'] || HERO_IMG,
    points: ['LORD коллекции', 'расчет под проем', 'фурнитура и монтаж'],
  },
  {
    index: '02',
    title: 'Панели, рейки, перегородки',
    lead: 'Второй слой проекта. Закрываем стены, прихожие, ТВ-зоны, скрытые проходы и легкое зонирование в единой отделке.',
    href: appHref('panels'),
    cta: 'Собрать стены',
    image: EDITORIAL_IMG || CATEGORY_HEROES['Дизайн'] || HERO_IMG,
    points: ['стеновые панели', 'декоративные рейки', 'алюминиевые перегородки'],
  },
  {
    index: '03',
    title: 'Входные двери Astera',
    lead: 'Флагман салона. Заказные входные двери под размер, фасад и интерьер: конструкция, тепло, тишина, отделка и монтаж.',
    href: appHref('entrance'),
    cta: 'Рассчитать вход',
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
    if (secondary) secondary.href = leadLink(scenario.message);
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
      title: 'Двери и интерьерные решения Astera',
      text: BRAND_DIRECTIONS,
      bg: heroImage,
      href: appHref('catalog/doors'),
      cta: 'Смотреть двери',
    },
    ...categoryHeroSlides(),
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
    </section>

    <section class="astera-selector reveal" data-scenario-selector>
      <div class="astera-selector__head">
        <span class="studio-kicker">Навигатор проекта</span>
        <h2>Начните не с каталога, а со своей задачи</h2>
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
            <p class="astera-selector__eyebrow">Astera собирает решение под объект</p>
            <h3 data-scenario-title></h3>
            <p data-scenario-lead></p>
          </div>
          <ol class="astera-selector__steps" data-scenario-steps></ol>
          <div class="astera-selector__result" data-scenario-result></div>
          <div class="astera-selector__actions">
            <a class="studio-btn studio-btn--dark" href="${PROJECT_SCENARIOS[0].route}" data-scenario-primary>${PROJECT_SCENARIOS[0].cta} ${ARR_SVG}</a>
            <a class="studio-btn studio-btn--outline" href="${leadLink(PROJECT_SCENARIOS[0].message)}" target="_blank" rel="noopener noreferrer" data-scenario-secondary>Получить маршрут</a>
          </div>
        </article>
      </div>
    </section>

    <section class="astera-proof reveal" aria-label="Опыт Astera">
      <div class="astera-proof__copy">
        <span class="studio-kicker">Салон Astera</span>
        <p>Мы помогаем выбрать не “красивую дверь на картинке”, а спокойное решение под конкретный интерьер, проемы и бюджет.</p>
      </div>
      <div class="astera-proof__facts">
        ${FACTS.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}
      </div>
    </section>

    <section class="astera-diagnosis reveal">
      <div class="astera-diagnosis__copy">
        <span class="studio-kicker">Метод подбора</span>
        <h2>Сначала объект. Потом модель.</h2>
        <p>Так клиент быстрее понимает бюджет, дизайнер получает аккуратную спецификацию, а интерьер не разваливается на случайные покупки.</p>
        <a class="studio-btn studio-btn--light" href="${leadLink('Здравствуйте! Хочу начать с подбора решения Astera под мой объект.')}" target="_blank" rel="noopener noreferrer">Начать подбор ${ARR_SVG}</a>
      </div>
      <div class="astera-diagnosis__grid">
        ${OBJECT_CHECK.map(([title, text], index) => `
          <article>
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${title}</strong>
            <p>${text}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="astera-lines" id="solutions">
      <div class="astera-lines__head reveal">
        <span class="studio-kicker">Что продаем</span>
        <h2>Три линии, из которых собирается интерьер</h2>
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

    <section class="studio-catalog-preview reveal">
      <div class="studio-section-head">
        <span class="studio-kicker">Каталог дверей</span>
        <h2>Начните с модели, а расчет сделаем под проем</h2>
        <p>В каталоге собраны популярные модели LORD. В карточке можно быстро перейти к расчету по размеру, отделке, коробу, фурнитуре и монтажу.</p>
      </div>
      <div class="studio-door-grid">
        ${showcase.map(cardHTML).join('')}
      </div>
      <div class="studio-center">
        <a class="studio-btn studio-btn--dark" href="${appHref('catalog/doors')}">Открыть межкомнатные двери</a>
      </div>
    </section>

    <section class="astera-partners reveal" id="designer-teaser">
      <div>
        <span class="studio-kicker">Партнерство</span>
        <h2>Дизайнерам — отдельный рабочий контур</h2>
        <p>Подбор под визуализацию, образцы, расчет, спецификация, замер и монтаж. Коммерческие условия показываем на отдельной странице, чтобы не смешивать их с розничной покупкой.</p>
      </div>
      <a class="studio-btn studio-btn--light" href="${appHref('designers')}">Открыть страницу дизайнеров ${ARR_SVG}</a>
    </section>

    <section class="astera-offers reveal" id="promos">
      <span class="studio-kicker">Предложения</span>
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
