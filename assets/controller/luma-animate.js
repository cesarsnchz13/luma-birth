/**
 * luma-animate.js
 * Luma Birth — Section entrance animations
 * Lightweight vanilla JS IntersectionObserver.
 * No dependencies required.
 */

(function () {
  'use strict';

  function initRevealObserver() {
    var elements = document.querySelectorAll('.luma-reveal');

    // Graceful fallback for older browsers
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('luma-revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('luma-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealObserver);
  } else {
    initRevealObserver();
  }

})();
