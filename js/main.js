document.addEventListener('DOMContentLoaded', function () {

  // Mobile menu toggle
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Header scroll shadow
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Fade-in on scroll
  var fadeEls = document.querySelectorAll(
    '.about, .collection, .info-cards, .order-section, .size-section, .faq-section, .contact-section'
  );

  fadeEls.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(function (el) {
    observer.observe(el);
  });

});
