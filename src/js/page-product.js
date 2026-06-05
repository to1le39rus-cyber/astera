import { BY_SLUG, fmt, parseSpecs, variantImgs, lifestyleImgs } from './data.js';
import { openLightbox } from './lightbox.js';
import { assetPath } from './asset.js';

export function renderProduct(main, slug) {
  const p = BY_SLUG[slug];
  if (!p) { main.innerHTML = `<div style="padding:120px 40px;text-align:center;font-family:var(--f-serif);font-size:28px;color:var(--c-muted);font-weight:300">Такой модели нет в каталоге. Вернитесь в каталог или напишите нам — подберем похожее решение.</div>`; return; }

  const life = lifestyleImgs(p);
  const vars = variantImgs(p);
  const doorGallery = vars.length ? vars : p.images;
  const price = p.priceFrom ? `от ${fmt(p.priceFrom)} ₽` : null;
  const specs = parseSpecs(p.description || '');
  const leadText = encodeURIComponent(`Здравствуйте! Хочу рассчитать модель ${p.name}. Пришлю размеры проема и фото интерьера.`);

  main.innerHTML = `
    <div class="prod-page">
      <nav class="breadcrumbs" aria-label="Хлебные крошки">
        <a href="#/">Главная</a><span class="breadcrumbs__sep">/</span>
        <a href="#/catalog">Каталог</a><span class="breadcrumbs__sep">/</span>
        <a href="#/catalog/${encodeURIComponent(p.category)}">${p.category}</a><span class="breadcrumbs__sep">/</span>
        <span aria-current="page">${p.name}</span>
      </nav>
      <div class="prod-layout">
        <div class="prod-gal">
          <div class="gal__main" id="gal-main" role="button" tabindex="0" aria-label="Открыть полноэкранный просмотр">
            <img id="gal-main-img" class="gal__main-img"
              src="${doorGallery[0] ? assetPath(doorGallery[0]) : ''}" alt="${p.name}" loading="eager">
          </div>
          <div class="gal__thumbs" id="gal-thumbs">
            ${doorGallery.map((img, i) => `
              <div class="gal__thumb${i===0?' is-active':''}" data-i="${i}"
                role="button" tabindex="0" aria-label="Фото двери ${i+1}">
                <img src="${assetPath(img)}" alt="${p.name} фото двери ${i+1}" loading="lazy">
              </div>`).join('')}
          </div>
        </div>
        <div class="prod-info">
          <p class="prod-info__cat">${p.category} · LORD</p>
          <h1 class="prod-info__name">${p.name}</h1>
          <p class="prod-info__lead">Подберем модель ${p.name} под ваш интерьер: уточним проем, высоту полотна, покрытие, короб, фурнитуру и монтаж. При необходимости дополним решение стеновыми панелями, рейками или перегородками.</p>
          <div class="prod-info__quick">
            <span>Подбор под интерьер</span>
            <span>Замер перед заказом</span>
            <span>Официальная поставка LORD</span>
          </div>
          ${price ? `
              <div style="margin-bottom:var(--sp-md)">
                <div class="prod-info__price">${price}</div>
                <p class="prod-info__underprice">Точная цена зависит от размера, отделки, фурнитуры и монтажа.</p>
              </div>` : ''}
          <div class="prod-fit">
            <div><strong>Подойдет для</strong><span>квартир, домов, таунхаусов и интерьеров по проекту</span></div>
            <div><strong>Для расчета уточним</strong><span>размер проема, открывание, короб, отделку, стекло, фурнитуру, панели и сроки</span></div>
          </div>
          <div class="prod-info__div"></div>
          <div class="specs" id="specs">
            ${specs.map((s,i) => `
              <div class="spec-group${i===0?' is-open':''}">
                <button class="spec-toggle" aria-expanded="${i===0}">
                  <span>${s.title}</span><span class="spec-icon">+</span>
                </button>
                <div class="spec-body-wrap"><div class="spec-body">${s.body}</div></div>
              </div>`).join('')}
          </div>
          <div class="prod-info__div"></div>
          <div class="prod-cta">
            <a href="https://t.me/asteradoors?text=${leadText}" target="_blank" rel="noopener noreferrer" class="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="position:relative;z-index:1"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
              <span>Рассчитать эту модель</span>
            </a>
            <p class="prod-cta__note">Пришлите размеры проема, фото интерьера или план — уточним комплектацию и стоимость.</p>
            <div class="prod-cta__links">
              <a href="tel:+74012336555">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>Телефон
              </a>
              <a href="https://t.me/asteradoors" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 3L3 9.5l7 2.5M21 3l-5 18-6-6M21 3l-11 9"/></svg>Telegram
              </a>
              <a href="https://vk.com/asteradoors" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7H19c-.2 0-.4.1-.5.3-.6 1.2-1.4 2.3-2.1 3.1-.3.3-.5.3-.5-.1V7.4c0-.3-.2-.5-.5-.5h-3c-.2 0-.4.2-.4.4s-.1 1.1.6 1.2c.4.1.7.4.7.8v2.3c0 .5-.2.4-.5.1C11.7 10.2 10.8 8.3 10.4 7.2 10.3 7 10.1 6.9 9.9 6.9H7.4c-.3 0-.5.2-.5.5 0 .1 1 5.7 5 8.5.2.1.4.2.6.2h2.4c.3 0 .5-.2.4-.5-.1-.8.2-1 .8-.5 1 .9 1.2 1 1.7 1 .2 0 .4-.1.5-.3l.8-1.9c.1-.2.1-.4-.1-.5-.5-.4-1.3-1.1-1.3-1.7 0-.2.1-.3.2-.3 1.3-.3 2.4-1.2 3.1-2.3.1-.2.1-.5-.1-.6z"/></svg>ВКонтакте
              </a>
            </div>
          </div>
        </div>
      </div>
      ${life.length ? `
        <section class="prod-interiors">
          <div class="prod-interiors__head">
            <h2 class="prod-interiors__title">${p.name} в интерьере</h2>
            <p class="prod-interiors__desc">Примеры помогают оценить пропорции, оттенок и сочетание с отделкой.</p>
          </div>
          <div class="prod-interiors__grid">
            ${life.map((img, i) => `
              <button class="prod-interior-card" data-life-i="${i}" aria-label="Открыть интерьерное фото ${i+1}">
                <img src="${assetPath(img)}" alt="${p.name} в интерьере ${i+1}" loading="lazy">
              </button>
            `).join('')}
          </div>
        </section>
      ` : ''}
    </div>`;

  // Gallery logic
  let curIdx = 0;
  const mainImg = main.querySelector('#gal-main-img');
  const thumbEls = main.querySelectorAll('.gal__thumb');

  function setImg(i) {
    curIdx = i;
    mainImg.src = assetPath(doorGallery[i]);
    mainImg.alt = `${p.name} — фото двери ${i+1}`;
    thumbEls.forEach((t,j) => t.classList.toggle('is-active', j===i));
    thumbEls[i]?.scrollIntoView({ block:'nearest', behavior:'smooth' });
  }

  thumbEls.forEach((t,i) => {
    t.addEventListener('click', () => setImg(i));
    t.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); setImg(i); }});
  });

  main.querySelector('#gal-main').addEventListener('click', () => openLightbox(doorGallery, curIdx));
  main.querySelector('#gal-main').addEventListener('keydown', e => { if(e.key==='Enter') openLightbox(doorGallery, curIdx); });

  main.querySelectorAll('.prod-interior-card').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(life, Number(btn.dataset.lifeI) || 0));
  });

  // Accordion
  main.querySelectorAll('.spec-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const grp = btn.closest('.spec-group');
      const open = grp.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
  });
}
