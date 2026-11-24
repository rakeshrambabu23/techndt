/* Tech NDT Services - script.js (home page) */
(function () {
  'use strict';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* Hero video: plays on its own. Paused only if the visitor prefers reduced motion. */
  const video = $('#heroVideo');
  if (video) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();
    else { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
  }

  /* Header / mobile nav */
  const header = $('#header');
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20), { passive: true });
  const nav = $('#nav'), burger = $('#burger'), scrim = $('#scrim');
  const setMenu = o => {
    nav.classList.toggle('open', o); burger.classList.toggle('is-open', o);
    if (scrim) scrim.classList.toggle('on', o);
    document.documentElement.classList.toggle('menu', o);
    burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  if (scrim) scrim.addEventListener('click', () => setMenu(false));
  $$('#nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 1100) setMenu(false); });

  /* Reveal on scroll + counters */
  function countUp(el) {
    const end = +el.dataset.count, suf = el.dataset.suffix || '', dur = 1600, t0 = performance.now();
    (function f(n) {
      const p = Math.min(1, (n - t0) / dur), v = Math.floor(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString() + suf;
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('[data-count]', e.target).forEach(countUp);
    if (e.target.matches('[data-count]')) countUp(e.target);
    io.unobserve(e.target);
  }), { threshold: 0.18 });
  $$('.reveal, .bar, .badge-exp').forEach(el => io.observe(el));

  /* Services slider */
  const sl = $('#svSlider');
  const step = () => (sl.firstElementChild.getBoundingClientRect().width + 24);
  $('#svNext').addEventListener('click', () => sl.scrollBy({ left: step(), behavior: 'smooth' }));
  $('#svPrev').addEventListener('click', () => sl.scrollBy({ left: -step(), behavior: 'smooth' }));

  /* Testimonials */
  const qs = $$('#testi blockquote'), tDots = $$('#testiDots button');
  let qi = 0, qt;
  function showQ(i) { qi = i; qs.forEach((q, k) => q.classList.toggle('on', k === i)); tDots.forEach((d, k) => d.classList.toggle('on', k === i)); }
  tDots.forEach((d, k) => d.addEventListener('click', () => { showQ(k); reset(); }));
  function reset() { clearInterval(qt); qt = setInterval(() => showQ((qi + 1) % qs.length), 6000); }
  reset();

  /* Contact form: validate, then open WhatsApp with the details filled in */
  const WA = '917032501927';
  const LBL = { name: 'Name', email: 'Email', phone: 'Phone', service: 'Service', msg: 'Details' };
  const form = $('#form'), ok = $('#formOk');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    $$('[required]', form).forEach(f => {
      const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle('err', bad); if (bad) valid = false;
    });
    if (!valid) return;
    const lines = ['Hello Tech NDT Services,'];
    $$('input, select, textarea', form).forEach(f => { if (f.name && f.value.trim()) lines.push((LBL[f.name] || f.name) + ': ' + f.value.trim()); });
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    ok.hidden = false; form.reset();
    setTimeout(() => ok.hidden = true, 6000);
  });

})();
