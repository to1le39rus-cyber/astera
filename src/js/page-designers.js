import { bindLeadForms, leadLink } from './page-home.js';

const ARR_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const SUPPORT = [
  ['до 20%', 'партнерские условия'],
  ['24-48 ч', 'первый ориентир по расчету'],
  ['1 салон', 'двери, панели, перегородки, вход'],
  ['объект', 'комплектация квартир, домов и ЖК'],
];

const NEEDS = [
  {
    title: 'Сохранить замысел',
    text: 'Подбираем модель, отделку, высоту и фурнитуру так, чтобы решение не выбивалось из визуализации.',
  },
  {
    title: 'Продумать детали',
    text: 'Проемы, короба, панели, перегородки и монтажные узлы согласуем до заказа.',
  },
  {
    title: 'Снять координацию',
    text: 'Замер, поставка, монтаж и сервис остаются на стороне Astera.',
  },
  {
    title: 'Зафиксировать условия',
    text: 'Проект закрепляется за дизайнером. Партнерское вознаграждение — до 20%.',
  },
];

const PROJECT_PAIN = [
  ['Двери выбиваются из визуализации', 'Подбираем стиль, высоту, покрытие и фурнитуру до заказа, чтобы решение не спорило с проектом.'],
  ['Сложные узлы остаются на дизайнере', 'Помогаем с коробами, скрытыми решениями, панелями, перегородками, доборами и примыканиями.'],
  ['Клиент теряется между подрядчиками', 'Astera берет на себя замер, расчет, поставку, монтаж и сервис по дверному блоку.'],
];

const DELIVERABLES = [
  'подбор моделей и отделок под визуализацию',
  'ориентир по бюджету и комплектации',
  'спецификация по проемам и зонам',
  'поддержка по узлам: скрытый короб, панели, перегородки',
  'закрепление проекта и партнерские условия',
];

const OBJECT_TYPES = [
  'квартиры и апартаменты',
  'частные дома',
  'коммерческие интерьеры',
  'комплектация объектов и ЖК',
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
          <span class="studio-kicker">Для дизайнеров и объектов</span>
          <h1>Двери и интерьерные узлы без потери авторской идеи</h1>
          <p>Astera помогает дизайнеру закрыть межкомнатные двери, панели, рейки, перегородки и входные группы одной спецификацией. Для партнеров действуют условия до 20% — обсуждаем лично, проект закрепляем за автором.</p>
          <div class="studio-hero__actions">
            <a class="studio-btn studio-btn--light" href="${leadLink('Здравствуйте! Я дизайнер/архитектор, хочу получить партнерские условия Astera.')}" target="_blank" rel="noopener noreferrer">Получить условия</a>
            <a class="studio-btn studio-btn--ghost" href="#designer-form">Передать проект ${ARR_SVG}</a>
          </div>
        </div>
        <div class="designer-hero__panel">
          ${SUPPORT.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}
        </div>
      </div>

      <section class="designer-pain reveal">
        <div>
          <span class="studio-kicker">Зачем дизайнеру Astera</span>
          <h2>Мы закрываем то, что обычно съедает время на объекте</h2>
        </div>
        <div class="designer-pain__grid">
          ${PROJECT_PAIN.map(([title, text], index) => `
            <article>
              <span>${String(index + 1).padStart(2, '0')}</span>
              <strong>${title}</strong>
              <p>${text}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="designer-needs">
        <div class="studio-section-head reveal">
          <span class="studio-kicker">Чем помогаем</span>
          <h2>Берем сложные узлы на себя</h2>
          <p>Дизайнер сохраняет замысел и получает понятную спецификацию. Застройщик или клиент получает салон, который отвечает за подбор, расчет, поставку, монтаж и сервис.</p>
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

      <section class="designer-delivery reveal">
        <div>
          <span class="studio-kicker">Что получает проект</span>
          <h2>Не просто подбор, а рабочий пакет для согласования</h2>
          <p>Чтобы дизайнеру было проще защитить решение перед клиентом и строителями, мы собираем понятный набор материалов по дверному блоку.</p>
        </div>
        <ul>
          ${DELIVERABLES.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </section>

      <section class="designer-kit reveal">
        <div>
          <span class="studio-kicker">В проект</span>
          <h2>Что можно заложить в спецификацию</h2>
        </div>
        <div class="designer-kit__list">
          <span>межкомнатные двери LORD разных стилистик</span>
          <span>высокие полотна и скрытые короба</span>
          <span>алюминиевые перегородки</span>
          <span>стеновые панели и декоративные рейки</span>
          <span>плинтусы, стекло, фурнитура, доборы</span>
          <span>входные двери Astera под фасад и холл</span>
        </div>
      </section>

      <section class="designer-objects reveal">
        <span class="studio-kicker">С кем работаем</span>
        <div>
          ${OBJECT_TYPES.map(item => `<span>${item}</span>`).join('')}
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
          <h2>Передайте проект на расчет</h2>
          <p>Пришлите план, визуализацию или список проемов. Вернем аккуратный подбор, ориентир по стоимости и условия сотрудничества.</p>
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
