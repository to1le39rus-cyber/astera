import { appHref } from './routes.js';

const TELEGRAM = 'https://t.me/asteradoors';

const PROJECT_TYPES = [
  ['Квартира', 'межкомнатные двери, панели, входная дверь'],
  ['Дом', 'двери, входная группа, стены и перегородки'],
  ['Дизайн-проект', 'спецификация, образцы, узлы, партнерские условия'],
  ['Объект', 'повторяемые комплектации, сроки и монтаж'],
];

const NEEDS = [
  'Межкомнатные двери',
  'Входная дверь Astera',
  'Панели и рейки',
  'Алюминиевые перегородки',
  'Нужна консультация',
];

function checkedValues(form, name) {
  return [...form.querySelectorAll(`[name="${name}"]:checked`)].map(item => item.value);
}

function leadUrl(message) {
  return `${TELEGRAM}?text=${encodeURIComponent(message)}`;
}

export function renderProject(main) {
  main.innerHTML = `
    <section class="project-page">
      <div class="project-hero">
        <div>
          <nav class="catalog-breadcrumbs" aria-label="Хлебные крошки">
            <a href="${appHref('')}">Главная</a><span>/</span><strong>Расчет проекта</strong>
          </nav>
          <span class="studio-kicker">Первый расчет по проекту</span>
          <h1>Опишите проект — мы подготовим первый расчет.</h1>
          <p>Укажите тип объекта, количество проемов и нужные решения. Если точных данных пока нет, начнем с фото, плана или короткого описания.</p>
        </div>
        <aside class="project-hero__aside">
          <strong>Что подготовить</strong>
          <span>Фото интерьера или проема</span>
          <span>План квартиры или дома</span>
          <span>Количество дверей</span>
          <span>Желаемый срок</span>
        </aside>
      </div>

      <form class="project-brief" data-project-brief>
        <fieldset>
          <legend>Тип проекта</legend>
          <div class="project-options project-options--type">
            ${PROJECT_TYPES.map(([title, text], index) => `
              <label>
                <input type="radio" name="type" value="${title}" ${index === 0 ? 'checked' : ''}>
                <span>
                  <strong>${title}</strong>
                  <small>${text}</small>
                </span>
              </label>
            `).join('')}
          </div>
        </fieldset>

        <fieldset>
          <legend>Что нужно рассчитать</legend>
          <div class="project-options">
            ${NEEDS.map((need, index) => `
              <label>
                <input type="checkbox" name="needs" value="${need}" ${index === 0 ? 'checked' : ''}>
                <span><strong>${need}</strong></span>
              </label>
            `).join('')}
          </div>
        </fieldset>

        <div class="project-brief__grid">
          <label>
            <span>Количество проемов</span>
            <select name="openings">
              <option>1-2</option>
              <option selected>3-5</option>
              <option>6-10</option>
              <option>10+</option>
              <option>Пока не знаю</option>
            </select>
          </label>
          <label>
            <span>Стадия</span>
            <select name="stage">
              <option>Только выбираю стиль</option>
              <option selected>Идет ремонт</option>
              <option>Есть дизайн-проект</option>
              <option>Нужен быстрый расчет</option>
            </select>
          </label>
          <label>
            <span>Бюджет</span>
            <select name="budget">
              <option>Нужно предложить варианты</option>
              <option>Средний сегмент</option>
              <option selected>Премиальный сегмент</option>
              <option>Максимальная комплектация</option>
            </select>
          </label>
          <label>
            <span>Контакт</span>
            <input name="contact" autocomplete="tel" placeholder="Телефон или Telegram" required>
          </label>
        </div>

        <label class="project-brief__textarea">
          <span>Комментарий</span>
          <textarea name="comment" rows="4" placeholder="Например: квартира 86 м2, 5 дверей, нужен спокойный минимализм, есть фото проемов..."></textarea>
        </label>

        <div class="project-brief__footer">
          <button class="studio-btn studio-btn--dark" type="submit">Отправить в Telegram</button>
          <p>Откроется Telegram с готовым сообщением. К нему можно добавить фото, план или визуализацию.</p>
        </div>
      </form>
    </section>`;

  const form = main.querySelector('[data-project-brief]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const type = data.get('type') || 'Квартира';
    const needs = checkedValues(form, 'needs');
    const openings = data.get('openings') || 'Пока не знаю';
    const stage = data.get('stage') || 'Не указано';
    const budget = data.get('budget') || 'Не указано';
    const contact = data.get('contact') || '';
    const comment = data.get('comment') || '';

    const message = [
      'Здравствуйте! Хочу получить первый расчет Astera по проекту.',
      `Тип: ${type}.`,
      `Решения: ${needs.length ? needs.join(', ') : 'нужна консультация'}.`,
      `Количество проемов: ${openings}.`,
      `Стадия: ${stage}.`,
      `Бюджет: ${budget}.`,
      `Контакт: ${contact}.`,
      comment ? `Комментарий: ${comment}` : '',
    ].filter(Boolean).join('\n');

    window.open(leadUrl(message), '_blank', 'noopener,noreferrer');
  });
}
