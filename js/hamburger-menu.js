// Hamburger menu toggle for navigation

document.addEventListener('DOMContentLoaded', function () {
  var menuButton = document.getElementById('jpcc-hamburger');
  var navMenu = document.getElementById('jpcc-main-menu');
  var icon = document.getElementById('jpcc-hamburger-icon');
  var iconX = document.getElementById('jpcc-hamburger-x');

  if (!menuButton || !navMenu) return;

  // initialize ARIA
  menuButton.setAttribute('aria-expanded', 'false');

  menuButton.addEventListener('click', function () {
    var isOpen = menuButton.classList.toggle('is-open');

    // toggle visible class on menu to match CSS
    navMenu.classList.toggle('open');

    // update aria
    menuButton.setAttribute('aria-expanded', String(isOpen));

    // swap icons if present
    if (icon && iconX) {
      icon.style.display = isOpen ? 'none' : '';
      iconX.style.display = isOpen ? '' : 'none';
    }
  });

  // keep menu state consistent on resize: show menu on desktop, hide on mobile
  var BREAKPOINT = 960;
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth >= BREAKPOINT) {
        navMenu.classList.add('open');
        menuButton.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        if (icon && iconX) { icon.style.display = ''; iconX.style.display = 'none'; }
      } else {
        navMenu.classList.remove('open');
        menuButton.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    }, 120);
  });
});
