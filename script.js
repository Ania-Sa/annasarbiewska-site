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
  const cacheKey = 'annasarbiewska-visitor-count';
  const cachedValue = localStorage.getItem(cacheKey);

  // Show the last successfully loaded value while the live count is fetched.
  if (cachedValue && /^\d+$/.test(cachedValue)) {
    visitorCount.textContent = new Intl.NumberFormat('pl-PL').format(Number(cachedValue));
  } else {
    visitorCount.textContent = '…';
  }

  let resolved = false;

  window.__asVisitorCounter = function (data) {
    const value = Number(data && data.value);
    if (Number.isFinite(value) && value >= 0) {
      resolved = true;
      const rounded = Math.floor(value);
      localStorage.setItem(cacheKey, String(rounded));
      visitorCount.textContent = new Intl.NumberFormat('pl-PL').format(rounded);
    }
  };

  // CounterAPI supports JSONP. This avoids browser CORS/fetch failures
  // that previously caused the counter to fall back to a dash.
  const counterScript = document.createElement('script');
  counterScript.async = true;
  counterScript.src =
    'https://counterapi.com/api/annasarbiewska.com/view/home' +
    '?unique=true&callback=__asVisitorCounter&_=' + Date.now();

  counterScript.onerror = function () {
    if (!resolved && !cachedValue) {
      visitorCount.textContent = '—';
    }
  };

  document.head.appendChild(counterScript);

  // If the service is temporarily slow/down, keep the last successful
  // count instead of replacing it with a dash.
  window.setTimeout(() => {
    if (!resolved && !cachedValue) {
      visitorCount.textContent = '—';
    }
  }, 8000);
}
