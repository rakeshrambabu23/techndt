/* Tech NDT Services - page.js (shared by about, services, industries, projects, courses, contact) */
(function () {
  'use strict';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* Header + mobile nav */
  const header = $('#header');
  const setScrolled = () => header.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', setScrolled, { passive: true }); setScrolled();
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

  /* Reveal + counters */
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
  $$('.reveal, .facts div').forEach(el => io.observe(el));

  /* Filter chips: <div data-filters="#target"> buttons[data-f] ... items[data-cat="a b"] */
  $$('[data-filters]').forEach(bar => {
    const target = $(bar.dataset.filters), btns = $$('button', bar);
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.toggle('on', x === b));
      const f = b.dataset.f;
      $$('[data-cat]', target).forEach(c => { c.hidden = !(f === 'all' || c.dataset.cat.split(' ').includes(f)); });
    }));
  });

  /* Services sub-nav highlights the method in view */
  const sn = $$('.subnav a');
  if (sn.length) {
    sn.forEach((a, i) => {
      const s = $(a.getAttribute('href'));
      if (!s) return;
      new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) sn.forEach(l => l.classList.toggle('on', l === sn[i]));
      }), { rootMargin: '-40% 0px -55% 0px' }).observe(s);
    });
  }

  /* Pre-select a dropdown from the URL, e.g. contact.html?service=Ultrasonic%20testing */
  const q = new URLSearchParams(location.search);
  $$('select[data-param]').forEach(sel => {
    const v = q.get(sel.dataset.param);
    if (!v) return;
    const o = Array.from(sel.options).find(o => o.value === v || o.text === v);
    if (o) sel.value = o.value;
  });
  /* Course "Enquire" buttons choose the course in the enrol form */
  $$('[data-course]').forEach(a => a.addEventListener('click', () => {
    const sel = $('#enrolCourse'); if (sel) sel.value = a.dataset.course;
  }));

  /* Forms: validate, then open WhatsApp with the details filled in (no backend needed) */
  const WA = '917032501927';
  const LBL = { name: 'Name', email: 'Email', phone: 'Phone', company: 'Company', service: 'Service', course: 'Course', mode: 'Enrolling as', msg: 'Details' };
  $$('form[data-form]').forEach(form => {
    const ok = $('.form__ok', form);
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
      setTimeout(() => { ok.hidden = true; }, 6000);
    });
  });

  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
