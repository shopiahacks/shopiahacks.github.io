const ROW = 240; // target row height (px) for the photo and art galleries
const $ = s => document.querySelector(s);
const q = new URLSearchParams(location.search);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = d => { const t = new Date(d + 'T12:00:00'); return isNaN(t) ? d : t.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); };
const src = (item, kind) => item.file.startsWith('images/') ? item.file : (kind === 'photo' ? 'images/photography/' : 'images/art/') + item.file;
const link = (item, kind) => (kind === 'photo' ? 'photo.html' : 'piece.html') + '?id=' + encodeURIComponent(item.id);

photos.forEach(p => { if (!p.photographer) console.warn('photo missing photographer:', p.id); });
art.forEach(a => { if (!a.title || !a.artist) console.warn('art missing title or artist:', a.id); });

// one clickable image. in 'justify' mode its size follows the image's own proportions.
function tile(item, kind, justify) {
  const a = document.createElement('a');
  a.href = link(item, kind);
  const img = new Image();
  img.src = src(item, kind);
  img.alt = item.alt || item.title || '';
  a.append(img);
  if (justify) {
    const set = () => { const r = img.naturalWidth / img.naturalHeight || 1; a.style.flex = `${r} 1 ${r * ROW}px`; };
    img.complete && img.naturalWidth ? set() : img.addEventListener('load', set);
  }
  return a;
}
function justified(el, items, kind) {
  el.replaceChildren(...items.map(i => tile(i, kind, true)));
  if (!items.length) el.textContent = 'nothing here yet.';
}
function details(item, rows) {
  const dl = rows.filter(([, v]) => v).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
  return (item.title ? `<h1>${esc(item.title)}</h1>` : '') + `<dl>${dl}</dl>` + (item.description ? `<p class="desc">${esc(item.description)}</p>` : '');
}
function detailPage(item, kind, rows, backHref, backLabel) {
  const main = $('main');
  if (!item) { main.textContent = 'not found.'; return; }
  document.title = item.title || (kind === 'photo' ? 'photo' : 'art');
  main.innerHTML = `<a id="back" href="${backHref}">back to ${backLabel}</a><img class="big" src="${src(item, kind)}" alt="${esc(item.alt || item.title || '')}">` + details(item, rows);
  $('#back').addEventListener('click', e => { if (history.length > 1 && document.referrer.startsWith(location.origin)) { e.preventDefault(); history.back(); } });
}

const page = document.body.dataset.page;

if (page === 'photography') {
  const STRIP_H = 200;  // photo height in the rows; keep the same as ".strip img" in the css
  const ROW_MAX = 1800; // max total length of a row in px; raise it for longer rows

  // ----- slider at the top -----
  const slides = featured.map(id => photos.find(p => p.id === id)).filter(Boolean).slice(0, 6);
  const slider = $('.slider'), track = $('#track');
  if (!slides.length) slider.hidden = true;
  else {
    const n = slides.length;
    const slideHTML = (p, clone) => `<a class="slide" href="${link(p, 'photo')}"${clone ? ' tabindex="-1" aria-hidden="true"' : ''}><img src="${src(p, 'photo')}" alt="${clone ? '' : esc(p.alt || p.title || '')}"></a>`;
    // the photos appear twice so that after the last one, the first can slide in from the right
    track.innerHTML = slides.map(p => slideHTML(p, false)).join('') + slides.map(p => slideHTML(p, true)).join('');
    const els = [...track.children];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0, timer;

    const place = (k, animate) => {
      track.style.transition = animate ? '' : 'none';
      track.style.transform = `translateX(-${els[k].offsetLeft}px)`;
      if (!animate) track.offsetWidth; // forces the jump to happen instantly
    };
    const fix = () => { if (i >= n) { i -= n; place(i, false); } }; // jump from the repeat back to the real start
    const go = k => { i = k; place(i, true); if (reduced) fix(); };
    const next = () => { if (i < 2 * n - 1) go(i + 1); };
    const prev = () => { if (i === 0) { i = n; place(i, false); } go(i - 1); };
    const stop = () => clearInterval(timer);
    const play = () => { stop(); if (n > 1 && !reduced) timer = setInterval(next, 9000); };

    track.addEventListener('transitionend', e => { if (e.target === track) fix(); });
    track.querySelectorAll('img').forEach(im => im.addEventListener('load', () => place(i, false)));
    window.addEventListener('resize', () => place(i, false));
    $('#next').onclick = () => { next(); play(); };
    $('#prev').onclick = () => { prev(); play(); };
    slider.addEventListener('mouseenter', stop); slider.addEventListener('mouseleave', play);
    slider.addEventListener('focusin', stop); slider.addEventListener('focusout', play);
    play();
  }

  // ----- one row per collection -----
  collections.forEach(c => {
    const ps = photos.filter(p => p.collections.includes(c.id));
    if (!ps.length) return;
    const href = 'collection.html?c=' + encodeURIComponent(c.id);
    const sec = document.createElement('section');
    sec.className = 'row';
    sec.innerHTML = `<h2><a href="${href}">${esc(c.title)}</a></h2><div class="strip"></div>`;
    const strip = sec.querySelector('.strip');
    const tiles = ps.slice(0, 12).map(p => tile(p, 'photo', false));
    const more = document.createElement('a');
    more.className = 'more';
    more.href = href;
    more.textContent = '→';
    more.setAttribute('aria-label', 'see more ' + c.title);
    strip.append(...tiles, more);
    $('#rows').append(sec);

    // once the photos load, cut the row off at ROW_MAX so rows are limited by length, not count
    Promise.all(tiles.map(t => { const im = t.firstChild; return im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; }); })).then(() => {
      let total = 0;
      tiles.forEach((t, k) => {
        const im = t.firstChild;
        total += (im.naturalWidth / im.naturalHeight || 1) * STRIP_H + 12;
        if (k > 0 && total > ROW_MAX) t.remove();
      });
    });
  });


  // const slides = featured.map(id => photos.find(p => p.id === id)).filter(Boolean).slice(0, 6);
  // const slider = $('.slider'), track = $('#track');
  // if (!slides.length) slider.hidden = true;
  // track.innerHTML = slides.map(p => `<a class="slide" href="${link(p, 'photo')}"><img src="${src(p, 'photo')}" alt="${esc(p.alt || p.title || '')}"></a>`).join('');
  // let i = 0, timer;
  // const go = n => { i = (n + slides.length) % slides.length; track.style.transform = `translateX(-${i * 100}%)`; };
  // const stop = () => clearInterval(timer);
  // const play = () => { stop(); if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => go(i + 1), 9000); };
  // $('#next').onclick = () => { go(i + 1); play(); };
  // $('#prev').onclick = () => { go(i - 1); play(); };
  // slider.addEventListener('mouseenter', stop); slider.addEventListener('mouseleave', play);
  // slider.addEventListener('focusin', stop); slider.addEventListener('focusout', play);
  // play();

  // collections.forEach(c => {
  //   const ps = photos.filter(p => p.collections.includes(c.id));
  //   if (!ps.length) return;
  //   const sec = document.createElement('section');
  //   sec.className = 'row';
  //   sec.innerHTML = `<div class="rowhead"><h2><a href="collection.html?c=${encodeURIComponent(c.id)}">${esc(c.title)}</a></h2><a href="collection.html?c=${encodeURIComponent(c.id)}">see more</a></div><div class="strip"></div>`;
  //   ps.slice(0, 8).forEach(p => sec.querySelector('.strip').append(tile(p, 'photo', false)));
  //   $('#rows').append(sec);
  // });
}

if (page === 'collection') {
  const c = collections.find(c => c.id === q.get('c'));
  if (!c) $('main').textContent = 'collection not found.';
  else {
    document.title = c.title;
    $('#title').textContent = c.title;
    $('#blurb').textContent = c.blurb || '';
    $('#blurb').hidden = !c.blurb;
    justified($('#gallery'), photos.filter(p => p.collections.includes(c.id)), 'photo');
  }
}

if (page === 'all-photos') {
  const f = $('#filter'), s = $('#sort');
  f.innerHTML = '<option value="all">all collections</option>' + collections.map(c => `<option value="${esc(c.id)}">${esc(c.title)}</option>`).join('');
  const none = (a, b) => !a - !b; // puts items missing a value last
  const draw = () => {
    const ps = photos.filter(p => f.value === 'all' || p.collections.includes(f.value));
    const d = p => p.date || '', t = p => p.title || '';
    ps.sort(s.value === 'oldest' ? (a, b) => none(d(a), d(b)) || d(a).localeCompare(d(b))
      : s.value === 'title' ? (a, b) => none(t(a), t(b)) || t(a).localeCompare(t(b))
      : (a, b) => none(d(a), d(b)) || d(b).localeCompare(d(a)));
    justified($('#gallery'), ps, 'photo');
  };
  f.onchange = s.onchange = draw;
  draw();
}

if (page === 'photo') {
  const p = photos.find(p => p.id === q.get('id'));
  detailPage(p, 'photo', p ? [['photographer', p.photographer], ['camera', p.camera], ['date', p.date && fmt(p.date)], ['location', p.location]] : [], 'photography.html', 'photography');
}
if (page === 'piece') {
  const a = art.find(a => a.id === q.get('id'));
  detailPage(a, 'art', a ? [['artist', a.artist], ['medium', a.medium], ['size', a.size], ['date', a.date && fmt(a.date)]] : [], 'art.html', 'art');
}
if (page === 'art') justified($('#gallery'), art, 'art');
