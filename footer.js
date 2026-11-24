/* Tech NDT Services - footer.js
   ONE shared footer for every page. Edit the markup below once and it updates on all pages.
   Works from a web server and also when you open the .html files directly from disk.

   Each page has <div id="site-footer" data-cta-title="..." data-cta-label="..." data-cta-href="..."></div>
   which sets the big call-to-action line at the top of the footer for that page. */
(function () {
  'use strict';
  const host = document.getElementById('site-footer');
  if (!host) return;

  const FOOTER_HTML = `<footer class="footer">
  <div class="container">
    <div class="footer__cta"><h3 data-f="title">Planning a shutdown? Let’s scope it together.</h3><a data-f="cta" class="btn" href="https://wa.me/917032501927?text=Hello%20Tech%20NDT%20Services%2C%20I%20would%20like%20a%20quote%20for%20an%20NDT%20inspection.%20Please%20contact%20me%20to%20discuss%20the%20scope." target="_blank" rel="noopener">Get a quote <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>
    <div class="footer__in">
      <div><a href="index.html" class="logo" aria-label="Tech NDT Services"><img src="assets/logo.png" alt="Tech NDT Services" height="44"></a><p>Non-destructive testing, QC inspection and manpower supply for oil, gas, railway and heavy industry.</p><div class="soc"><a href="#" data-social="linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6c.6-1 1.9-1.9 3.9-1.9 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/></svg></a><a href="#" data-social="instagram" target="_blank" rel="noopener" aria-label="Instagram"><svg class="s" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg></a><a href="#" data-social="facebook" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.5V13h2.8v8z"/></svg></a><a href="#" data-social="youtube" target="_blank" rel="noopener" aria-label="YouTube"><svg class="s" viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></svg></a></div></div>
      <div><h4>Company</h4><a href="about.html">About</a><a href="projects.html">Projects</a><a href="industries.html">Industries</a><a href="courses.html">Courses</a><a href="contact.html">Contact</a></div>
      <div><h4>Services</h4><a href="services.html#ut">Ultrasonic testing</a><a href="services.html#rt">Radiography</a><a href="services.html#mpi">Magnetic particle</a><a href="services.html#lpt">Liquid penetrant</a><a href="services.html#paut">PAUT and TOFD</a><a href="services.html#rope">Rope access</a><a href="services.html#railway">Railway inspection</a><a href="services.html#manpower">Manpower supply</a></div>
      <div><h4>Office</h4><p>6-103, Narava, Near GVMC Filtration Plant,<br>Gopalapatnam, Visakhapatnam – 530027</p><p><a href="mailto:techndtservices1@gmail.com">techndtservices1@gmail.com</a><a href="tel:+917032501927">+91 70325 01927</a><a href="https://wa.me/917032501927?text=Hello%20Tech%20NDT%20Services%2C%20I%20would%20like%20to%20enquire." target="_blank" rel="noopener">WhatsApp us</a></p></div>
    </div>
    <div class="footer__bot"><span>&copy; <span id="yr"></span> Tech NDT Services. All rights reserved.</span> <span>Designed by <a class="credit" href="https://www.uxwave.in" target="_blank" rel="noopener">UXwave</a></span></div>
  </div>
</footer>
<a class="wa" href="https://wa.me/917032501927?text=Hello%20Tech%20NDT%20Services%2C%20I%20would%20like%20to%20enquire." target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.4-1.5-.7-2.3-1.6-.6-.7-1-1.4-1.1-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.4 3.9 3.4 1.4.6 1.9.6 2.6.5.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"/></svg></a>`;

  const tpl = document.createElement('template');
  tpl.innerHTML = FOOTER_HTML;
  const d = host.dataset, $ = s => tpl.content.querySelector(s);
  const h = $('[data-f="title"]'), a = $('[data-f="cta"]');
  if (d.ctaTitle && h) h.textContent = d.ctaTitle;
  if (a) {
    if (d.ctaHref) {
      a.href = d.ctaHref;
      if (/^https?:/.test(d.ctaHref)) { a.target = '_blank'; a.rel = 'noopener'; }
      else { a.removeAttribute('target'); a.removeAttribute('rel'); }
    }
    if (d.ctaLabel) {
      const n = Array.from(a.childNodes).find(x => x.nodeType === 3);
      if (n) n.textContent = d.ctaLabel + ' '; else a.insertBefore(document.createTextNode(d.ctaLabel + ' '), a.firstChild);
    }
  }
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
  host.replaceWith(tpl.content);
})();
