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
  const viewsUrl = 'https://page-views-api.ratneshc.com/api/v1/views?site=annasarbiewska.com&path=%2F';

  const loadVisitorCount = () => {
    fetch(viewsUrl)
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => {
        visitorCount.textContent = new Intl.NumberFormat('pl-PL').format(data.views ?? 0);
      })
      .catch(() => {
        visitorCount.textContent = '—';
      });
  };

  window.setTimeout(loadVisitorCount, 700);
}
