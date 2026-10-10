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
if (visitorCount) {
  const site = 'annasarbiewska.com';
  const path = '/';
  const base = 'https://page-views-api.ratneshc.com/api/v1';

  fetch(`${base}/track?site=${encodeURIComponent(site)}&path=${encodeURIComponent(path)}`, { keepalive: true })
    .catch(() => null)
    .finally(() => {
      fetch(`${base}/views?site=${encodeURIComponent(site)}&path=${encodeURIComponent(path)}`)
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
          visitorCount.textContent = new Intl.NumberFormat('pl-PL').format(data.views ?? 0);
        })
        .catch(() => {
          visitorCount.closest('.visitor-counter')?.setAttribute('hidden', '');
        });
    });
}
