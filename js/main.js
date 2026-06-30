if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
// Always open at the top, even if the URL carries a #hash (e.g. from a
// stale bookmark or "Add to Home Screen" shortcut saved while scrolled
// down a section).
window.scrollTo(0, 0);
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

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

  // In-page anchor links: smooth-scroll without leaving a #hash in the
  // URL, so saved bookmarks / "Add to Home Screen" shortcuts always open
  // at the top of the page instead of re-jumping to whichever section
  // was last visited.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').slice(1);
      var target = targetId ? document.getElementById(targetId) : null;
      e.preventDefault();
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      history.replaceState(null, '', window.location.pathname + window.location.search);
    });
  });

  // Header scroll shadow + active nav tracking
  var header = document.getElementById('header');
  var navLinks = nav.querySelectorAll('a');
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').substring(1);
    var sec = document.getElementById(id);
    if (sec) sections.push({ el: sec, link: link });
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    var scrollPos = window.scrollY + 120;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= scrollPos) {
        current = sections[i];
      }
    }
    navLinks.forEach(function (l) { l.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  });

  // Fade-in on scroll
  var fadeEls = document.querySelectorAll(
    '.about, .collection, .info-cards, .order-section, .faq-section, .contact-section'
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
