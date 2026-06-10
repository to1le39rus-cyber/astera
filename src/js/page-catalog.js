import { CATALOG, ALL, CATEGORY_HEROES } from './data.js';
import { cardHTML, bindCards, leadLink } from './page-home.js';
import { assetPath } from './asset.js';
import { appHref, navigateTo } from './routes.js';

const STYLE_LABELS = {
  'Дизайн': 'акцентные полотна',
  'Классика': 'выразительная классика',
  'Минимализм': 'чистая плоскость',
  'Неоклассика': 'мягкая современная линия',
};

const ORDERED_CATEGORIES = ['Классика', 'Неоклассика', 'Минимализм', 'Дизайн'];
const DOOR_CATEGORY_NAV = [
  { label: 'Классика', href: appHref('catalog/doors'), category: 'Классика' },
  { label: 'Неоклассика', href: appHref('catalog/doors'), category: 'Неоклассика' },
  { label: 'Минимализм', href: appHref('catalog/doors'), category: 'Минимализм' },
  { label: 'Скрытые двери', href: leadLink('Здравствуйте! Хочу обсудить скрытые двери под интерьер.') },
  { label: 'Алюминиевые перегородки', href: appHref('partitions') },
];

function categoryByName(name) {
  return CATALOG.find(c => c.name === name) || CATALOG.find(c => c.name.includes(name));
}

function lifestyleFromCategory(name) {
  const found = categoryByName(name);
  return (found && (CATEGORY_HEROES[found.name] || found.products?.[0]?.images?.find(im => /\.(jpg|jpeg|webp)$/i.test(im)) || found.products?.[0]?.images?.[0])) || '';
}

function doorCollectionSlides() {
  return [
    ['Классика', lifestyleFromCategory('Классика')],
    ['Неоклассика', lifestyleFromCategory('Неоклассика')],
    ['Минимализм', lifestyleFromCategory('Минимализм')],
    ['Дизайн', lifestyleFromCategory('Дизайн')],
  ].filter(([, image]) => image).map(([label, image]) => ({ label, image }));
}

const CURATED_ORDER = ['eclissi', 'bella', 'melford', 'dolce', 'futuristic', 'altro-sf', 'astoria', 'solo', 'tocco', 'deco', 'italy'];

function popularProducts(products, limit = 12) {
  return [...products].sort((a, b) => {
    const ai = CURATED_ORDER.indexOf(a.slug);
    const bi = CURATED_ORDER.indexOf(b.slug);
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    return a.name.localeCompare(b.name, 'ru');
  }).slice(0, limit);
}

function normalizeText(value = '') {
  return String(value).trim().toLocaleLowerCase('ru-RU');
}

function productsForCategory(category) {
  if (!category) return ALL;
  const found = CATALOG.find(c => normalizeText(c.name) === normalizeText(category));
  return found?.products?.length ? found.products : ALL.filter(p => normalizeText(p.category) === normalizeText(category));
}

function directionCards() {
  const doorImage = lifestyleFromCategory('Дизайн') || lifestyleFromCategory('Неоклассика') || ALL[0]?.images?.[0] || '';
  const panelImage = lifestyleFromCategory('Минимализм') || doorImage;
  const partitionImage = lifestyleFromCategory('Дизайн') || panelImage;
  return [
    {
      mod: 'catalog-direction--featured',
      kicker: 'Основная коллекция',
      title: 'Межкомнатные двери',
      text: 'Главный выбор для квартиры, дома или дизайн-проекта: стиль, высота, отделка и фурнитура под ваши проемы.',
      image: doorImage,
      slides: doorCollectionSlides(),
      href: appHref('catalog/doors'),
      cta: 'Смотреть коллекции',
      second: 'Подобрать по фото',
      secondHref: leadLink('Здравствуйте! Хочу подобрать межкомнатные двери по фото интерьера.'),
      chips: DOOR_CATEGORY_NAV,
    },
    {
      kicker: 'Astera на заказ',
      title: 'Входные двери Astera',
      text: 'Индивидуальный размер, отделка под фасад и холл, тепло, тишина и аккуратное примыкание к стенам.',
      image: 'images/astera-entrance-door-burkovsky-inspired.png',
      href: appHref('entrance'),
      cta: 'Смотреть флагман',
      second: 'Рассчитать дверь',
      secondHref: leadLink('Здравствуйте! Хочу рассчитать входную дверь Astera под мой проем.'),
    },
    {
      kicker: 'Единая отделка',
      title: 'Стеновые панели и рейки',
      text: 'Для прихожих, ТВ-зон, скрытых проходов и акцентных стен в одной логике с дверями.',
      image: panelImage,
      href: appHref('panels'),
      cta: 'Смотреть решения',
      second: 'Получить ориентир',
      secondHref: leadLink('Здравствуйте! Хочу обсудить стеновые панели и рейки для интерьера.'),
    },
    {
      kicker: 'Свет и зонирование',
      title: 'Алюминиевые перегородки',
      text: 'Для кабинета, гардеробной, кухни-гостиной и приватных зон, где важно сохранить свет и легкость.',
      image: partitionImage,
      href: appHref('partitions'),
      cta: 'Смотреть перегородки',
      second: 'Рассчитать',
      secondHref: leadLink('Здравствуйте! Хочу рассчитать алюминиевую перегородку под интерьер.'),
    },
  ];
}

function applyFilters(main) {
  const search = main.querySelector('[data-filter-search]')?.value.trim().toLowerCase() || '';
  const category = main.querySelector('[data-filter-category].is-active')?.dataset.value || '';
  const budget = main.querySelector('[data-filter-budget].is-active')?.dataset.value || '';
  const sort = main.querySelector('[data-filter-sort]')?.value || 'popular';

  const sourceProducts = productsForCategory(category);
  let products = sourceProducts.filter((p) => {
    const haystack = `${p.name} ${p.category} ${p.description || ''}`.toLowerCase();
    const searchOk = !search || haystack.includes(search);
    const price = p.priceFrom || 0;
    const budgetOk = !budget
      || (budget === 'mid' && price && price < 24000)
      || (budget === 'premium' && price >= 24000 && price < 32000)
      || (budget === 'signature' && price >= 32000)
      || (budget === 'custom' && !price);
    return searchOk && budgetOk;
  });

  const isDoorMode = main.dataset.catalogMode === 'doors';
  if (!products.length && isDoorMode && category) {
    products = productsForCategory(category);
  }
  if (isDoorMode) {
    products = popularProducts(products);
  } else {
    if (sort === 'price') products = products.sort((a, b) => (a.priceFrom || 999999) - (b.priceFrom || 999999));
    if (sort === 'name') products = products.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  }

  const grid = main.querySelector('[data-catalog-grid]');
  const count = main.querySelector('[data-catalog-count]');
  const selectedCategory = main.querySelector('[data-filter-category].is-active')?.dataset.value || '';
  const countLabel = isDoorMode
    ? (selectedCategory ? `Популярное: ${selectedCategory}` : 'Популярные модели')
    : `${products.length} моделей`;
  if (count) count.textContent = `${products.length} моделей`;
  if (count) count.textContent = countLabel;
  if (grid) {
    grid.innerHTML = products.length
      ? products.map(cardHTML).join('')
      : `<div class="catalog-empty"><strong>Не нашли подходящую модель</strong><p>Пришлите фото интерьера, и мы предложим варианты.</p><a href="${leadLink('Здравствуйте! Помогите подобрать дверь под интерьер.')}" target="_blank" rel="noopener noreferrer">Получить подбор</a></div>`;
    bindCards(main);
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
}

export function renderCatalog(main, activeCategory) {
  const directions = directionCards();
  const selectedCategory = activeCategory === 'doors' ? '' : activeCategory;
  const showDoorCollections = activeCategory === 'doors' || Boolean(categoryByName(activeCategory));
  main.dataset.catalogMode = showDoorCollections ? 'doors' : '';
  main.innerHTML = `
    <section class="catalog-studio">
      <div class="catalog-studio__hero">
        <span class="studio-kicker">Выбор направления</span>
        <h1>С чего начнем интерьер?</h1>
        <p>Выберите направление, а мы поможем связать двери, панели, входную группу и перегородки в цельный интерьер.</p>
        <div class="catalog-studio__actions">
          <a class="studio-btn studio-btn--dark" href="${leadLink('Здравствуйте! Хочу обсудить подбор Astera по интерьеру.')}" target="_blank" rel="noopener noreferrer">Обсудить подбор</a>
          <a class="studio-btn studio-btn--outline" href="${appHref('catalog/doors')}">Смотреть двери</a>
        </div>
      </div>

      ${!showDoorCollections ? `
      <div class="catalog-directions reveal-stagger" aria-label="Направления каталога">
        ${directions.map((item) => `
          <article class="catalog-direction ${item.mod || ''}">
            <a class="catalog-direction__media" href="${item.href}" ${item.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
              ${item.slides?.length ? `
                <div class="catalog-direction__slider" aria-label="Интерьеры межкомнатных дверей">
                  ${item.slides.map(slide => `
                    <figure>
                      <img src="${assetPath(slide.image)}" alt="${slide.label}" loading="lazy">
                      <figcaption>${slide.label}</figcaption>
                    </figure>
                  `).join('')}
                </div>
              ` : item.image ? `<img src="${assetPath(item.image)}" alt="${item.title}" loading="lazy">` : ''}
              <span>${item.kicker}</span>
            </a>
            <div class="catalog-direction__body">
              <div>
                <h2>${item.title}</h2>
                <p>${item.text}</p>
              </div>
              ${item.chips ? `
                <div class="catalog-direction__chips" aria-label="Стили межкомнатных дверей">
                  ${item.chips.map(chip => `<a href="${chip.href}" ${chip.category ? `data-door-category="${chip.category}"` : ''}>${chip.label}</a>`).join('')}
                </div>
                <div class="catalog-direction__scrollhint" aria-hidden="true"><span></span></div>
              ` : ''}
              <div class="catalog-direction__actions">
                <a href="${item.href}" ${item.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.cta}</a>
                ${item.second ? `<a class="catalog-direction__muted" href="${item.secondHref}" ${item.secondHref.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.second}</a>` : ''}
              </div>
            </div>
          </article>
        `).join('')}
      </div>
      ` : ''}

      <div class="catalog-filter reveal" id="door-collections">
        <div class="catalog-filter__top">
          <label>
            <span>Поиск по модели</span>
            <input data-filter-search placeholder="Модель, стиль или коллекция" autocomplete="off">
          </label>
          <label>
            <span>Сортировка</span>
            <select data-filter-sort>
              <option value="popular">Рекомендуем</option>
              <option value="price">Сначала дешевле</option>
              <option value="name">По алфавиту</option>
            </select>
          </label>
        </div>

        <div class="catalog-filter__group" aria-label="Стиль">
          <button class="is-active" data-filter-category data-value="">Все коллекции</button>
          ${CATALOG.map(c => `
            <button class="${activeCategory === c.name ? 'is-active' : ''}" data-filter-category data-value="${c.name}">
              ${c.name}<small>${STYLE_LABELS[c.name] || ''}</small>
            </button>
          `).join('')}
        </div>

        <div class="catalog-filter__group catalog-filter__group--budget" aria-label="Бюджет">
          <button class="is-active" data-filter-budget data-value="">Любая стоимость</button>
          <button data-filter-budget data-value="mid">до 24 000 ₽</button>
          <button data-filter-budget data-value="premium">24 000-32 000 ₽</button>
          <button data-filter-budget data-value="signature">от 32 000 ₽</button>
          <button data-filter-budget data-value="custom">индивидуально</button>
        </div>
      </div>

      <div class="catalog-studio__summary">
        <strong data-catalog-count>${ALL.length} моделей</strong>
        <span>Коллекции для квартир, домов и интерьеров по проекту.</span>
      </div>

      <div class="studio-door-grid catalog-door-grid" data-catalog-grid>
        ${ALL.map(cardHTML).join('')}
      </div>

      <section class="catalog-consult reveal">
        <div>
          <span class="studio-kicker">Подбор</span>
          <h2>Пришлите интерьер, подберем дверь</h2>
          <p>Подойдет фото, план или визуализация. Мы уточним проемы, стиль, отделку и предложим варианты для расчета.</p>
        </div>
        <a class="studio-btn studio-btn--light" href="${leadLink('Здравствуйте! Хочу подбор дверей под интерьер.')}" target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
      </section>
    </section>`;

  if (!showDoorCollections) {
    main.querySelectorAll('[data-door-category]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        window.sessionStorage?.setItem('asteraDoorCategory', link.dataset.doorCategory || '');
        navigateTo('catalog/doors');
      });
    });
    main.querySelector('.catalog-filter')?.remove();
    main.querySelector('.catalog-studio__summary')?.remove();
    main.querySelector('.catalog-door-grid')?.remove();
    main.querySelector('.catalog-consult')?.remove();
    return;
  }

  main.querySelector('.catalog-studio__hero').innerHTML = `
    <nav class="catalog-breadcrumbs" aria-label="Хлебные крошки">
      <a href="${appHref('')}">Главная</a><span>/</span><a href="${appHref('catalog')}">Каталог</a><span>/</span><strong>Межкомнатные двери</strong>
    </nav>
    <span class="studio-kicker">Коллекции дверей Astera</span>
    <h1>Межкомнатные двери LORD в Калининграде</h1>
    <p>Классика, неоклассика, минимализм и дизайн. Подберем модель, покрытие, высоту полотна, короб и фурнитуру под ваши проемы.</p>
  `;
  main.querySelector('.catalog-filter__top')?.remove();
  main.querySelector('.catalog-filter__group--budget')?.remove();
  const categoryGroup = main.querySelector('.catalog-filter__group');
  if (categoryGroup) {
    categoryGroup.innerHTML = `
      <button class="${!selectedCategory ? 'is-active' : ''}" data-filter-category data-value="">Все</button>
      ${ORDERED_CATEGORIES.map(name => categoryByName(name)).filter(Boolean).map(c => `
        <button class="${selectedCategory === c.name ? 'is-active' : ''}" data-filter-category data-value="${c.name}">
          ${c.name}
        </button>
      `).join('')}
      <a class="catalog-filter__link" href="${appHref('partitions')}">Алюминиевые перегородки</a>
    `;
  }
  const summaryText = main.querySelector('.catalog-studio__summary span');
  if (summaryText) summaryText.textContent = 'Популярные модели из разных коллекций. Выберите стиль, чтобы сузить подборку.';
  main.querySelector('.catalog-consult')?.remove();

  const storedCategory = window.sessionStorage?.getItem('asteraDoorCategory') || '';
  if (!selectedCategory && storedCategory) {
    window.sessionStorage?.removeItem('asteraDoorCategory');
    const storedButton = main.querySelector(`[data-filter-category][data-value="${storedCategory}"]`);
    if (storedButton) {
      main.querySelectorAll('[data-filter-category]').forEach(btn => btn.classList.remove('is-active'));
      storedButton.classList.add('is-active');
    }
  } else if (selectedCategory) {
    main.querySelectorAll('[data-filter-category]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.value === selectedCategory);
    });
  }

  main.querySelectorAll('[data-filter-category], [data-filter-budget]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.hasAttribute('data-filter-category') ? '[data-filter-category]' : '[data-filter-budget]';
      main.querySelectorAll(group).forEach(item => item.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyFilters(main);
      if (btn.hasAttribute('data-filter-category')) {
        window.history.replaceState({}, '', appHref('catalog/doors'));
      }
      if (main.dataset.catalogMode === 'doors') {
        main.querySelector('.catalog-studio__summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  main.querySelector('[data-filter-search]')?.addEventListener('input', () => applyFilters(main));
  main.querySelector('[data-filter-sort]')?.addEventListener('change', () => applyFilters(main));
  bindCards(main);
  applyFilters(main);
}
