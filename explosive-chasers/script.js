/* Explosive Chasers – template behaviour
   1. Keeps the CSS design-unit (--u) exact: viewport width without the scrollbar.
   2. Highlights the nav tab that was clicked / whose section is in view.            */
(function () {
  var root = document.documentElement;

  function setUnit() {
    var w = root.clientWidth;                         // width without scrollbar
    var design = window.matchMedia('(max-width: 900px)').matches ? 720 : 1920;
    var capped = Math.min(w, 2560);
    root.style.setProperty('--u', (capped / design) + 'px');
  }
  setUnit();
  window.addEventListener('resize', setUnit, { passive: true });
  window.addEventListener('orientationchange', setUnit);

  // active tab feedback
  var buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.removeAttribute('aria-current'); });
      btn.setAttribute('aria-current', 'page');
    });
  });
})();

/* ==========================================================================
   Gallery – previous / next buttons, swipe, keyboard, full-screen viewer
   The list of pictures comes from  <section id="gallery" data-images="a.jpg,b.jpg,...">
   ========================================================================== */
(function () {
  var root = document.getElementById('gallery');
  if (!root) return;

  var list = (root.getAttribute('data-images') || '').split(',')
    .map(function (s) { return s.trim(); }).filter(Boolean);
  if (!list.length) return;

  var photoBtn = root.querySelector('.gallery-photo');
  var photo = photoBtn.querySelector('img');
  var prevBtn = root.querySelector('.g-prev');
  var nextBtn = root.querySelector('.g-next');
  var status = document.getElementById('gallery-status');

  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('.lb-img');
  var lbCount = lb.querySelector('.lb-count');
  var lbPrev = lb.querySelector('.lb-prev');
  var lbNext = lb.querySelector('.lb-next');
  var lbClose = lb.querySelector('.lb-close');

  var index = 0;
  var lbOpen = false;
  var usedFullscreen = false;
  var lastFocus = null;
  var swiped = false;

  // preload so changing pictures feels instant
  list.forEach(function (src) { var i = new Image(); i.src = src; });

  function swap(img, wrapper, src, alt) {
    wrapper.classList.add('is-changing');
    window.setTimeout(function () {
      img.onload = function () { wrapper.classList.remove('is-changing'); };
      img.src = src;
      img.alt = alt;
      if (img.complete) wrapper.classList.remove('is-changing');
    }, 140);
  }

  function show(i) {
    index = (i + list.length) % list.length;
    var alt = 'Gallery image ' + (index + 1) + ' of ' + list.length;
    swap(photo, photoBtn, list[index], alt);
    if (status) status.textContent = alt;
    if (lbOpen) {
      swap(lbImg, lbImg, list[index], alt);
      lbCount.textContent = (index + 1) + ' / ' + list.length;
    }
  }
  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  lbPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  lbNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });

  // ---------- full-screen viewer ----------
  function openViewer() {
    lastFocus = document.activeElement;
    lbImg.src = list[index];
    lbImg.alt = 'Gallery image ' + (index + 1) + ' of ' + list.length;
    lbCount.textContent = (index + 1) + ' / ' + list.length;
    lb.hidden = false;
    lbOpen = true;
    document.documentElement.style.overflow = 'hidden';
    lbClose.focus({ preventScroll: true });

    var req = lb.requestFullscreen || lb.webkitRequestFullscreen;
    if (req) {
      try {
        var p = req.call(lb);
        usedFullscreen = true;
        if (p && p.catch) p.catch(function () { usedFullscreen = false; });
      } catch (e) { usedFullscreen = false; }
    }
  }

  function closeViewer() {
    if (!lbOpen) return;
    lbOpen = false;
    lb.hidden = true;
    document.documentElement.style.overflow = '';
    var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) { try { exit.call(document); } catch (e) {} }
    }
    usedFullscreen = false;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  photoBtn.addEventListener('click', function () {
    if (swiped) { swiped = false; return; }
    openViewer();
  });
  lbClose.addEventListener('click', function (e) { e.stopPropagation(); closeViewer(); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target === lbImg) closeViewer();
  });

  // leaving browser full screen with Esc also closes the viewer
  function onFsChange() {
    var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fsEl && lbOpen && usedFullscreen) closeViewer();
  }
  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);

  // ---------- keyboard ----------
  document.addEventListener('keydown', function (e) {
    if (lbOpen) {
      if (e.key === 'Escape') { closeViewer(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'Tab') {                       // keep focus inside the viewer
        var f = [lbClose, lbPrev, lbNext];
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    }
  });
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  // ---------- swipe (touch) ----------
  function addSwipe(el, markSwipe) {
    var x0 = null, y0 = null;
    el.addEventListener('touchstart', function (e) {
      var t = e.changedTouches[0]; x0 = t.clientX; y0 = t.clientY;
    }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (markSwipe) swiped = true;
        if (dx < 0) next(); else prev();
      }
    }, { passive: true });
  }
  addSwipe(photoBtn, true);
  addSwipe(lb, false);
})();

/* ==========================================================================
   Looping silent video (YouTube section) – works like an animated GIF
   • always muted + inline, starts by itself and restarts when it ends (loop)
   • pauses while off-screen / tab hidden to save battery, resumes automatically
   • no user controls; right-click menu is disabled on it
   • visitors who ask their system for reduced motion get the still picture
   ========================================================================== */
(function () {
  var videos = document.querySelectorAll('video.loop-video');
  if (!videos.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  videos.forEach(function (v) {
    v.muted = true;                     // required for autoplay in every browser
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.controls = false;
    v.removeAttribute('controls');
    v.setAttribute('webkit-playsinline', '');
    v.disablePictureInPicture = true;
    v.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    v.addEventListener('dblclick', function (e) { e.preventDefault(); });

    var wanted = true;                  // should it be playing right now?

    function play() {
      if (!wanted || (reduce && reduce.matches)) return;
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* blocked: retried on next interaction */ });
    }
    function pause() { v.pause(); }

    // safety net: if it ever ends (e.g. a browser ignoring loop), start again
    v.addEventListener('ended', function () { v.currentTime = 0; play(); });
    v.addEventListener('canplay', play);
    v.addEventListener('pause', function () {          // nobody can pause it except us
      if (wanted && !v.ended && !(reduce && reduce.matches) && !document.hidden) play();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          wanted = en.isIntersecting;
          if (wanted) play(); else pause();
        });
      }, { threshold: 0.05 }).observe(v);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause(); else play();
    });

    // some browsers (low-power mode) only allow autoplay after the first touch / click
    ['touchstart', 'click', 'keydown', 'scroll'].forEach(function (ev) {
      window.addEventListener(ev, function once() {
        window.removeEventListener(ev, once);
        play();
      }, { passive: true });
    });

    if (reduce && reduce.addEventListener) {
      reduce.addEventListener('change', function () { if (reduce.matches) pause(); else play(); });
    }
    if (reduce && reduce.matches) pause(); else play();
  });
})();
