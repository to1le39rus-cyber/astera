import { CATALOG, CATEGORY_HEROES } from './data.js';
import { bindLeadForms, leadLink } from './page-home.js';
import { assetPath } from './asset.js';

const ARR_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const FALLBACK_IMAGE = CATEGORY_HEROES['Минимализм'] || CATEGORY_HEROES['Дизайн'] || CATALOG[0]?.products?.[0]?.images?.[0] || '';

const PAGES = {
  panels: {
    crumb: 'Панели и рейки',
    kicker: 'Стены в той же логике',
    title: 'Стеновые панели и декоративные рейки',
    lead: 'Когда дверь, стена и мебель говорят на одном языке, интерьер выглядит собранным. Подберем панели, рейки, скрытые проходы и примыкания под двери, свет, мебель и реальные размеры стены.',
    image: FALLBACK_IMAGE,
    cta: 'Обсудить панели',
    message: 'Здравствуйте! Хочу обсудить стеновые панели и рейки под интерьер.',
    cards: [
      ['Панели под двери', 'Оттенок, фактура и вертикали продолжают дверные полотна, а не спорят с ними.'],
      ['Декоративные рейки', 'Легкий ритм для прихожей, ТВ-зоны, кабинета или акцентной стены.'],
      ['Скрытые проходы', 'Помогаем сделать дверь менее заметной, если интерьеру нужна чистая плоскость.'],
      ['Монтажные узлы', 'Сразу думаем о стыках, плинтусах, доборах, розетках и примыканиях.'],
    ],
    specs: [
      'площадь стены и высота потолка',
      'желаемый ритм, цвет и фактура',
      'стыки с дверями, мебелью и плинтусом',
      'замер, доставка и монтаж',
    ],
  },
  partitions: {
    crumb: 'Алюминиевые перегородки',
    kicker: 'Легкая архитектура',
    title: 'Алюминиевые перегородки под интерьер',
    lead: 'Перегородка помогает разделить пространство без тяжелой стены: сохранить свет, выделить кабинет, гардеробную, кухню или приватную зону. Подберем профиль, стекло, открывание и монтажный узел.',
    image: CATEGORY_HEROES['Дизайн'] || FALLBACK_IMAGE,
    cta: 'Рассчитать перегородку',
    message: 'Здравствуйте! Хочу рассчитать алюминиевую перегородку под интерьер.',
    cards: [
      ['Зонирование без тяжести', 'Свет остается в помещении, а граница пространства становится аккуратной.'],
      ['Профиль и стекло', 'Подберем цвет профиля, прозрачность, рифление или матовое стекло под проект.'],
      ['Разные сценарии', 'Кухня-гостиная, кабинет, гардеробная, холл, спальня или коммерческое пространство.'],
      ['Замер и монтаж', 'Проверяем геометрию, крепления, пол, потолок и примыкания до заказа.'],
    ],
    specs: [
      'ширина и высота проема',
      'тип открывания и количество секций',
      'цвет профиля и вид стекла',
      'условия крепления и монтаж',
    ],
  },
};

function processItems(page) {
  return [
    'Вы присылаете фото, план или визуализацию',
    'Мы уточняем размеры и желаемый визуальный эффект',
    'Подбираем материалы и ориентир по стоимости',
    'Делаем замер и фиксируем технические детали',
    'Привозим и монтируем решение на объекте',
  ].map((text, i) => `
    <div>
      <span>${String(i + 1).padStart(2, '0')}</span>
      <p>${text}</p>
    </div>
  `).join('');
}

export function renderSolutions(main, type = 'panels') {
  const page = PAGES[type] || PAGES.panels;
  const lead = leadLink(page.message);

  main.innerHTML = `
    <section class="solution-page">
      <div class="solution-hero">
        <div class="solution-hero__copy">
          <nav class="catalog-breadcrumbs" aria-label="Хлебные крошки">
            <a href="#/">Главная</a><span>/</span><a href="#/catalog">Каталог</a><span>/</span><strong>${page.crumb}</strong>
          </nav>
          <span class="studio-kicker">${page.kicker}</span>
          <h1>${page.title}</h1>
          <p>${page.lead}</p>
          <div class="studio-hero__actions">
            <a class="studio-btn studio-btn--dark" href="${lead}" target="_blank" rel="noopener noreferrer">${page.cta}</a>
            <a class="studio-btn studio-btn--outline" href="#solution-form">Передать задачу ${ARR_SVG}</a>
          </div>
        </div>
        <div class="solution-hero__media">
          ${page.image ? `<img src="${assetPath(page.image)}" alt="${page.title}" loading="eager">` : ''}
        </div>
      </div>

      <section class="solution-cards" aria-label="Что подбираем">
        ${page.cards.map(([title, text], i) => `
          <article class="reveal">
            <span>${String(i + 1).padStart(2, '0')}</span>
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
        `).join('')}
      </section>

      <section class="solution-estimate reveal">
        <div>
          <span class="studio-kicker">Для расчета</span>
          <h2>Что важно учесть сразу</h2>
        </div>
        <div class="solution-estimate__list">
          ${page.specs.map(item => `<span>${item}</span>`).join('')}
        </div>
      </section>

      <section class="designer-process reveal">
        <span class="studio-kicker">Как работаем</span>
        <h2>От идеи до монтажа</h2>
        <div class="designer-process__rail">
          ${processItems(page)}
        </div>
      </section>

      <section class="studio-lead reveal" id="solution-form">
        <div class="studio-lead__copy">
          <span class="studio-kicker">Расчет</span>
          <h2>Пришлите интерьер или размеры</h2>
          <p>Можно начать с фото стены, проема или дизайн-проекта. Мы подскажем, какое решение будет выглядеть спокойно и сколько закладывать в бюджет.</p>
        </div>
        <form class="studio-form" data-lead-form>
          <label><span>Имя</span><input name="name" autocomplete="name" required></label>
          <label><span>Телефон</span><input name="phone" autocomplete="tel" inputmode="tel" required></label>
          <label><span>Задача</span><textarea name="task" rows="3" placeholder="Что нужно: панели, рейки, перегородка, размеры, сроки, стиль"></textarea></label>
          <button class="studio-btn studio-btn--dark" type="submit">Получить ориентир</button>
          <small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Точную стоимость фиксируем после замера.</small>
        </form>
      </section>
    </section>`;

  bindLeadForms(main);
}
