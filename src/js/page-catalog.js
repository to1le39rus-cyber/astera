import { CATALOG, ALL, CATEGORY_HEROES } from './data.js';
import { cardHTML, bindCards, leadLink } from './page-home.js';
import { assetPath } from './asset.js';

const STYLE_LABELS = {
  'Дизайн': 'акцентные модели',
  'Классика': 'благородная классика',
  'Минимализм': 'чистая геометрия',
  'Неоклассика': 'мягкая современная классика',
};

const ORDERED_CATEGORIES = ['Классика', 'Неоклассика', 'Минимализм', 'Дизайн'];
const DOOR_CATEGORY_NAV = [
  { label: 'Классика', href: categoryHref('Классика') },
  { label: 'Неоклассика', href: categoryHref('Неоклассика') },
  { label: 'Минимализм', href: categoryHref('Минимализм') },
  { label: 'Скрытые двери', href: leadLink('Здравствуйте! Хочу обсудить скрытые двери под интерьер.') },
  { label: 'Алюминиевые перегородки', href: leadLink('Здравствуйте! Хочу рассчитать алюминиевую перегородку.') },
];

function categoryByName(name) {
  return CATALOG.find(c => c.name === name) || CATALOG.find(c => c.name.includes(name));
}

function categoryHref(name) {
  const found = categoryByName(name);
  return found ? `#/catalog/${encodeURIComponent(found.name)}` : '#/catalog';
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

function popularProducts(products, limit = 9) {
  return [...products].sort(() => Math.random() - 0.5).slice(0, limit);
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
  return [
    {
      mod: 'catalog-direction--featured',
      kicker: 'Главный выбор',
      title: 'Межкомнатные двери',
      text: 'Коллекции под классические, современные и минималистичные интерьеры.',
      image: doorImage,
      slides: doorCollectionSlides(),
      href: '#/catalog/doors',
      cta: 'Смотреть коллекции',
      second: 'Подобрать по фото',
      secondHref: leadLink('Здравствуйте! Хочу подобрать межкомнатные двери по фото интерьера.'),
      chips: DOOR_CATEGORY_NAV,
    },
    {
      kicker: 'Astera на заказ',
      title: 'Входные двери',
      text: 'Индивидуальный размер, внутренняя отделка под холл, тепло, тишина и аккуратный монтаж.',
      image: 'images/astera-entrance-door-burkovsky-inspired.png',
      href: leadLink('Здравствуйте! Хочу рассчитать входную дверь Astera под мой проем.'),
      cta: 'Заказать расчет',
      second: 'Как устроен заказ',
      secondHref: '#/lead',
    },
    {
      kicker: 'Единая плоскость',
      title: 'Стеновые панели',
      text: 'Для прихожих, ТВ-зон, скрытых проходов и стен, которые должны звучать вместе с дверями.',
      image: panelImage,
      href: leadLink('Здравствуйте! Хочу обсудить стеновые панели и рейки для интерьера.'),
      cta: 'Обсудить панели',
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
      : `<div class="catalog-empty"><strong>Ничего лишнего</strong><p>Напишите нам — подберем модель вручную.</p><a href="${leadLink('Здравствуйте! Помогите подобрать дверь под интерьер.')}" target="_blank" rel="noopener noreferrer">Подобрать</a></div>`;
    bindCards(main);
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
}

export function renderCatalog(main, activeCategory) {
  const directions = directionCards();
  const isDoorCatalog = activeCategory === 'doors';
  const showDoorCollections = Boolean(activeCategory);
  main.dataset.catalogMode = showDoorCollections ? 'doors' : '';
  main.innerHTML = `
    <section class="catalog-studio">
      <div class="catalog-studio__hero">
        <span class="studio-kicker">Каталог Astera</span>
        <h1>Выберите направление проекта</h1>
        <p>Двери, входная группа, панели и перегородки собираются в одну спецификацию под интерьер, проемы и монтаж.</p>
        <div class="catalog-studio__actions">
          <a class="studio-btn studio-btn--dark" href="${leadLink('Здравствуйте! Хочу получить подбор Astera по проекту.')}" target="_blank" rel="noopener noreferrer">Получить подбор</a>
          <a class="studio-btn studio-btn--outline" href="#/designers">Я дизайнер</a>
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
                  ${item.chips.map(chip => `<a href="${chip.href}">${chip.label}</a>`).join('')}
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
            <span>Модель</span>
            <input data-filter-search placeholder="Eclissi, Bella, минимализм..." autocomplete="off">
          </label>
          <label>
            <span>Порядок</span>
            <select data-filter-sort>
              <option value="popular">Astera choice</option>
              <option value="price">По цене</option>
              <option value="name">По названию</option>
            </select>
          </label>
        </div>

        <div class="catalog-filter__group" aria-label="Стиль">
          <button class="is-active" data-filter-category data-value="">Все стили</button>
          ${CATALOG.map(c => `
            <button class="${activeCategory === c.name ? 'is-active' : ''}" data-filter-category data-value="${c.name}">
              ${c.name}<small>${STYLE_LABELS[c.name] || ''}</small>
            </button>
          `).join('')}
        </div>

        <div class="catalog-filter__group catalog-filter__group--budget" aria-label="Бюджет">
          <button class="is-active" data-filter-budget data-value="">Любой бюджет</button>
          <button data-filter-budget data-value="mid">до 24 000 ₽</button>
          <button data-filter-budget data-value="premium">24 000-32 000 ₽</button>
          <button data-filter-budget data-value="signature">от 32 000 ₽</button>
          <button data-filter-budget data-value="custom">по проекту</button>
        </div>
      </div>

      <div class="catalog-studio__summary">
        <strong data-catalog-count>${ALL.length} моделей</strong>
        <span>Коллекции для квартир, домов и проектных интерьеров.</span>
      </div>

      <div class="studio-door-grid catalog-door-grid" data-catalog-grid>
        ${ALL.map(cardHTML).join('')}
      </div>

      <section class="catalog-consult reveal">
        <div>
          <span class="studio-kicker">Подбор</span>
          <h2>Покажите интерьер — предложим дверь</h2>
          <p>Фото, план или визуализация. Остальное уточним в диалоге.</p>
        </div>
        <a class="studio-btn studio-btn--light" href="${leadLink('Здравствуйте! Хочу подбор дверей под интерьер.')}" target="_blank" rel="noopener noreferrer">Написать</a>
      </section>
    </section>`;

  if (!showDoorCollections) {
    main.querySelector('.catalog-filter')?.remove();
    main.querySelector('.catalog-studio__summary')?.remove();
    main.querySelector('.catalog-door-grid')?.remove();
    main.querySelector('.catalog-consult')?.remove();
    return;
  }

  main.querySelector('.catalog-studio__hero').innerHTML = `
    <nav class="catalog-breadcrumbs" aria-label="Хлебные крошки">
      <a href="#/">Главная</a><span>/</span><a href="#/catalog">Каталог</a><span>/</span><strong>Межкомнатные двери</strong>
    </nav>
    <span class="studio-kicker">Коллекции Astera</span>
    <h1>Межкомнатные двери</h1>
  `;
  main.querySelector('.catalog-filter__top')?.remove();
  main.querySelector('.catalog-filter__group--budget')?.remove();
  const categoryGroup = main.querySelector('.catalog-filter__group');
  if (categoryGroup) {
    categoryGroup.innerHTML = `
      <button class="${isDoorCatalog ? 'is-active' : ''}" data-filter-category data-value="">Все</button>
      ${ORDERED_CATEGORIES.map(name => categoryByName(name)).filter(Boolean).map(c => `
        <button class="${activeCategory === c.name ? 'is-active' : ''}" data-filter-category data-value="${c.name}">
          ${c.name}
        </button>
      `).join('')}
      <a class="catalog-filter__link" href="${leadLink('Здравствуйте! Хочу рассчитать алюминиевую перегородку.')}" target="_blank" rel="noopener noreferrer">Алюминиевые перегородки</a>
    `;
  }
  const summaryText = main.querySelector('.catalog-studio__summary span');
  if (summaryText) summaryText.textContent = 'Случайная подборка моделей из разных коллекций. Обновляется при переходе и выборе категории.';
  main.querySelector('.catalog-consult')?.remove();

  if (activeCategory && !isDoorCatalog) {
    main.querySelectorAll('[data-filter-category]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.value === activeCategory);
    });
  }

  main.querySelectorAll('[data-filter-category], [data-filter-budget]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.hasAttribute('data-filter-category') ? '[data-filter-category]' : '[data-filter-budget]';
      main.querySelectorAll(group).forEach(item => item.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyFilters(main);
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
