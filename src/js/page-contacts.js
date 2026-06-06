const CHECKLIST = [
  'Фото проема или стены',
  'План или визуализация',
  'Что нужно: двери, панели, входная',
  'Желаемый срок',
];

export function renderContacts(main) {
  main.innerHTML = `
    <div class="contacts-page contacts-page--premium">
      <section class="contacts-hero">
        <div>
          <span class="contacts-page__eyebrow">Салон в Калининграде</span>
          <h1 class="contacts-page__title">Салон Astera в Калининграде</h1>
          <p class="contacts-page__lead">Напишите или приезжайте в салон. Спокойно посмотрим ваш интерьер, проемы и задачи, подберем решения и дадим понятный ориентир по стоимости.</p>
          <div class="contacts-hero__actions">
            <a href="https://t.me/asteradoors" target="_blank" rel="noopener noreferrer" class="btn-primary"><span>Написать в Telegram</span></a>
            <a href="tel:+74012336555" class="btn-outline"><span>Позвонить</span></a>
          </div>
        </div>
        <aside class="contacts-panel">
          <strong>Для быстрого расчета</strong>
          ${CHECKLIST.map(item => `<span>${item}</span>`).join('')}
        </aside>
      </section>

      <div class="contacts-grid">
        <div class="contacts-stack">
          <div class="ci reveal">
            <div class="ci__label">Адрес салона</div>
            <div class="ci__val">
              г. Калининград<br>ул. Горького, 98 (2 этаж)
              <small>Пн-Сб 10:00-19:00</small>
            </div>
          </div>
          <div class="ci reveal">
            <div class="ci__label">Телефоны</div>
            <div class="ci__val">
              <a href="tel:+74012336555">+7 (4012) 33-65-55</a><br>
              <a href="tel:+79637386555">+7 (963) 738-65-55</a>
            </div>
          </div>
          <div class="contacts-promise reveal">
            <strong>Что сделаем</strong>
            <span>подберем под интерьер</span>
            <span>дадим ориентир по стоимости</span>
            <span>соберем комплектацию</span>
            <span>пригласим в салон или на замер</span>
          </div>
        </div>
        <div class="contacts-map reveal">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=20.510522%2C54.713500&z=16&pt=20.509060,54.712700,pm2rdm"
            title="ASTERA на карте"
            loading="lazy"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>`;
}
