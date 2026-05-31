import { CATALOG, ALL } from './data.js';
import { cardHTML, bindCards, leadLink } from './page-home.js';

const STYLE_LABELS = {
  'Дизайн': 'акцентные модели',
  'Классика': 'благородная классика',
  'Минимализм': 'чистая геометрия',
  'Неоклассика': 'мягкая современная классика',
};

function applyFilters(main) {
  const search = main.querySelector('[data-filter-search]')?.value.trim().toLowerCase() || '';
  const category = main.querySelector('[data-filter-category].is-active')?.dataset.value || '';
  const budget = main.querySelector('[data-filter-budget].is-active')?.dataset.value || '';
  const sort = main.querySelector('[data-filter-sort]')?.value || 'popular';

  let products = ALL.filter((p) => {
    const haystack = `${p.name} ${p.category} ${p.description || ''}`.toLowerCase();
    const searchOk = !search || haystack.includes(search);
    const categoryOk = !category || p.category === category;
    const price = p.priceFrom || 0;
    const budgetOk = !budget
      || (budget === 'mid' && price && price < 24000)
      || (budget === 'premium' && price >= 24000 && price < 32000)
      || (budget === 'signature' && price >= 32000)
      || (budget === 'custom' && !price);
    return searchOk && categoryOk && budgetOk;
  });

  if (sort === 'price') products = products.sort((a, b) => (a.priceFrom || 999999) - (b.priceFrom || 999999));
  if (sort === 'name') products = products.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  const grid = main.querySelector('[data-catalog-grid]');
  const count = main.querySelector('[data-catalog-count]');
  if (count) count.textContent = `${products.length} моделей`;
  if (grid) {
    grid.innerHTML = products.length
      ? products.map(cardHTML).join('')
      : `<div class="catalog-empty"><strong>Ничего лишнего</strong><p>Напишите нам — подберем модель вручную.</p><a href="${leadLink('Здравствуйте! Помогите подобрать дверь под интерьер.')}" target="_blank" rel="noopener noreferrer">Подобрать</a></div>`;
    bindCards(main);
  }
}

export function renderCatalog(main, activeCategory) {
  main.innerHTML = `
    <section class="catalog-studio">
      <div class="catalog-studio__hero">
        <span class="studio-kicker">Межкомнатные двери</span>
        <h1>Коллекция для спокойных интерьеров</h1>
        <p>Модель, отделка, высота и фурнитура подбираются под пространство.</p>
        <div class="catalog-studio__actions">
          <a class="studio-btn studio-btn--dark" href="${leadLink('Здравствуйте! Хочу подобрать межкомнатные двери Astera.')}" target="_blank" rel="noopener noreferrer">Подобрать дверь</a>
          <a class="studio-btn studio-btn--outline" href="#/designers">Я дизайнер</a>
        </div>
      </div>

      <div class="catalog-filter reveal">
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

  if (activeCategory) {
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
    });
  });
  main.querySelector('[data-filter-search]')?.addEventListener('input', () => applyFilters(main));
  main.querySelector('[data-filter-sort]')?.addEventListener('change', () => applyFilters(main));
  bindCards(main);
  applyFilters(main);
}
