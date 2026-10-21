// shared header and footer for every page. edit the nav links or footer text here, once.
(() => {
  const NAV = [
    ['about me', 'about'], ['photography', 'photography'], ['writing', 'writing'],
    ['social media', 'social-media'], ['art', 'art'], ['just for fun', 'just-for-fun'],
  ];
  const PARENT = { collection: 'photography', 'all-photos': 'photography', photo: 'photography', piece: 'art' };
  const FOOTER = 'made by sophia';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const here = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  const current = PARENT[here] || here;

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const menu = typeof collections === 'undefined' ? '' : '<ul>' + [
        ...collections.map(c => [c.title, 'collection.html?c=' + encodeURIComponent(c.id)]),
        ['all photos', 'all-photos.html'],
      ].map(([t, h]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('') + '</ul>';
      const items = NAV.map(([label, page]) => {
        const sub = page === 'photography';
        return `<li${sub ? ' class="has-sub"' : ''}><a href="${page}.html"${page === current ? ' aria-current="page"' : ''}>${label}</a>${sub ? menu : ''}</li>`;
      }).join('');
      this.innerHTML = `<header class="site"><a class="logo" href="index.html">sophia</a><nav aria-label="main"><ul>${items}</ul></nav></header>`;
    }
  }
  class SiteFooter extends HTMLElement {
    connectedCallback() { this.innerHTML = `<site-footer></site-footer>`; }
  }
  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);

  // favicon and theme color on every page
  document.head.insertAdjacentHTML('beforeend', '<link rel="icon" href="/favicon.svg" type="image/svg+xml"><meta name="theme-color" content="#f7f7f8">');
})();