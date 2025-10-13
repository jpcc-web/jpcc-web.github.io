(function(){
  'use strict';
  // Create overlay element
  var overlay = document.createElement('div');
  overlay.className = 'jpcc-lightbox-overlay';
  overlay.innerHTML = '\n    <button class="jpcc-lightbox-close" aria-label="Close image modal">✕</button>\n    <div class="jpcc-lightbox-content">\n      <img src="" alt="" class="jpcc-lightbox-img">\n      <div class="jpcc-lightbox-caption"></div>\n    </div>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector('.jpcc-lightbox-img');
  var captionEl = overlay.querySelector('.jpcc-lightbox-caption');
  var closeBtn = overlay.querySelector('.jpcc-lightbox-close');

  function open(src, alt, caption){
    imgEl.src = src;
    imgEl.alt = alt || '';
    captionEl.textContent = caption || '';
    overlay.classList.add('jpcc-open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    overlay.classList.remove('jpcc-open');
    document.body.style.overflow = '';
    // release image
    setTimeout(function(){ imgEl.src = ''; captionEl.textContent = ''; }, 220);
  }

  // click handlers
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) close();
  });
  closeBtn.addEventListener('click', close);

  // keyboard
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') close();
  });

  // Delegate for images with data-lightbox attribute
  document.addEventListener('click', function(e){
    var t = e.target;
    // walk up to allow clicks on nested elements inside link/img
    while(t && t !== document){
      if(t.matches && t.matches('[data-lightbox]')){
        e.preventDefault();
        var src = t.getAttribute('data-lightbox-src') || (t.querySelector && (t.querySelector('img')||{}).src) || t.href;
        var alt = t.getAttribute('data-lightbox-alt') || (t.querySelector && (t.querySelector('img')||{}).alt) || '';
        var cap = t.getAttribute('data-lightbox-caption') || alt || '';
        open(src, alt, cap);
        return;
      }
      t = t.parentNode;
    }
  });
})();
