const DEPLOY_BASE = '/astera';

const trimRoute = (route = '') => String(route)
  .replace(/^#\/?/, '')
  .replace(/^\/+|\/+$/g, '');

function basePath() {
  const baseHref = document.querySelector('base')?.getAttribute('href') || '';
  if (baseHref.includes(`${DEPLOY_BASE}/`)) return DEPLOY_BASE;
  if (location.pathname === DEPLOY_BASE || location.pathname.startsWith(`${DEPLOY_BASE}/`)) return DEPLOY_BASE;
  return '';
}

export function appHref(route = '') {
  const clean = trimRoute(route);
  const base = basePath();
  return clean ? `${base}/${clean}` : `${base || ''}/`;
}

export function categoryHref(name = '') {
  return appHref('catalog/doors');
}

export function productHref(slug = '') {
  return appHref(`product/${encodeURIComponent(slug)}`);
}

export function routeFromUrl(input = location.href) {
  const url = new URL(input, location.origin);
  const hashRoute = url.hash.replace(/^#\/?/, '').replace(/\/+$/g, '');
  if (hashRoute) return hashRoute;

  let path = url.pathname.replace(/\/index\.html$/i, '/');
  if (path === DEPLOY_BASE || path === `${DEPLOY_BASE}/`) return '';
  if (path.startsWith(`${DEPLOY_BASE}/`)) path = path.slice(DEPLOY_BASE.length + 1);
  else path = path.replace(/^\/+/, '');

  const clean = path.replace(/\/+$/g, '');
  return clean === DEPLOY_BASE.replace('/', '') ? '' : clean;
}

export function navigateTo(route = '') {
  const href = appHref(route);
  history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
