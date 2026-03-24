/* ═══════════════════════════════════════════
   ode2code.co.nz — Interactions
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ── Nav shrink on scroll ──
    var nav = document.getElementById('nav');
    var navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    var sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // ── Active nav highlighting ──
    function updateActiveNav() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ── Scroll reveal ──
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }
})();
