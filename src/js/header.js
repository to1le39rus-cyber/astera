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
      <a class="header__phone" href="tel:+74012336555">+7 (4012) 33&#8209;65&#8209;55</a>
      <a class="header__cta" href="https://t.me/asteradoors" target="_blank" rel="noopener noreferrer"><span>Обсудить</span></a>
    </div>`;

  window.addEventListener('scroll', () => {
    el.classList.toggle('header--scrolled', window.scrollY > 60);
  }, { passive: true });
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
