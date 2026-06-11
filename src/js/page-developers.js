import { bindLeadForms, leadLink } from './page-home.js';
import { appHref } from './routes.js';

const ARR_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const DEVELOPERS_FACTS = [
  ['1 спецификация', 'двери, панели, перегородки и входные группы'],
  ['поэтапно', 'расчет, поставка и монтаж под график объекта'],
  ['образцы', 'согласование отделок в салоне Astera'],
  ['сервис', 'замер, контроль комплектации и монтажные детали'],
];

const DEVELOPERS_PACKAGES = [
  {
    title: 'Квартиры и апартаменты',
    text: 'Подберем межкомнатные двери и фурнитуру под класс отделки, сроки поставки и повторяемые планировки.',
  },
  {
    title: 'Частные дома',
    text: 'Соберем двери, входную группу, панели, рейки и перегородки в единой логике с фасадом и интерьером.',
  },
  {
    title: 'Небольшие ЖК и клубные дома',
    text: 'Подготовим спецификацию по типовым проемам, вариантам отделки и очередности монтажа.',
  },
];

const DEVELOPERS_STEPS = [
  'Получаем планировки, ведомость проемов или техническое задание',
  'Предлагаем 2-3 уровня комплектации под бюджет и класс объекта',
  'Согласуем образцы, сроки, фурнитуру и монтажные требования',
  'Фиксируем спецификацию и ведем поставку по этапам',
  'Передаем монтажникам понятные данные по проемам и узлам',
];

export function renderDevelopers(main) {
  main.innerHTML = `
    <section class="developer-page">
      <div class="developer-hero">
        <div class="developer-hero__copy">
          <nav class="catalog-breadcrumbs" aria-label="Хлебные крошки">
            <a href="${appHref('')}">Главная</a><span>/</span><strong>Застройщикам</strong>
          </nav>
          <span class="studio-kicker">Для объектов</span>
          <h1>Комплектация дверей для домов, квартир и проектов</h1>
          <p>Astera помогает застройщикам, управляющим проектами и частным заказчикам собрать двери, панели, перегородки и входные группы в понятную спецификацию. Считаем не одну позицию, а весь набор под объект, сроки и монтаж.</p>
          <div class="studio-hero__actions">
            <a class="studio-btn studio-btn--light" href="${leadLink('Здравствуйте! Хочу обсудить комплектацию объекта с Astera: двери, панели, перегородки и входные группы.')}" target="_blank" rel="noopener noreferrer">Передать объект на расчет</a>
            <a class="studio-btn studio-btn--outline" href="${appHref('catalog/doors')}">Смотреть двери ${ARR_SVG}</a>
          </div>
        </div>
        <div class="developer-hero__panel">
          ${DEVELOPERS_FACTS.map(([value, label]) => `
            <div>
              <strong>${value}</strong>
              <span>${label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <section class="developer-packages reveal">
        <div>
          <span class="studio-kicker">Форматы работы</span>
          <h2>Подбираем комплектацию под класс объекта</h2>
        </div>
        <div class="developer-packages__grid">
          ${DEVELOPERS_PACKAGES.map((item, index) => `
            <article>
              <span>${String(index + 1).padStart(2, '0')}</span>
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="developer-process reveal">
        <div>
          <span class="studio-kicker">Как считаем</span>
          <h2>От ведомости проемов до поставки</h2>
          <p>Для объекта важны не только красивые двери, но и предсказуемость: что заказываем, когда приезжает, кто отвечает за детали и как решение выглядит после монтажа.</p>
        </div>
        <ol>
          ${DEVELOPERS_STEPS.map((step, index) => `
            <li><span>${String(index + 1).padStart(2, '0')}</span>${step}</li>
          `).join('')}
        </ol>
      </section>

      <section class="developer-lead reveal">
        <div>
          <span class="studio-kicker">Расчет объекта</span>
          <h2>Можно начать с планировок или списка проемов</h2>
          <p>Пришлите план, ведомость или фото. Мы подготовим первый ориентир по дверям, входным группам и интерьерным решениям, которые подходят под ваш уровень отделки.</p>
        </div>
        <form class="studio-form" data-lead-form>
          <label><span>Имя</span><input name="name" autocomplete="name" required></label>
          <label><span>Телефон</span><input name="phone" autocomplete="tel" inputmode="tel" required></label>
          <label><span>Что нужно укомплектовать?</span><textarea name="task" rows="3" placeholder="Например: 12 квартир, частный дом, апартаменты, ведомость проемов..."></textarea></label>
          <button class="studio-btn studio-btn--dark" type="submit">Получить расчет</button>
          <small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</small>
        </form>
      </section>
    </section>
  `;

  bindLeadForms(main);
}
