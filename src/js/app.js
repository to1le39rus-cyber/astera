import './catalog-data.js';
import '../css/style.css';
import { renderHeader, renderFooter, setHeroHeader, setActiveNav } from './header.js';
import { initLightbox } from './lightbox.js';
import { renderHome } from './page-home.js';
import { renderCatalog } from './page-catalog.js';
import { renderProduct } from './page-product.js';
import { renderContacts } from './page-contacts.js';
import { renderDesigners } from './page-designers.js';

const app  = document.getElementById('app');
const main = document.getElementById('main-content');
const HOME_SECTIONS = new Set(['solutions', 'promos', 'lead']);

// Init shell
renderHeader();
renderFooter();
initLightbox();

// Reveal observer — handles both .reveal and .reveal-stagger
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function observeReveal() {
  document.querySelectorAll('.reveal:not(.is-visible), .reveal-stagger:not(.is-visible)')
    .forEach(el => revealIO.observe(el));
}

// Router
function route() {
  const raw = location.hash.replace(/^#\/?/, '');
  const parts = raw.split('/');
  const page = parts[0] || '';
  const sub  = parts[1] ? decodeURIComponent(parts[1]) : '';
  const homeSection = HOME_SECTIONS.has(page) ? page : '';

  window.scrollTo({ top: 0, behavior: 'instant' });

  if (!page || homeSection) {
    renderHome(main);
    setHeroHeader(!homeSection);
    setActiveNav(homeSection || '');
    if (homeSection) {
      requestAnimationFrame(() => {
        document.getElementById(homeSection)?.scrollIntoView({ behavior: 'instant', block: 'start' });
        document.getElementById('site-header')
          ?.classList.toggle('header--scrolled', window.scrollY > 60);
      });
    }
  } else if (page === 'catalog') {
    renderCatalog(main, sub || '');
    setHeroHeader(false);
    setActiveNav('catalog');
  } else if (page === 'designers') {
    renderDesigners(main);
    setHeroHeader(false);
    setActiveNav('designers');
  } else if (page === 'product') {
    renderProduct(main, sub);
    setHeroHeader(false);
    setActiveNav('catalog');
  } else if (page === 'contacts') {
    renderContacts(main);
    setHeroHeader(false);
    setActiveNav('contacts');
  } else {
    renderHome(main);
    setHeroHeader(true);
    setActiveNav('');
  }

  // Restore header scroll state
  document.getElementById('site-header')
    ?.classList.toggle('header--scrolled', window.scrollY > 60);

  requestAnimationFrame(observeReveal);
}

window.addEventListener('hashchange', route);
route();

function initCookieConsent() {
  if (localStorage.getItem('astera_cookie_ok') === '1') return;
  const showBanner = () => {
    if (document.querySelector('.cookie-note')) return;
    const banner = document.createElement('div');
    banner.className = 'cookie-note';
    banner.innerHTML = `
      <p>Мы используем cookie для работы сайта и аналитики. Продолжая пользоваться сайтом, вы соглашаетесь с политикой конфиденциальности.</p>
      <button type="button">Понятно</button>`;
    banner.querySelector('button').addEventListener('click', () => {
      localStorage.setItem('astera_cookie_ok', '1');
      banner.remove();
    });
    document.body.appendChild(banner);
  };

  if (window.matchMedia('(max-width: 768px)').matches) {
    const onFirstScroll = () => {
      if (window.scrollY < 90) return;
      window.removeEventListener('scroll', onFirstScroll);
      showBanner();
    };
    window.addEventListener('scroll', onFirstScroll, { passive: true });
    return;
  }

  showBanner();
}

initCookieConsent();

function showAppWhenStable() {
  const ls = document.getElementById('loading-screen');
  if (ls) {
    ls.classList.add('fade-out');
    setTimeout(() => ls.remove(), 600);
  }
  app.classList.add('is-ready');
}

setTimeout(() => {
  showAppWhenStable();
}, 650);
