import { CATALOG } from './data.js';
import { assetPath } from './asset.js';

export function renderHeader(id = 'site-header') {
  const el = document.getElementById(id);
  el.className = 'header';
  el.innerHTML = `
    <a href="#/" class="header__logo" aria-label="ASTERA — главная">
      <img class="header__logo-img" src="${assetPath('branding/logo-astera-hor-dark.jpg')}" alt="Astera интерьерные решения" loading="eager" width="220" height="40">
      <img class="header__logo-img header__logo-img--hero" src="${assetPath('branding/logo-astera-hor-monochrome.png')}" alt="Astera интерьерные решения" loading="eager" width="220" height="40">
    </a>
    <nav class="header__nav" aria-label="Основная навигация">
      <a href="#/catalog" data-nav-link="catalog">Двери</a>
      <a href="#/solutions" data-nav-link="solutions">Панели и рейки</a>
      <a href="#/lead" data-nav-link="lead">Входные Astera</a>
      <a href="#/designers" data-nav-link="designers">Дизайнерам</a>
      <a href="#/contacts" data-nav-link="contacts">Контакты</a>
    </nav>
    <div class="header__right">
      <div class="header__contact" data-contact-menu>
        <a class="header__phone" href="tel:+74012336555">+7 (4012) 33&#8209;65&#8209;55</a>
        <button class="header__phone-trigger" type="button" aria-label="Открыть контакты" aria-expanded="false" data-contact-trigger>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </button>
        <div class="header-contact-menu" data-contact-panel>
          <a href="tel:+74012336555">
            <span>Позвонить</span>
            <strong>+7 (4012) 33-65-55</strong>
          </a>
          <a href="https://t.me/asteradoors" target="_blank" rel="noopener noreferrer">
            <span>Написать нам</span>
            <strong>Telegram</strong>
          </a>
        </div>
      </div>
      <a class="header__cta" href="https://t.me/asteradoors" target="_blank" rel="noopener noreferrer"><span>Обсудить</span></a>
    </div>`;

  const contact = el.querySelector('[data-contact-menu]');
  const trigger = el.querySelector('[data-contact-trigger]');
  trigger?.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = !contact.classList.contains('is-open');
    contact.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    if (!contact?.contains(event.target)) {
      contact?.classList.remove('is-open');
      trigger?.setAttribute('aria-expanded', 'false');
    }
  });

  const syncScroll = () => {
    const isScrolled = window.scrollY > 60;
    el.classList.toggle('header--scrolled', isScrolled);
    document.getElementById('mobile-nav')?.classList.toggle('is-visible', window.scrollY > 90);
  };
  window.addEventListener('scroll', syncScroll, { passive: true });
  syncScroll();
}

export function setHeroHeader(on) {
  const el = document.getElementById('site-header');
  el?.classList.toggle('header--on-hero', on);
}

export function setActiveNav(page) {
  document.querySelectorAll('.header__nav a').forEach(a => {
    const nav = a.dataset.navLink || '';
    a.classList.toggle('is-active', nav === page);
  });
  document.querySelectorAll('.mobile-nav__item').forEach(el => {
    const nav = el.dataset.nav;
    const isContacts = page === 'contacts' && nav === 'estimate';
    el.classList.toggle('is-active', nav === (page || 'home') || isContacts);
  });
}

export function renderFooter(id = 'site-footer') {
  document.getElementById(id).innerHTML = `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__top">
          <div>
            <img class="footer__logo" src="${assetPath('branding/logo-astera-hor-monochrome.png')}" alt="Astera" width="220" height="40" loading="lazy">
            <p class="footer__about">Astera — двери, панели, рейки и входные группы для спокойных интерьеров. Калининград, Горького, 98.</p>
          </div>
          <div>
            <div class="footer__col-title">Двери</div>
            <div class="footer__links">
              ${CATALOG.map(c=>`<a href="#/catalog/${encodeURIComponent(c.name)}">${c.name}</a>`).join('')}
            </div>
          </div>
          <div>
            <div class="footer__col-title">Проект</div>
            <div class="footer__links">
              <a href="#/solutions">Панели и рейки</a>
              <a href="#/designers">Дизайнерам</a>
              <a href="#/promos">Акции</a>
              <a href="#/contacts">Контакты</a>
            </div>
          </div>
          <div>
            <div class="footer__col-title">Контакты</div>
            <div class="footer__links">
              <a href="tel:+74012336555">+7 (4012) 33-65-55</a>
              <a href="tel:+79637386555">+7 (963) 738-65-55</a>
              <a href="https://t.me/asteradoors" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="https://vk.com/asteradoors" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
              <span>Калининград, ул. Горького, 98, 2 этаж</span>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span class="footer__copy">&copy; ${new Date().getFullYear()} ASTERA</span>
          <span class="footer__partner">Информация на сайте носит справочный характер и не является публичной офертой. Цвета могут отличаться от образцов в салоне.</span>
        </div>
      </div>
    </footer>`;
}
