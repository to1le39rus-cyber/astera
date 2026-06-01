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
const META = {
  home: {
    title: 'Astera — премиальные двери и интерьерные решения в Калининграде',
    description: 'Astera — салон премиальных интерьерных решений в Калининграде: межкомнатные двери LORD, входные двери, перегородки, стеновые панели и рейки под проект.',
  },
  catalog: {
    title: 'Каталог дверей и интерьерных решений Astera в Калининграде',
    description: 'Каталог Astera: межкомнатные двери LORD, входные двери, стеновые панели, рейки и алюминиевые перегородки для квартир, домов и дизайн-проектов.',
  },
  doors: {
    title: 'Межкомнатные двери LORD в Калининграде | Astera',
    description: 'Коллекции межкомнатных дверей LORD для классических, современных и минималистичных интерьеров. Подбор модели, покрытия, короба и фурнитуры.',
  },
  designers: {
    title: 'Дизайнерам и архитекторам — партнерские условия Astera',
    description: 'Astera работает с дизайнерами и архитекторами в Калининграде: двери LORD, панели, перегородки, входные группы, спецификации, замер и монтаж.',
  },
  contacts: {
    title: 'Контакты Astera — салон дверей в Калининграде',
    description: 'Салон Astera в Калининграде: ул. Горького, 98. Подбор межкомнатных дверей, входных дверей, панелей, реек и перегородок под интерьер.',
  },
};

// Init shell
renderHeader();
renderFooter();
initLightbox();

function setMeta(meta = META.home) {
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
}

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

function initScrollTop() {
  const button = document.getElementById('scroll-top');
  if (!button) return;

  const sync = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    button.classList.toggle('is-visible', isMobile && window.scrollY > 560);
  };

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  sync();
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
    setMeta(META.home);
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
    setMeta(sub ? META.doors : META.catalog);
    renderCatalog(main, sub || '');
    setHeroHeader(false);
    setActiveNav('catalog');
  } else if (page === 'designers') {
    setMeta(META.designers);
    renderDesigners(main);
    setHeroHeader(false);
    setActiveNav('designers');
  } else if (page === 'product') {
    setMeta(META.doors);
    renderProduct(main, sub);
    setHeroHeader(false);
    setActiveNav('catalog');
  } else if (page === 'contacts') {
    setMeta(META.contacts);
    renderContacts(main);
    setHeroHeader(false);
    setActiveNav('contacts');
  } else {
    setMeta(META.home);
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
      <p>Используем cookie, чтобы сайт работал корректно и помогал нам улучшать сервис.</p>
      <button type="button">Хорошо</button>`;
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
initScrollTop();

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
