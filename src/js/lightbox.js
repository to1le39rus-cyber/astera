import { assetPath } from './asset.js';

let _imgs = [], _idx = 0;

export function openLightbox(images, idx) {
  _imgs = images; _idx = idx;
  updateLB();
  document.getElementById('lightbox').hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').hidden = true;
  document.body.style.overflow = '';
}

function updateLB() {
  const lb = document.getElementById('lightbox');
  lb.querySelector('.lightbox__img').src = assetPath(_imgs[_idx]);
  lb.querySelector('.lightbox__counter').textContent = `${_idx + 1} / ${_imgs.length}`;
}

function prev() { _idx = (_idx - 1 + _imgs.length) % _imgs.length; updateLB(); }
function next() { _idx = (_idx + 1) % _imgs.length; updateLB(); }

export function initLightbox() {
  const lb = document.getElementById('lightbox');
  lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox__prev').addEventListener('click', prev);
  lb.querySelector('.lightbox__next').addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb || e.target === lb.querySelector('.lightbox__img-wrap')) closeLightbox(); });

  // Touch swipe
  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  }, { passive: true });

  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}
