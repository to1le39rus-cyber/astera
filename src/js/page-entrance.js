import { bindLeadForms, leadLink } from './page-home.js';
import { assetPath } from './asset.js';

const ARR_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const ENTRANCE_FEATURES = [
  ['Размер под проем', 'Проектируем дверь под существующий или новый проем, фасад, холл и внутреннюю отделку.'],
  ['Тепло и тишина', 'Подбираем конструкцию, уплотнение, контур и отделку под квартиру, дом или таунхаус.'],
  ['Отделка под интерьер', 'Внутренняя сторона может поддерживать двери, панели, мебель и общий стиль пространства.'],
  ['Монтаж без случайностей', 'До заказа уточняем узлы примыкания, доборы, откосы, фурнитуру и сроки.'],
];

const ENTRANCE_STEPS = [
  'Вы присылаете фото проема, фасада или холла',
  'Мы уточняем размеры, задачи по теплу, тишине и отделке',
  'Готовим ориентир по комплектации и стоимости',
  'Делаем замер и фиксируем техническое решение',
  'Изготавливаем, доставляем и устанавливаем дверь',
];

export function renderEntrance(main) {
  main.innerHTML = `
    <section class="entrance-page">
      <div class="entrance-hero">
        <div class="entrance-hero__copy">
          <nav class="catalog-breadcrumbs" aria-label="Хлебные крошки">
            <a href="#/">Главная</a><span>/</span><a href="#/catalog">Каталог</a><span>/</span><strong>Входные двери Astera</strong>
          </nav>
          <span class="studio-kicker">Флагман Astera</span>
          <h1>Входные двери Astera на заказ</h1>
          <p>Дверь, которая встречает дом первой: точный размер, спокойная геометрия, отделка под фасад и интерьер, профессиональный монтаж в Калининграде.</p>
          <div class="studio-hero__actions">
            <a class="studio-btn studio-btn--dark" href="${leadLink('Здравствуйте! Хочу рассчитать входную дверь Astera под мой проем.')}" target="_blank" rel="noopener noreferrer">Рассчитать дверь</a>
            <a class="studio-btn studio-btn--outline" href="#entrance-form">Передать размеры ${ARR_SVG}</a>
          </div>
        </div>
        <div class="entrance-hero__media">
          <img src="${assetPath('images/astera-entrance-door-burkovsky-inspired.png')}" alt="Входная дверь Astera на заказ" loading="eager">
        </div>
      </div>

      <section class="entrance-precision reveal">
        <div>
          <span class="studio-kicker">Почему отдельно</span>
          <h2>Входная дверь — это не просто покупка</h2>
        </div>
        <p>Она должна совпасть с архитектурой дома, интерьером прихожей, режимом эксплуатации и монтажным узлом. Поэтому мы не продаем “коробку со склада”, а собираем решение под ваш проем и задачу.</p>
      </section>

      <section class="entrance-features">
        ${ENTRANCE_FEATURES.map(([title, text], i) => `
          <article class="reveal">
            <span>${String(i + 1).padStart(2, '0')}</span>
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
        `).join('')}
      </section>

      <section class="designer-process reveal">
        <span class="studio-kicker">Как работаем</span>
        <h2>От идеи до установки</h2>
        <div class="designer-process__rail">
          ${ENTRANCE_STEPS.map((item, i) => `
            <div>
              <span>${String(i + 1).padStart(2, '0')}</span>
              <p>${item}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="studio-lead reveal" id="entrance-form">
        <div class="studio-lead__copy">
          <span class="studio-kicker">Расчет</span>
          <h2>Пришлите проем или фасад</h2>
          <p>Можно начать с фото, размера или проекта. Мы подскажем, какая конструкция и отделка будут смотреться уместно и служить спокойно.</p>
        </div>
        <form class="studio-form" data-lead-form>
          <label><span>Имя</span><input name="name" autocomplete="name" required></label>
          <label><span>Телефон</span><input name="phone" autocomplete="tel" inputmode="tel" required></label>
          <label><span>Что нужно учесть?</span><textarea name="task" rows="3" placeholder="Дом или квартира, размер проема, фасад, внутренняя отделка, сроки"></textarea></label>
          <button class="studio-btn studio-btn--dark" type="submit">Получить расчет</button>
          <small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Расчет уточняется после замера.</small>
        </form>
      </section>
    </section>`;

  bindLeadForms(main);
}
