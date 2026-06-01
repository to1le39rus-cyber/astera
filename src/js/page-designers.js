import { bindLeadForms, leadLink } from './page-home.js';

const ARR_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const SUPPORT = [
  ['20%', 'партнерское вознаграждение'],
  ['24-48 ч', 'ответ по спецификации'],
  ['1 окно', 'двери, панели, вход'],
  ['конфиденциально', 'условия только в диалоге'],
];

const NEEDS = [
  {
    title: 'Сохранить замысел',
    text: 'Модель, отделка, высота и фурнитура в логике проекта.',
  },
  {
    title: 'Закрыть узлы',
    text: 'Проемы, короба, панели, перегородки и монтаж до заказа.',
  },
  {
    title: 'Снять операционные задачи',
    text: 'Замер, поставка, монтаж и сервис на стороне Astera.',
  },
  {
    title: 'Зафиксировать условия',
    text: 'Проект закрепляется за дизайнером. Вознаграждение — 20%.',
  },
];

const PROCESS = [
  'План или визуализация',
  'Подбор решений',
  'Спецификация',
  'Замер',
  'Монтаж и сервис',
];

export function renderDesigners(main) {
  main.innerHTML = `
    <section class="designer-page">
      <div class="designer-hero">
        <div class="designer-hero__copy">
          <span class="studio-kicker">Для дизайнеров</span>
          <h1>Дизайнерам и архитекторам</h1>
          <p>Двери LORD, стеновые панели, перегородки и входные группы для проектов без визуального шума. Подготовим спецификацию, поможем с узлами, организуем замер, поставку и монтаж.</p>
          <div class="studio-hero__actions">
            <a class="studio-btn studio-btn--light" href="${leadLink('Здравствуйте! Я дизайнер, хочу получить партнерские условия Astera.')}" target="_blank" rel="noopener noreferrer">Получить партнерские условия</a>
            <a class="studio-btn studio-btn--ghost" href="#designer-form">Передать проект ${ARR_SVG}</a>
          </div>
        </div>
        <div class="designer-hero__panel">
          ${SUPPORT.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}
        </div>
      </div>

      <section class="designer-needs">
        <div class="studio-section-head reveal">
          <span class="studio-kicker">Чем помогаем</span>
          <h2>Сохраняем авторский замысел</h2>
          <p>Astera берет на себя техническую часть, поставку, монтаж и сервис.</p>
        </div>
        <div class="designer-needs__grid">
          ${NEEDS.map((item, i) => `
            <article class="reveal">
              <span>${String(i + 1).padStart(2, '0')}</span>
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="designer-kit reveal">
        <div>
          <span class="studio-kicker">В проект</span>
          <h2>Что можно заложить в проект</h2>
        </div>
        <div class="designer-kit__list">
          <span>межкомнатные двери разных стилистик</span>
          <span>высокие полотна и скрытые короба</span>
          <span>алюминиевые перегородки</span>
          <span>стеновые панели и декоративные рейки</span>
          <span>плинтусы, стекло, фурнитура, доборы</span>
          <span>входные двери Astera под фасад и холл</span>
        </div>
      </section>

      <section class="designer-process reveal">
        <span class="studio-kicker">Процесс</span>
        <h2>Как проходит работа</h2>
        <div class="designer-process__rail">
          ${PROCESS.map((item, i) => `
            <div>
              <span>${String(i + 1).padStart(2, '0')}</span>
              <p>${item}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="studio-lead reveal" id="designer-form">
        <div class="studio-lead__copy">
          <span class="studio-kicker">Расчет</span>
          <h2>Передайте проект в работу</h2>
          <p>План, визуализация или список проемов. Ответим по составу и условиям.</p>
        </div>
        <form class="studio-form" data-lead-form>
          <label><span>Имя / студия</span><input name="name" autocomplete="organization" required></label>
          <label><span>Телефон</span><input name="phone" autocomplete="tel" inputmode="tel" required></label>
          <label><span>Проект</span><textarea name="task" rows="3" placeholder="Объект, количество проемов, нужные решения, сроки"></textarea></label>
          <button class="studio-btn studio-btn--dark" type="submit">Отправить проект</button>
          <small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Партнерские условия обсуждаем лично.</small>
        </form>
      </section>
    </section>`;

  bindLeadForms(main);
}
