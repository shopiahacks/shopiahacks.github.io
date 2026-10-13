// filters the photography gallery. clicking a button changes the url hash (#picks, #all, #graduation...)
const buttons = [...document.querySelectorAll('[data-filter]')];
const photos = [...document.querySelectorAll('figure[data-tags]')];

function show(tag) {
  if (!buttons.some(b => b.dataset.filter === tag)) tag = 'picks';
  photos.forEach(p => {
    p.hidden = !(tag === 'all' || p.dataset.tags.split(' ').includes(tag));
  });
  buttons.forEach(b => b.setAttribute('aria-pressed', b.dataset.filter === tag));
}

buttons.forEach(b => b.addEventListener('click', () => { location.hash = b.dataset.filter; }));
window.addEventListener('hashchange', () => show(location.hash.slice(1)));
show(location.hash.slice(1));
