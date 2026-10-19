const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const visitorCount = document.getElementById('visitor-count');
const visitorCacheKey = 'annasarbiewska-visitor-count';
const cachedVisitorCount = localStorage.getItem(visitorCacheKey);

if (visitorCount && cachedVisitorCount && /^\d+$/.test(cachedVisitorCount)) {
  visitorCount.textContent = new Intl.NumberFormat('pl-PL').format(Number(cachedVisitorCount));
}

window.counterApiCallback = function (response) {
  if (!visitorCount) return;
  const value = Number(response && response.value);
  if (Number.isFinite(value) && value >= 0) {
    const count = Math.floor(value);
    localStorage.setItem(visitorCacheKey, String(count));
    visitorCount.textContent = new Intl.NumberFormat('pl-PL').format(count);
  }
};

window.visitorCounterError = function () {
  if (visitorCount && !cachedVisitorCount) {
    visitorCount.textContent = '—';
  }
};
