// builds the dropdown under "photography" from the collections in data.js
function buildPhotoNav() {
  const link = document.querySelector('nav a[href="photography.html"]');
  if (!link || typeof collections === 'undefined') return;
  const menu = document.createElement('ul');
  const items = collections.map(c => [c.title, 'collection.html?c=' + encodeURIComponent(c.id)]);
  items.push(['all photos', 'all-photos.html']);
  items.forEach(([text, href]) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    li.append(a);
    menu.append(li);
  });
  link.parentElement.classList.add('has-sub');
  link.parentElement.append(menu);
}
if (typeof collections === 'undefined') {
  document.write('<script src="js/data.js"><\/script><script>buildPhotoNav()<\/script>');
} else {
  buildPhotoNav();
}