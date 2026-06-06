import { CATALOG, ALL, fmt, variantImgs, HERO_IMG, CATEGORY_HEROES, EDITORIAL_IMG } from './data.js';
import { assetPath } from './asset.js';

const ARR_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const FACTS = [
  ['2014', 'в Калининграде'],
  ['9000+', 'установленных дверей'],
  ['5.0', 'рейтинг на картах'],
];

const ADVANTAGES = [
  ['01', 'Подбираем под интерьер', 'Учитываем стиль, высоту полотен, покрытие, фурнитуру и соседние материалы.'],
  ['02', 'Собираем объект целиком', 'Двери, входная группа, панели, рейки и перегородки выглядят как единое решение.'],
  ['03', 'Доводим до монтажа', 'Замеряем проемы, согласуем комплектацию и устанавливаем аккуратно, без случайных решений на объекте.'],
];

const PRODUCT_STORY = [
  {
    kicker: 'Главный выбор',
    title: 'Межкомнатные двери',
    text: 'Начинаем с планировки, стиля интерьера и бюджета. Покажем коллекции, отделки, высоты, фурнитуру и сразу посчитаем комплект под ваши проемы.',
    result: 'Модель, отделка и расчет под проемы',
    cta: 'Смотреть двери',
    href: '#/catalog/doors',
  },
  {
    kicker: 'Единая отделка',
    title: 'Панели и рейки',
    text: 'Подберем панели и рейки под двери, мебель и отделку стен: для прихожей, ТВ-зоны, скрытых проходов и акцентных стен.',
    result: 'Единая отделка без случайных оттенков',
    cta: 'Смотреть решения',
    href: '#/panels',
  },
  {
    kicker: 'Собственный бренд',
    title: 'Входные двери Astera',
    text: 'Изготавливаем входные двери под ваш проем: размер, тепло, тишина, отделка снаружи и внутри, фурнитура и монтаж.',
    result: 'Расчет под размер и отделку',
    cta: 'Открыть флагман',
    href: '#/entrance',
  },
];

const SCENES = [
  'квартира после дизайн-проекта',
  'частный дом или таунхаус',
  'кабинет, ресторан, студия',
  'объект дизайнера или архитектора',
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

const CATEGORY_COPY = {
  'Классика': 'Глубокие профили, мягкая пластика и спокойная парадность без лишнего декора.',
  'Неоклассика': 'Классическая линия в более легком, современном прочтении.',
  'Минимализм': 'Ровные плоскости, скрытые решения и точная геометрия проема.',
  'Дизайн': 'Акцентные полотна со стеклом, молдингами и выразительной фрезеровкой.',
};

const BRAND_DIRECTIONS = ['Межкомнатные двери', 'Входные двери Astera', 'Стеновые панели и рейки', 'Алюминиевые перегородки'];
const HERO_TRUST = ['замер', 'расчет', 'монтаж'];

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
      href: `#/catalog/${encodeURIComponent(cat.name)}`,
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
    const go = () => { location.hash = `/product/${el.dataset.slug}`; };
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
      href: '#/catalog/doors',
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

    <section class="studio-facts-section" aria-label="Преимущества Astera">
      <div class="studio-facts-head reveal">
        <span class="studio-kicker">Опыт Astera</span>
        <p>С 2014 года Astera подбирает двери и интерьерные решения для квартир, домов и проектов в Калининграде: от межкомнатных дверей до панелей, реек и входной группы.</p>
      </div>
      <div class="studio-facts reveal">
        ${FACTS.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}
      </div>
      <div class="studio-advantages">
        ${ADVANTAGES.map(([index, title, text]) => `
          <article class="studio-advantage reveal">
            <span>${index}</span>
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="studio-products" id="solutions">
      <div class="studio-section-head reveal">
        <span class="studio-kicker">Подбор под интерьер</span>
        <h2>Начните с дверей</h2>
        <p>Межкомнатные двери сильнее всего влияют на первое ощущение от интерьера. Подберем модель, высоту, оттенок и фурнитуру под ваши проемы, а затем при необходимости добавим панели, рейки, перегородки и входную дверь в той же логике.</p>
      </div>
      <div class="studio-product-stack">
        ${PRODUCT_STORY.map((item, i) => `
          <article class="studio-product reveal">
            <div class="studio-product__index">${String(i + 1).padStart(2, '0')}</div>
            <div>
              <span>${item.kicker}</span>
              <h3>${item.title}</h3>
            </div>
            <p>${item.text}</p>
            <div class="studio-product__result">${item.result}</div>
            <a href="${item.href}" ${item.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.cta} ${ARR_SVG}</a>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="studio-interior">
      <div class="studio-interior__media reveal">
        ${editorial ? `<img src="${assetPath(editorial)}" alt="Интерьерное решение Astera" loading="lazy" data-parallax>` : ''}
      </div>
      <div class="studio-interior__copy reveal">
        <span class="studio-kicker">Детали</span>
        <h2>Премиальный интерьер виден в деталях</h2>
        <p>Высота полотна, оттенок, ручка, короб, примыкание и монтаж работают вместе. Тогда двери выглядят частью интерьера, а не отдельной покупкой.</p>
        <div class="studio-scene-list">
          ${SCENES.map(item => `<span>${item}</span>`).join('')}
        </div>
      </div>
    </section>

    <section class="studio-catalog-preview reveal">
      <div class="studio-section-head">
        <span class="studio-kicker">Коллекция</span>
        <h2>Популярные модели дверей</h2>
        <p>Начните с модели, которая близка по стилю. Размер, покрытие, короб и фурнитуру рассчитаем под ваши проемы.</p>
      </div>
      <div class="studio-door-grid">
        ${showcase.map(cardHTML).join('')}
      </div>
      <div class="studio-center">
        <a class="studio-btn studio-btn--dark" href="#/catalog">Смотреть коллекцию</a>
      </div>
    </section>

    <section class="studio-promos reveal" id="promos">
      <div class="studio-section-head">
        <span class="studio-kicker">Предложения</span>
        <h2>Актуальные предложения</h2>
        <p>Акции и условия лучше считать после подбора: цена зависит от модели, размера, отделки, фурнитуры и монтажа.</p>
      </div>
      <div class="studio-promo-grid">
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
        <span class="studio-kicker">Контакт</span>
        <h2>Пришлите интерьер или размеры</h2>
        <p>Спокойно подскажем, какие модели подойдут, где можно сэкономить без потери вида и какой бюджет закладывать.</p>
      </div>
      <form class="studio-form" data-lead-form>
        <label><span>Имя</span><input name="name" autocomplete="name" required></label>
        <label><span>Телефон</span><input name="phone" autocomplete="tel" inputmode="tel" required></label>
        <label><span>Что планируете?</span><textarea name="task" rows="3" placeholder="Например: 5 дверей в квартиру, панели в прихожую, входная дверь..."></textarea></label>
        <button class="studio-btn studio-btn--dark" type="submit">Получить подбор</button>
        <small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</small>
      </form>
    </section>

    <section class="studio-designers reveal" id="designer-teaser">
      <div>
        <span class="studio-kicker">Для дизайнеров</span>
        <h2>Для дизайнеров и архитекторов</h2>
        <p>Помогаем подобрать двери, панели, перегородки и входные группы под проект. Образцы, расчет, замер, поставка и монтаж — в одном месте.</p>
      </div>
      <a class="studio-btn studio-btn--light" href="#/designers">Открыть презентацию ${ARR_SVG}</a>
    </section>`;

  bindCards(main);
  bindLeadForms(main);
  initMotion(main);
  bindHeroSlider(main);
}

export { cardHTML, bindCards, leadLink, bindLeadForms };
