/* ============================================================
   Mewgenics Wiki — App
   Hash router, page renderers, search, filters, ad slots.
   No external dependencies.
   ============================================================ */

(function () {
  const D = window.WikiData;
  const main = document.getElementById('main');
  const leftNav = document.getElementById('leftNav');
  const rightNav = document.getElementById('rightNav');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const menuToggle = document.getElementById('menuToggle');

  /* -------------------- helpers -------------------- */
  const $ = (s, p = document) => p.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const byId = (arr, id) => arr.find((x) => x.id === id);
  const tag = (text, cls) => `<span class="tag ${esc(cls || '')}">${esc(text)}</span>`;
  const link = (href, text, attrs = '') => `<a href="${esc(href)}" ${attrs}>${esc(text)}</a>`;
  const titleCase = (s) => String(s || '').replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  /* -------------------- icons & sprites --------------------
     Inline SVG icons. Cats use the cat sprite, tinted by type.
     Each entity supports an optional `image` field that wins
     over the SVG fallback — drop a PNG into /img/cats/<id>.png
     and add `image: 'img/cats/<id>.png'` in data.js.
  ------------------------------------------------------------ */
  const SVG = {
    cat: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="50" cy="78" rx="22" ry="14" fill="currentColor"/>
      <circle cx="50" cy="50" r="22" fill="currentColor"/>
      <path d="M32 38 L35 22 L42 34 Z" fill="currentColor"/>
      <path d="M68 38 L65 22 L58 34 Z" fill="currentColor"/>
      <path d="M34 35 L37 26 L40 34 Z" fill="rgba(0,0,0,0.3)"/>
      <path d="M66 35 L63 26 L60 34 Z" fill="rgba(0,0,0,0.3)"/>
      <path d="M72 80 Q92 70 85 50" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>
      <ellipse cx="41" cy="49" rx="3" ry="4" fill="#1a1a1a"/>
      <ellipse cx="59" cy="49" rx="3" ry="4" fill="#1a1a1a"/>
      <circle cx="42" cy="47" r="0.8" fill="#fff"/>
      <circle cx="60" cy="47" r="0.8" fill="#fff"/>
      <path d="M48 57 L52 57 L50 60 Z" fill="#1a1a1a"/>
      <path d="M50 60 Q47 63 44 62" stroke="#1a1a1a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <path d="M50 60 Q53 63 56 62" stroke="#1a1a1a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    </svg>`,
    orb: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="55" r="28" fill="currentColor" opacity="0.35"/><circle cx="50" cy="50" r="22" fill="currentColor"/><circle cx="43" cy="42" r="5" fill="rgba(255,255,255,0.7)"/></svg>`,
    pouch: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M28 45 L30 85 Q30 90 35 90 L65 90 Q70 90 70 85 L72 45 Z" fill="currentColor"/><path d="M25 45 L75 45 L72 38 L28 38 Z" fill="currentColor" opacity="0.7"/><path d="M40 38 Q45 28 50 32 Q55 28 60 38" stroke="currentColor" stroke-width="2.5" fill="none"/><circle cx="50" cy="65" r="5" fill="rgba(255,255,255,0.6)"/></svg>`,
    skull: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M28 45 Q28 25 50 25 Q72 25 72 45 L72 60 Q72 65 68 67 L68 75 L60 75 L60 70 L55 70 L55 75 L45 75 L45 70 L40 70 L40 75 L32 75 L32 67 Q28 65 28 60 Z" fill="currentColor"/><ellipse cx="40" cy="50" rx="5" ry="6" fill="#1a1a1a"/><ellipse cx="60" cy="50" rx="5" ry="6" fill="#1a1a1a"/><path d="M46 60 L54 60 L50 65 Z" fill="#1a1a1a"/></svg>`,
    landmark: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M30 50 Q30 30 50 25 Q70 30 70 50 Q70 60 50 60 Q30 60 30 50 Z" fill="currentColor"/><rect x="46" y="55" width="8" height="20" fill="currentColor" opacity="0.7"/><ellipse cx="50" cy="80" rx="22" ry="5" fill="currentColor" opacity="0.3"/></svg>`,
    paw: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="50" cy="65" rx="18" ry="14" fill="currentColor"/><ellipse cx="30" cy="35" rx="7" ry="9" fill="currentColor"/><ellipse cx="42" cy="22" rx="6" ry="8" fill="currentColor"/><ellipse cx="58" cy="22" rx="6" ry="8" fill="currentColor"/><ellipse cx="70" cy="35" rx="7" ry="9" fill="currentColor"/></svg>`,
    dna: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M30 15 Q70 35 30 55 Q70 75 30 95" stroke="currentColor" stroke-width="3" fill="none"/><path d="M70 15 Q30 35 70 55 Q30 75 70 95" stroke="currentColor" stroke-width="3" fill="none"/><line x1="35" y1="25" x2="65" y2="25" stroke="currentColor" stroke-width="2"/><line x1="35" y1="45" x2="65" y2="45" stroke="currentColor" stroke-width="2"/><line x1="35" y1="65" x2="65" y2="65" stroke="currentColor" stroke-width="2"/><line x1="35" y1="85" x2="65" y2="85" stroke="currentColor" stroke-width="2"/></svg>`,
    heart: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M50 80 Q15 55 25 35 Q35 20 50 35 Q65 20 75 35 Q85 55 50 80 Z" fill="currentColor"/></svg>`,
    swords: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><line x1="20" y1="20" x2="75" y2="75" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><line x1="80" y1="20" x2="25" y2="75" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><circle cx="20" cy="20" r="6" fill="currentColor"/><circle cx="80" cy="20" r="6" fill="currentColor"/></svg>`,
    sparkle: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M50 15 L55 45 L85 50 L55 55 L50 85 L45 55 L15 50 L45 45 Z" fill="currentColor"/></svg>`,
    book: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="20" y="20" width="60" height="65" rx="3" fill="currentColor"/><rect x="22" y="22" width="56" height="61" fill="rgba(255,255,255,0.12)"/><line x1="50" y1="25" x2="50" y2="80" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><line x1="30" y1="35" x2="45" y2="35" stroke="rgba(0,0,0,0.5)" stroke-width="1.2"/><line x1="30" y1="45" x2="45" y2="45" stroke="rgba(0,0,0,0.5)" stroke-width="1.2"/><line x1="55" y1="35" x2="70" y2="35" stroke="rgba(0,0,0,0.5)" stroke-width="1.2"/><line x1="55" y1="45" x2="70" y2="45" stroke="rgba(0,0,0,0.5)" stroke-width="1.2"/></svg>`
  };

  // Big sprite (used in detail page infobox)
  function spriteLarge(kind, type, image, name) {
    const cls = `sprite ${esc(type || '')} sprite-lg`;
    if (image) return `<div class="${cls}"><img src="${esc(image)}" alt="${esc(name || '')}"></div>`;
    const map = { cat: SVG.cat, ability: SVG.orb, item: SVG.pouch, enemy: SVG.skull, location: SVG.landmark };
    return `<div class="${cls}">${map[kind] || SVG.orb}</div>`;
  }

  // Medium sprite (used in featured card on home)
  function spriteMedium(c) {
    if (c.image) return `<div class="sprite ${esc(c.type)} sprite-md"><img src="${esc(c.image)}" alt="${esc(c.name)}"></div>`;
    return `<div class="sprite ${esc(c.type)} sprite-md">${SVG.cat}</div>`;
  }

  // Tiny sprite (used in tables, chips)
  function spriteMini(c) {
    if (c.image) return `<span class="sprite-mini ${esc(c.type)}"><img src="${esc(c.image)}" alt=""></span>`;
    return `<span class="sprite-mini ${esc(c.type)}">${SVG.cat}</span>`;
  }

  /* -------------------- ad slot --------------------
     Inert until you fill in your AdSense publisher + slot
     IDs in index.html and uncomment the <ins> below.
  ----------------------------------------------------- */
  function adSlot(format) {
    const f = format || 'rectangle';

    const sizes = {
      banner: 'width:100%;height:100px;',
      rectangle: 'width:100%;height:280px;',
      'in-article': 'width:100%;height:300px;',
      'half-page': 'width:100%;height:600px;'
    };

    const styleSize = sizes[f] || sizes.rectangle;

    return `
      <aside class="ad-slot ad-${esc(f)}" aria-label="Advertisement">
        <span class="ad-label">Advertisement</span>
        <ins class="adsbygoogle"
          style="display:block;${styleSize}"
          data-ad-client="ca-pub-1319817671788428"
          data-ad-slot="YOUR_REAL_SLOT_ID"
          data-full-width-responsive="false"></ins>
      </aside>
    `;
  }
  function loadAds() {
    setTimeout(() => {
      document.querySelectorAll('.adsbygoogle').forEach(() => {
        try {
          (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.warn('AdSense load skipped:', e);
        }
      });
    }, 100);
  }

  function lookupCat(id)     { return byId(D.cats, id); }
  function lookupAbility(id) { return byId(D.abilities, id); }
  function lookupItem(id)    { return byId(D.items, id); }
  function lookupEnemy(id)   { return byId(D.enemies, id); }
  function lookupLocation(id){ return byId(D.locations, id); }
  function lookupStatus(id)  { return byId(D.statuses, id); }

  /* -------------------- left nav -------------------- */
  function renderLeftNav(activeRoute) {
    leftNav.innerHTML = `
      <h3>Game Basics</h3>
      <ul>
        <li><a href="/" data-r="/">Overview</a></li>
        <li><a href="/getting-started" data-r="/getting-started">Getting Started</a></li>
      </ul>
      <h3>Mechanics</h3>
      <ul>
        <li><a href="/cats" data-r="/cats">Cats</a></li>
        <li><a href="/genetics" data-r="/genetics">Genetics</a></li>
        <li><a href="/breeding" data-r="/breeding">Breeding</a></li>
        <li><a href="/combat" data-r="/combat">Combat</a></li>
        <li><a href="/abilities" data-r="/abilities">Abilities</a></li>
      </ul>
      <h3>Database</h3>
      <ul>
        <li><a href="/items" data-r="/items">Items</a></li>
        <li><a href="/enemies" data-r="/enemies">Enemies</a></li>
        <li><a href="/locations" data-r="/locations">Locations</a></li>
        <li><a href="/status" data-r="/status">Status Effects</a></li>
        <li><a href="/genes" data-r="/genes">Gene Index</a></li>
      </ul>
      <h3>Community</h3>
      <ul>
        <li><a href="/strategies" data-r="/strategies">Strategies</a></li>
        <li><a href="/patches" data-r="/patches">Patch Notes</a></li>
      </ul>
    `;
    leftNav.querySelectorAll('a').forEach((a) => {
      const r = a.getAttribute('data-r');
      if (activeRoute === r || (activeRoute.startsWith(r + '/') && r !== '/')) a.classList.add('active');
      if (r === '/' && activeRoute === '/') a.classList.add('active');
    });
  }

  /* -------------------- right nav -------------------- */
  function renderRightNav(route) {
    let extra = '';
    if (route.startsWith('/cats/')) {
      extra = `<h3>This Cat</h3><ul>
        <li><a href="/cats">Back to Cats</a></li>
        <li><a href="/genetics">How genes work</a></li>
        <li><a href="/breeding">Breeding rules</a></li>
      </ul>`;
    } else if (route.startsWith('/abilities')) {
      extra = `<h3>Related</h3><ul>
        <li><a href="/combat">Combat overview</a></li>
        <li><a href="/status">Status effects</a></li>
      </ul>`;
    } else if (route.startsWith('/items')) {
      extra = `<h3>Related</h3><ul>
        <li><a href="/locations">Where loot drops</a></li>
        <li><a href="/strategies">Build guides</a></li>
      </ul>`;
    }
    rightNav.innerHTML = `
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/cats">All cats</a></li>
        <li><a href="/abilities">All abilities</a></li>
        <li><a href="/items">All items</a></li>
        <li><a href="/enemies">Bestiary</a></li>
        <li><a href="/strategies">Strategies</a></li>
      </ul>
      ${extra}
      <h3>Did you know?</h3>
      <p class="qd">Recessive genes only express when both alleles are lowercase. Want a rare trait? Inbreed carefully.</p>
      <h3>Contribute</h3>
      <p class="qd">
      Found incorrect information or want to improve the wiki?
      Visit the GitHub repository and submit a pull request.
      </p>
      <a href="https://github.com/guo1340/mewgenics-wiki.git">GitHub repository</a>
      ${adSlot('rectangle')}
    `;
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  function parseRoute() { return location.pathname || '/'; }

  function navigate() {
    const route = parseRoute();
    renderLeftNav(route);
    renderRightNav(route);

    if (route === '/' || route === '') renderHome();
    else if (route === '/getting-started') renderStaticPage('getting-started');
    else if (route === '/genetics') renderStaticPage('genetics');
    else if (route === '/breeding') renderStaticPage('breeding');
    else if (route === '/combat') renderStaticPage('combat');
    else if (route === '/cats') renderCatsList();
    else if (route === '/abilities') renderAbilitiesList();
    else if (route === '/items') renderItemsList();
    else if (route === '/enemies') renderEnemiesList();
    else if (route === '/locations') renderLocationsList();
    else if (route === '/status') renderStatusList();
    else if (route === '/genes') renderGenesList();
    else if (route === '/strategies') renderStrategiesList();
    else if (route === '/patches') renderPatches();
    else if (route === '/about') renderInfoPage('about');
    else if (route === '/privacy-policy') renderInfoPage('privacy-policy');
    else if (route === '/contact') renderInfoPage('contact');
    else if (route.startsWith('/cats/')) renderCatDetail(route.slice(6));
    else if (route.startsWith('/abilities/')) renderAbilityDetail(route.slice(11));
    else if (route.startsWith('/items/')) renderItemDetail(route.slice(7));
    else if (route.startsWith('/enemies/')) renderEnemyDetail(route.slice(9));
    else if (route.startsWith('/locations/')) renderLocationDetail(route.slice(11));
    else if (route.startsWith('/strategies/')) renderStrategyDetail(route.slice(12));
    else render404(route);

    loadAds();
  }

  /* ============================================================
     HOME
     ============================================================ */
  function renderHome() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="hero">
        <h1>Welcome to the Mewgenics Wiki</h1>
        <p>Your unofficial community guide to the turn-based tactics + cat-breeding roguelite. Browse mechanics, hunt down rare genes, and plan your next litter of murder-cats.</p>
        <div class="meta">
          <span><strong>Genre:</strong> Tactics / Roguelite</span>
          <span><strong>Players:</strong> 1</span>
          <span><strong>Last patch:</strong> ${esc(D.patches[0].version)} · ${esc(D.patches[0].date)}</span>
        </div>
      </div>

      <h3>Jump in</h3>
      <div class="cards">
        <a class="card" href="/getting-started"><div class="icon">${SVG.paw}</div><h4>Getting Started</h4><p>Your first run, in plain English.</p></a>
        <a class="card" href="/cats"><div class="icon">${SVG.cat}</div><h4>Cats Database</h4><p>${D.cats.length} entries with stats and abilities.</p></a>
        <a class="card" href="/genetics"><div class="icon">${SVG.dna}</div><h4>Genetics</h4><p>How genes pass, mutate, and stack.</p></a>
        <a class="card" href="/breeding"><div class="icon">${SVG.heart}</div><h4>Breeding</h4><p>Pairings, litters, and inheritance.</p></a>
        <a class="card" href="/combat"><div class="icon">${SVG.swords}</div><h4>Combat</h4><p>AP, positioning, status, matchups.</p></a>
        <a class="card" href="/abilities"><div class="icon">${SVG.sparkle}</div><h4>Abilities</h4><p>${D.abilities.length} attacks &amp; spells.</p></a>
        <a class="card" href="/items"><div class="icon">${SVG.pouch}</div><h4>Items</h4><p>${D.items.length} pieces of gear &amp; treats.</p></a>
        <a class="card" href="/enemies"><div class="icon">${SVG.skull}</div><h4>Bestiary</h4><p>${D.enemies.length} enemies &amp; their tactics.</p></a>
        <a class="card" href="/strategies"><div class="icon">${SVG.book}</div><h4>Strategies</h4><p>Builds &amp; comp ideas.</p></a>
      </div>

      ${adSlot('in-article')}

      <div class="page">
        <h2>Featured</h2>
        <div class="breadcrumb">Hand-picked starting points.</div>
        <h3>Featured cat</h3>
        ${renderCatCardInline(lookupCat('midnight'))}
        <h3>Latest patch — ${esc(D.patches[0].version)}</h3>
        <div class="patch">
          <div class="patch-meta"><span class="ver">${esc(D.patches[0].version)}</span><span>${esc(D.patches[0].date)}</span></div>
          <ul>${D.patches[0].changes.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        </div>
        <p><a href="/patches">View full patch history →</a></p>
      </div>
    `;
  }

  function renderCatCardInline(c) {
    if (!c) return '';
    return `
      <a class="card" href="/cats/${esc(c.id)}" style="display:flex;gap:14px;align-items:center;">
        ${spriteMedium(c)}
        <div style="flex:1;min-width:0;">
          <h4>${esc(c.name)} ${tag(c.rarity, c.rarity)}</h4>
          <p>${esc(c.lore)}</p>
        </div>
      </a>
    `;
  }

  /* ============================================================
     STATIC PAGES
     ============================================================ */
  function renderStaticPage(slug) {
    const p = D.pages[slug];
    if (!p) return render404(slug);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>${esc(p.title)}</h1>
        <div class="breadcrumb">Home / ${esc(p.title)}</div>
        ${p.body}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     CATS
     ============================================================ */
  function renderCatsList() {
    const stateKey = 'cats-filters';
    const state = loadState(stateKey, { type: 'all', rarity: 'all', search: '', sort: 'name', dir: 'asc' });

    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Cats</h1>
        <div class="breadcrumb">Home / Cats</div>
        <p>Each cat has a unique combination of base stats, traits, and inherited genes. Click any name for full detail.</p>

        <div class="toolbar" id="catsToolbar">
          <div class="filter-group">
            <span class="filter-label">Type</span>
            ${['all','fire','water','earth','dark','light','air'].map(t => `<button data-f="type" data-v="${t}">${titleCase(t)}</button>`).join('')}
          </div>
          <div class="filter-group">
            <span class="filter-label">Rarity</span>
            ${['all','common','uncommon','rare','epic','legendary'].map(t => `<button data-f="rarity" data-v="${t}">${titleCase(t)}</button>`).join('')}
          </div>
          <input type="text" class="filter-search" placeholder="Filter by name…" value="${esc(state.search)}" data-f="search">
          <span class="result-count" id="resultCount"></span>
        </div>

        <table class="data">
          <thead>
            <tr>
              <th class="sortable" data-sort="name">Name <span class="sort-arrow">↕</span></th>
              <th class="sortable" data-sort="type">Type</th>
              <th class="sortable" data-sort="rarity">Rarity</th>
              <th class="sortable num" data-sort="hp">HP</th>
              <th class="sortable num" data-sort="speed">Speed</th>
              <th class="sortable num" data-sort="attack">ATK</th>
              <th class="sortable num" data-sort="magic">MAG</th>
              <th>Traits</th>
            </tr>
          </thead>
          <tbody id="catsBody"></tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;

    function applyAndRender() {
      saveState(stateKey, state);
      let rows = D.cats.slice();
      if (state.type !== 'all')   rows = rows.filter(c => c.type === state.type);
      if (state.rarity !== 'all') rows = rows.filter(c => c.rarity === state.rarity);
      if (state.search) {
        const q = state.search.toLowerCase();
        rows = rows.filter(c =>
          c.name.toLowerCase().includes(q) ||
          (c.traits || []).some(t => t.toLowerCase().includes(q))
        );
      }
      rows.sort((a, b) => {
        let va, vb;
        switch (state.sort) {
          case 'name':   va = a.name; vb = b.name; break;
          case 'type':   va = a.type; vb = b.type; break;
          case 'rarity': va = rarityRank(a.rarity); vb = rarityRank(b.rarity); break;
          case 'hp':     va = a.hp; vb = b.hp; break;
          case 'speed':  va = a.speed; vb = b.speed; break;
          case 'attack': va = a.stats.attack; vb = b.stats.attack; break;
          case 'magic':  va = a.stats.magic; vb = b.stats.magic; break;
        }
        if (va < vb) return state.dir === 'asc' ? -1 : 1;
        if (va > vb) return state.dir === 'asc' ? 1 : -1;
        return 0;
      });

      $('#catsBody').innerHTML = rows.length === 0
        ? `<tr><td colspan="8"><div class="empty-result">No cats match those filters.</div></td></tr>`
        : rows.map(c => `
          <tr>
            <td><a href="/cats/${esc(c.id)}" class="row-link">${spriteMini(c)} ${esc(c.name)}</a></td>
            <td>${tag(c.type, c.type)}</td>
            <td>${tag(c.rarity, c.rarity)}</td>
            <td class="num">${c.hp}</td>
            <td class="num">${c.speed}</td>
            <td class="num">${c.stats.attack}</td>
            <td class="num">${c.stats.magic}</td>
            <td>${(c.traits || []).map(t => tag(t)).join(' ')}</td>
          </tr>
        `).join('');

      $('#resultCount').textContent = `${rows.length} of ${D.cats.length}`;
      document.querySelectorAll('#catsToolbar [data-f="type"]').forEach(b => b.classList.toggle('active', b.dataset.v === state.type));
      document.querySelectorAll('#catsToolbar [data-f="rarity"]').forEach(b => b.classList.toggle('active', b.dataset.v === state.rarity));
      document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.toggle('sorted', th.dataset.sort === state.sort);
        const arr = th.querySelector('.sort-arrow');
        if (arr) arr.textContent = th.dataset.sort === state.sort ? (state.dir === 'asc' ? '↑' : '↓') : '↕';
      });
    }

    document.querySelectorAll('#catsToolbar [data-f="type"]').forEach(b => {
      b.onclick = () => { state.type = b.dataset.v; applyAndRender(); };
    });
    document.querySelectorAll('#catsToolbar [data-f="rarity"]').forEach(b => {
      b.onclick = () => { state.rarity = b.dataset.v; applyAndRender(); };
    });
    const si = $('#catsToolbar input.filter-search');
    si.oninput = () => { state.search = si.value; applyAndRender(); };
    document.querySelectorAll('th.sortable').forEach(th => {
      th.onclick = () => {
        if (state.sort === th.dataset.sort) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
        else { state.sort = th.dataset.sort; state.dir = 'asc'; }
        applyAndRender();
      };
    });

    applyAndRender();
  }

  function rarityRank(r) {
    return ({ common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 })[r] || 0;
  }

  function renderCatDetail(id) {
    const c = lookupCat(id);
    if (!c) return render404(id);
    const maxStat = 100;
    const statBar = (label, val) => `
      <div class="stat-bar">
        <div class="label">${esc(label)}</div>
        <div class="bar"><div style="width:${Math.min(100, (val / maxStat) * 100)}%"></div></div>
        <div class="val">${val}</div>
      </div>`;

    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/cats">Cats</a> / ${esc(c.name)}</div>
        <div class="detail-grid">
          <div>
            <h1>${esc(c.name)} ${tag(c.rarity, c.rarity)}</h1>
            <p class="lore">${esc(c.lore)}</p>
            <h3>Stats</h3>
            <div class="stats">
              ${statBar('Attack',  c.stats.attack)}
              ${statBar('Defense', c.stats.defense)}
              ${statBar('Magic',   c.stats.magic)}
              ${statBar('Speed',   c.stats.speed)}
              ${statBar('Luck',    c.stats.luck)}
            </div>
            <h3>Abilities</h3>
            <div class="chip-list">
              ${(c.abilities || []).map(aid => {
                const a = lookupAbility(aid);
                return a ? `<a class="chip" href="/abilities/${esc(a.id)}">${esc(a.name)} ${tag(a.type, a.type)}</a>` : '';
              }).join('')}
            </div>
            <h3>Traits</h3>
            <div class="chip-list">${(c.traits || []).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
            <h3>Genes</h3>
            <p>${(c.genes || []).map(g => `<code>${esc(g)}</code>`).join(' · ')}</p>
            <p style="color:var(--muted);font-size:13px;">See <a href="/genetics">Genetics</a> for how to read these.</p>
            <h3>Suggested role</h3>
            <p>${esc(c.role)}</p>
          </div>
          <div class="infobox">
            ${spriteLarge('cat', c.type, c.image, c.name)}
            <h4>${esc(c.name)}</h4>
            <dl>
              <dt>Type</dt><dd>${tag(c.type, c.type)}</dd>
              <dt>Rarity</dt><dd>${tag(c.rarity, c.rarity)}</dd>
              <dt>Sex</dt><dd>${esc(c.sex)}</dd>
              <dt>HP</dt><dd>${c.hp}</dd>
              <dt>Speed</dt><dd>${c.speed}</dd>
              <dt>Genes</dt><dd>${(c.genes || []).map(g => `<code>${esc(g)}</code>`).join(' ')}</dd>
              <dt>Traits</dt><dd>${(c.traits || []).map(t => tag(t)).join(' ')}</dd>
            </dl>
          </div>
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     ABILITIES
     ============================================================ */
  function renderAbilitiesList() {
    const stateKey = 'abilities-filters';
    const state = loadState(stateKey, { type: 'all', search: '', sort: 'name', dir: 'asc' });

    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Abilities</h1>
        <div class="breadcrumb">Home / Abilities</div>
        <p>All ${D.abilities.length} player-castable abilities. Click any name for synergy notes.</p>

        <div class="toolbar" id="abilTb">
          <div class="filter-group">
            <span class="filter-label">Type</span>
            ${['all','fire','water','earth','dark','light','air','physical'].map(t => `<button data-f="type" data-v="${t}">${titleCase(t)}</button>`).join('')}
          </div>
          <input type="text" class="filter-search" placeholder="Filter by name…" data-f="search" value="${esc(state.search)}">
          <span class="result-count" id="abilCount"></span>
        </div>

        <table class="data">
          <thead><tr>
            <th class="sortable" data-sort="name">Name</th>
            <th class="sortable" data-sort="type">Type</th>
            <th class="sortable num" data-sort="cost">AP</th>
            <th class="sortable num" data-sort="range">Range</th>
            <th class="sortable num" data-sort="damage">Damage</th>
            <th>Effects</th>
          </tr></thead>
          <tbody id="abilBody"></tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;

    function applyAndRender() {
      saveState(stateKey, state);
      let rows = D.abilities.slice();
      if (state.type !== 'all') rows = rows.filter(a => a.type === state.type);
      if (state.search) {
        const q = state.search.toLowerCase();
        rows = rows.filter(a => a.name.toLowerCase().includes(q));
      }
      rows.sort((a, b) => {
        let va = a[state.sort], vb = b[state.sort];
        if (va < vb) return state.dir === 'asc' ? -1 : 1;
        if (va > vb) return state.dir === 'asc' ? 1 : -1;
        return 0;
      });

      $('#abilBody').innerHTML = rows.length === 0
        ? `<tr><td colspan="6"><div class="empty-result">No abilities match.</div></td></tr>`
        : rows.map(a => `
          <tr>
            <td><a href="/abilities/${esc(a.id)}" class="row-link">${esc(a.name)}</a></td>
            <td>${tag(a.type, a.type)}</td>
            <td class="num">${a.cost}</td>
            <td class="num">${a.range}</td>
            <td class="num">${a.damage || '—'}</td>
            <td>${(a.effects || []).map(e => {
              const s = lookupStatus(e);
              return s ? `<a href="/status">${tag(s.name)}</a>` : tag(e);
            }).join(' ')}</td>
          </tr>
        `).join('');

      $('#abilCount').textContent = `${rows.length} of ${D.abilities.length}`;
      document.querySelectorAll('#abilTb [data-f="type"]').forEach(b => b.classList.toggle('active', b.dataset.v === state.type));
      document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.toggle('sorted', th.dataset.sort === state.sort);
        const arr = th.querySelector('.sort-arrow');
        if (arr) arr.textContent = th.dataset.sort === state.sort ? (state.dir === 'asc' ? '↑' : '↓') : '↕';
      });
    }

    document.querySelectorAll('#abilTb [data-f="type"]').forEach(b => b.onclick = () => { state.type = b.dataset.v; applyAndRender(); });
    const si = $('#abilTb input.filter-search');
    si.oninput = () => { state.search = si.value; applyAndRender(); };
    document.querySelectorAll('th.sortable').forEach(th => {
      th.onclick = () => {
        if (state.sort === th.dataset.sort) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
        else { state.sort = th.dataset.sort; state.dir = 'asc'; }
        applyAndRender();
      };
    });
    applyAndRender();
  }

  function renderAbilityDetail(id) {
    const a = lookupAbility(id);
    if (!a) return render404(id);
    const usedBy = D.cats.filter(c => (c.abilities || []).includes(id));
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/abilities">Abilities</a> / ${esc(a.name)}</div>
        <div class="detail-grid">
          <div>
            <h1>${esc(a.name)} ${tag(a.type, a.type)}</h1>
            <p>${esc(a.description)}</p>
            ${a.tip ? `<div class="callout tip"><strong>Tip:</strong> ${esc(a.tip)}</div>` : ''}
            <h3>Used by</h3>
            <div class="chip-list">
              ${usedBy.length ? usedBy.map(c => `<a class="chip" href="/cats/${esc(c.id)}">${spriteMini(c)} ${esc(c.name)}</a>`).join('')
                              : '<span class="qd">No cats start with this ability.</span>'}
            </div>
            <h3>Applied effects</h3>
            <div class="chip-list">
              ${(a.effects || []).length
                ? (a.effects || []).map(e => {
                    const s = lookupStatus(e);
                    return s ? `<a class="chip" href="/status">${esc(s.name)}</a>` : `<span class="chip">${esc(e)}</span>`;
                  }).join('')
                : '<span class="qd">None.</span>'}
            </div>
          </div>
          <div class="infobox">
            ${spriteLarge('ability', a.type, a.image, a.name)}
            <h4>${esc(a.name)}</h4>
            <dl>
              <dt>Type</dt><dd>${tag(a.type, a.type)}</dd>
              <dt>AP cost</dt><dd>${a.cost}</dd>
              <dt>Range</dt><dd>${a.range || 'Self'}</dd>
              <dt>Damage</dt><dd>${a.damage || '—'}</dd>
              <dt>Effects</dt><dd>${(a.effects || []).map(e => tag(e)).join(' ') || '—'}</dd>
            </dl>
          </div>
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     ITEMS
     ============================================================ */
  function renderItemsList() {
    const stateKey = 'items-filters';
    const state = loadState(stateKey, { slot: 'all', rarity: 'all', search: '', sort: 'name', dir: 'asc' });

    const slots = ['all', ...new Set(D.items.map(i => i.slot))];

    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Items</h1>
        <div class="breadcrumb">Home / Items</div>
        <p>Equipment, treats, and rare relics. Click any item for full effect details.</p>

        <div class="toolbar" id="itemsTb">
          <div class="filter-group">
            <span class="filter-label">Slot</span>
            ${slots.map(s => `<button data-f="slot" data-v="${s}">${titleCase(s)}</button>`).join('')}
          </div>
          <div class="filter-group">
            <span class="filter-label">Rarity</span>
            ${['all','common','uncommon','rare','epic','legendary'].map(t => `<button data-f="rarity" data-v="${t}">${titleCase(t)}</button>`).join('')}
          </div>
          <input type="text" class="filter-search" placeholder="Filter by name…" data-f="search" value="${esc(state.search)}">
          <span class="result-count" id="itemsCount"></span>
        </div>

        <table class="data">
          <thead><tr>
            <th class="sortable" data-sort="name">Name</th>
            <th class="sortable" data-sort="slot">Slot</th>
            <th class="sortable" data-sort="rarity">Rarity</th>
            <th>Effects</th>
          </tr></thead>
          <tbody id="itemsBody"></tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;

    function applyAndRender() {
      saveState(stateKey, state);
      let rows = D.items.slice();
      if (state.slot !== 'all')   rows = rows.filter(i => i.slot === state.slot);
      if (state.rarity !== 'all') rows = rows.filter(i => i.rarity === state.rarity);
      if (state.search) {
        const q = state.search.toLowerCase();
        rows = rows.filter(i => i.name.toLowerCase().includes(q));
      }
      rows.sort((a, b) => {
        let va, vb;
        if (state.sort === 'rarity') { va = rarityRank(a.rarity); vb = rarityRank(b.rarity); }
        else { va = a[state.sort]; vb = b[state.sort]; }
        if (va < vb) return state.dir === 'asc' ? -1 : 1;
        if (va > vb) return state.dir === 'asc' ? 1 : -1;
        return 0;
      });

      $('#itemsBody').innerHTML = rows.length === 0
        ? `<tr><td colspan="4"><div class="empty-result">No items match.</div></td></tr>`
        : rows.map(i => `
          <tr>
            <td><a href="/items/${esc(i.id)}" class="row-link">${esc(i.name)}</a></td>
            <td>${tag(i.slot)}</td>
            <td>${tag(i.rarity, i.rarity)}</td>
            <td>${(i.effects || []).map(e => `<span class="chip">${esc(e)}</span>`).join(' ')}</td>
          </tr>
        `).join('');

      $('#itemsCount').textContent = `${rows.length} of ${D.items.length}`;
      document.querySelectorAll('#itemsTb [data-f="slot"]').forEach(b => b.classList.toggle('active', b.dataset.v === state.slot));
      document.querySelectorAll('#itemsTb [data-f="rarity"]').forEach(b => b.classList.toggle('active', b.dataset.v === state.rarity));
      document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.toggle('sorted', th.dataset.sort === state.sort);
        const arr = th.querySelector('.sort-arrow');
        if (arr) arr.textContent = th.dataset.sort === state.sort ? (state.dir === 'asc' ? '↑' : '↓') : '↕';
      });
    }

    document.querySelectorAll('#itemsTb [data-f="slot"]').forEach(b => b.onclick = () => { state.slot = b.dataset.v; applyAndRender(); });
    document.querySelectorAll('#itemsTb [data-f="rarity"]').forEach(b => b.onclick = () => { state.rarity = b.dataset.v; applyAndRender(); });
    const si = $('#itemsTb input.filter-search');
    si.oninput = () => { state.search = si.value; applyAndRender(); };
    document.querySelectorAll('th.sortable').forEach(th => {
      th.onclick = () => {
        if (state.sort === th.dataset.sort) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
        else { state.sort = th.dataset.sort; state.dir = 'asc'; }
        applyAndRender();
      };
    });
    applyAndRender();
  }

  function renderItemDetail(id) {
    const i = lookupItem(id);
    if (!i) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/items">Items</a> / ${esc(i.name)}</div>
        <div class="detail-grid">
          <div>
            <h1>${esc(i.name)} ${tag(i.rarity, i.rarity)}</h1>
            <p class="lore">${esc(i.description)}</p>
            <h3>Effects</h3>
            <ul>${(i.effects || []).map(e => `<li>${esc(e)}</li>`).join('')}</ul>
            <h3>Where to find</h3>
            <p>${esc(i.drop || 'Unknown')}</p>
          </div>
          <div class="infobox">
            ${spriteLarge('item', i.rarity, i.image, i.name)}
            <h4>${esc(i.name)}</h4>
            <dl>
              <dt>Slot</dt><dd>${tag(i.slot)}</dd>
              <dt>Rarity</dt><dd>${tag(i.rarity, i.rarity)}</dd>
              <dt>Drop</dt><dd>${esc(i.drop || '—')}</dd>
            </dl>
          </div>
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     ENEMIES
     ============================================================ */
  function renderEnemiesList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Bestiary</h1>
        <div class="breadcrumb">Home / Enemies</div>
        <p>Hover or click any enemy for stats and tactical notes.</p>
        <table class="data">
          <thead><tr>
            <th>Enemy</th><th>Type</th><th class="num">HP</th><th class="num">Speed</th><th>Threat</th><th>Found in</th>
          </tr></thead>
          <tbody>
            ${D.enemies.map(e => `
              <tr>
                <td><a href="/enemies/${esc(e.id)}" class="row-link">${esc(e.name)}</a></td>
                <td>${tag(e.type, e.type)}</td>
                <td class="num">${e.hp}</td>
                <td class="num">${e.speed}</td>
                <td>${tag(e.threat, e.threat === 'boss' ? 'legendary' : (e.threat === 'high' ? 'epic' : (e.threat === 'medium' ? 'uncommon' : 'common')))}</td>
                <td>${(e.locations || []).map(l => {
                  const loc = lookupLocation(l);
                  return loc ? `<a href="/locations/${esc(loc.id)}">${esc(loc.name)}</a>` : esc(l);
                }).join(', ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderEnemyDetail(id) {
    const e = lookupEnemy(id);
    if (!e) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/enemies">Enemies</a> / ${esc(e.name)}</div>
        <div class="detail-grid">
          <div>
            <h1>${esc(e.name)} ${tag(e.threat, e.threat === 'boss' ? 'legendary' : '')}</h1>
            <p class="lore">${esc(e.tactics)}</p>
            <h3>Attacks</h3>
            <ul>${(e.attacks || []).map(a => `<li>${esc(a)}</li>`).join('')}</ul>
            <h3>Drops</h3>
            <ul>${(e.drops || []).map(d => `<li>${esc(d)}</li>`).join('')}</ul>
            <h3>Found in</h3>
            <div class="chip-list">
              ${(e.locations || []).map(l => {
                const loc = lookupLocation(l);
                return loc ? `<a class="chip" href="/locations/${esc(loc.id)}">${esc(loc.name)}</a>` : '';
              }).join('')}
            </div>
          </div>
          <div class="infobox">
            ${spriteLarge('enemy', e.type, e.image, e.name)}
            <h4>${esc(e.name)}</h4>
            <dl>
              <dt>Type</dt><dd>${tag(e.type, e.type)}</dd>
              <dt>HP</dt><dd>${e.hp}</dd>
              <dt>Speed</dt><dd>${e.speed}</dd>
              <dt>Threat</dt><dd>${tag(e.threat)}</dd>
            </dl>
          </div>
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     LOCATIONS
     ============================================================ */
  function renderLocationsList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Locations</h1>
        <div class="breadcrumb">Home / Locations</div>
        <p>The world is divided into biomes. Each has its own enemy mix, treats, and difficulty curve.</p>
        <div class="cards">
          ${D.locations.map(l => `
            <a class="card" href="/locations/${esc(l.id)}">
              <h4>${esc(l.name)} ${tag(l.tier, l.tier === 'high' ? 'epic' : (l.tier === 'mid' ? 'rare' : (l.tier === 'low' ? 'uncommon' : 'common')))}</h4>
              <p>${esc(l.description.slice(0, 100))}…</p>
            </a>
          `).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderLocationDetail(id) {
    const l = lookupLocation(id);
    if (!l) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/locations">Locations</a> / ${esc(l.name)}</div>
        <h1>${esc(l.name)} ${tag(l.tier)}</h1>
        <p>${esc(l.description)}</p>
        <div class="callout tip"><strong>Tip:</strong> ${esc(l.tips)}</div>
        <h3>Enemies</h3>
        <div class="chip-list">
          ${(l.enemies || []).map(eid => {
            const en = lookupEnemy(eid);
            return en ? `<a class="chip" href="/enemies/${esc(en.id)}">${esc(en.name)} ${tag(en.threat)}</a>` : '';
          }).join('')}
        </div>
        <h3>Notable drops</h3>
        <ul>${(l.drops || []).map(d => `<li>${esc(d)}</li>`).join('')}</ul>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     STATUS / GENES / STRATEGIES / PATCHES
     ============================================================ */
  function renderStatusList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Status Effects</h1>
        <div class="breadcrumb">Home / Status Effects</div>
        <p>All status effects in combat. Sourced from abilities, items, and enemies.</p>
        <table class="data">
          <thead><tr>
            <th>Effect</th><th>Type</th><th>Source</th><th class="num">Duration</th><th>What it does</th>
          </tr></thead>
          <tbody>
            ${D.statuses.map(s => `
              <tr>
                <td><strong>${esc(s.name)}</strong></td>
                <td>${tag(s.type, s.type)}</td>
                <td>${esc(s.source)}</td>
                <td class="num">${s.duration === 999 ? '∞' : s.duration === 0 ? 'Instant' : s.duration + ' turns'}</td>
                <td>${esc(s.effect)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderGenesList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Gene Index</h1>
        <div class="breadcrumb">Home / Genes</div>
        <p>Every gene tracked by the breeding system. See <a href="/genetics">Genetics</a> for inheritance rules and <a href="/breeding">Breeding</a> for how to combine them.</p>
        <table class="data">
          <thead><tr>
            <th>Gene</th><th>Dominant</th><th>Recessive</th><th>Effect</th>
          </tr></thead>
          <tbody>
            ${D.genes.map(g => `
              <tr>
                <td><strong>${esc(g.name)}</strong></td>
                <td>${esc(g.dominant)}</td>
                <td>${esc(g.recessive)}</td>
                <td>${esc(g.effect)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderStrategiesList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Strategies &amp; Builds</h1>
        <div class="breadcrumb">Home / Strategies</div>
        <p>Community-curated team comps and tactics. To submit one, edit <code>js/data.js</code> and open a PR.</p>
        <div class="cards">
          ${D.strategies.map(s => `
            <a class="card" href="/strategies/${esc(s.id)}">
              <h4>${esc(s.title)}</h4>
              <p>${esc(s.summary)}</p>
              <div style="margin-top:8px;">${(s.tags || []).map(t => tag(t)).join(' ')}</div>
            </a>
          `).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderStrategyDetail(id) {
    const s = (D.strategies || []).find(x => x.id === id);
    if (!s) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/strategies">Strategies</a> / ${esc(s.title)}</div>
        <h1>${esc(s.title)}</h1>
        <p style="color:var(--muted);">By ${esc(s.author)} · ${(s.tags || []).map(t => tag(t)).join(' ')}</p>
        <p><strong>${esc(s.summary)}</strong></p>
        <p>${esc(s.body)}</p>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderPatches() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Patch Notes</h1>
        <div class="breadcrumb">Home / Patch Notes</div>
        <p style="color:var(--muted);font-size:13px;">Most recent first.</p>
        ${D.patches.map(p => `
          <div class="patch">
            <div class="patch-meta"><span class="ver">${esc(p.version)}</span><span>${esc(p.date)}</span></div>
            <ul>${p.changes.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
      ${adSlot('in-article')}
    `;
  }


  function renderInfoPage(slug) {
    const pages = {
      'about': {
        title: 'About GameWikiHub Mewgenics Wiki',
        crumb: 'About',
        body: `
          <p><strong>GameWikiHub Mewgenics Wiki</strong> is an unofficial fan-made guide for players who want quick access to Mewgenics mechanics, cat data, genes, abilities, items, enemies, locations, patch notes, and strategies.</p>
          <p>This site is built and maintained as a static community resource. It is not affiliated with, endorsed by, or sponsored by the creators, publishers, or rights holders of Mewgenics.</p>
          <h3>Purpose</h3>
          <p>The goal of this wiki is to organize gameplay information in a clean, fast, and searchable format so players can learn mechanics, compare entries, and plan builds more easily.</p>
          <h3>Content accuracy</h3>
          <p>Game information can change across updates. Patch changes, balance updates, and community discoveries may make older pages incomplete. Use the Contact page to report corrections or suggest improvements.</p>
          <h3>Advertising</h3>
          <p>This site may display advertising to help cover hosting, domain, maintenance, and content-production costs. Ads should be placed in a way that does not block core wiki content.</p>
        `
      },
      'privacy-policy': {
        title: 'Privacy Policy',
        crumb: 'Privacy Policy',
        body: `
          <p><strong>Effective date:</strong> May 8, 2026</p>
          <p>This Privacy Policy explains how GameWikiHub Mewgenics Wiki handles basic information when you visit this website.</p>
          <h3>Information we collect</h3>
          <p>This site is a static wiki and does not require user accounts. We do not intentionally collect names, passwords, payment information, or private account details from visitors.</p>
          <p>Basic technical information may be processed automatically by hosting, security, analytics, and advertising providers. This can include IP address, browser type, device type, pages visited, referring pages, approximate location, and timestamps.</p>
          <h3>Cookies and local storage</h3>
          <p>The site may use browser storage such as <code>localStorage</code> to remember interface preferences, such as table filters. Third-party services such as analytics or advertising providers may use cookies or similar technologies according to their own policies.</p>
          <h3>Analytics</h3>
          <p>We may use analytics tools to understand site traffic, popular pages, search behavior, and technical issues. Analytics data is used to improve the site and prioritize wiki content.</p>
          <h3>Advertising</h3>
          <p>This site may use Google AdSense or other advertising providers. Advertising partners may use cookies or similar technologies to serve ads, measure ad performance, prevent fraud, and personalize or limit advertising depending on user settings and applicable law.</p>
          <p>You can learn more about how Google uses information from sites and apps that use its services by visiting Google's privacy and advertising documentation.</p>
          <h3>Third-party links</h3>
          <p>This wiki may link to external websites, stores, social platforms, developer posts, or community resources. We are not responsible for the privacy practices or content of third-party websites.</p>
          <h3>Children's privacy</h3>
          <p>This site is intended as a general game-information resource. It is not designed to knowingly collect personal information from children.</p>
          <h3>Changes to this policy</h3>
          <p>We may update this Privacy Policy as the site grows, especially when new analytics, advertising, contact, or community features are added.</p>
          <h3>Contact</h3>
          <p>Questions about this policy can be sent through the <a href="/contact">Contact page</a>.</p>
        `
      },
      'contact': {
        title: 'Contact',
        crumb: 'Contact',
        body: `
          <p>Use this page to report incorrect wiki information, request removals, suggest new pages, or ask questions about GameWikiHub Mewgenics Wiki.</p>
          <h3>Email</h3>
          <p><a href="mailto:contact@gamewikihub.com">contact@gamewikihub.com</a></p>
          <h3>What to include</h3>
          <ul>
            <li>The page or entry name you are referring to.</li>
            <li>What information is wrong, missing, or outdated.</li>
            <li>A source, screenshot, patch note, or clear explanation when available.</li>
          </ul>
          <h3>Unofficial site notice</h3>
          <p>This is an unofficial fan wiki. For official support, purchasing issues, bug reports, or account problems, contact the official game developer or platform support channel.</p>
        `
      }
    };
    const p = pages[slug];
    if (!p) return render404(slug);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page legal-page">
        <h1>${p.title}</h1>
        <div class="breadcrumb">Home / ${p.crumb}</div>
        ${p.body}
      </div>
    `;
  }

  function render404(slug) {
    main.innerHTML = `
      <div class="page">
        <h1>Not found</h1>
        <p>No wiki entry for <code>${esc(slug)}</code>.</p>
        <p><a href="/">← Back to home</a></p>
      </div>
    `;
  }

  /* ============================================================
     SEARCH (across all entities)
     ============================================================ */
  function buildSearchIndex() {
    const index = [];
    D.cats.forEach(c       => index.push({ title: c.name, sub: 'Cat',      href: '/cats/' + c.id }));
    D.abilities.forEach(a  => index.push({ title: a.name, sub: 'Ability',  href: '/abilities/' + a.id }));
    D.items.forEach(i      => index.push({ title: i.name, sub: 'Item',     href: '/items/' + i.id }));
    D.enemies.forEach(e    => index.push({ title: e.name, sub: 'Enemy',    href: '/enemies/' + e.id }));
    D.locations.forEach(l  => index.push({ title: l.name, sub: 'Location', href: '/locations/' + l.id }));
    D.statuses.forEach(s   => index.push({ title: s.name, sub: 'Status',   href: '/status' }));
    D.genes.forEach(g      => index.push({ title: g.name, sub: 'Gene',     href: '/genes' }));
    D.strategies.forEach(s => index.push({ title: s.title, sub: 'Strategy', href: '/strategies/' + s.id }));
    D.patches.forEach(p    => index.push({ title: 'Patch ' + p.version, sub: 'Patch', href: '/patches' }));
    Object.entries(D.pages).forEach(([k, v]) => index.push({ title: v.title, sub: 'Page', href: '/' + k }));
    index.push({ title: 'About GameWikiHub Mewgenics Wiki', sub: 'Site Info', href: '/about' });
    index.push({ title: 'Privacy Policy', sub: 'Site Info', href: '/privacy-policy' });
    index.push({ title: 'Contact', sub: 'Site Info', href: '/contact' });
    return index;
  }

  const searchIndex = buildSearchIndex();

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('/') &&
      !href.startsWith('//') &&
      !a.hasAttribute('download') &&
      a.target !== '_blank'
    ) {
      e.preventDefault();
      history.pushState({}, '', href);
      leftNav.classList.remove('open');
      navigate();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('popstate', navigate);

  function runSearch(q) {
    if (!q) { searchResults.classList.remove('open'); return; }
    const ql = q.toLowerCase();
    const matches = searchIndex
      .filter(it => it.title.toLowerCase().includes(ql) || it.sub.toLowerCase().includes(ql))
      .slice(0, 12);
    searchResults.innerHTML = matches.length
      ? matches.map(m => `<a href="${esc(m.href)}">${esc(m.title)}<span class="cat">${esc(m.sub)}</span></a>`).join('')
      : '<div class="empty">No results.</div>';
    searchResults.classList.add('open');
  }

  searchInput.addEventListener('input', () => runSearch(searchInput.value.trim()));
  searchInput.addEventListener('focus', () => { if (searchInput.value.trim()) runSearch(searchInput.value.trim()); });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) searchResults.classList.remove('open');
  });
  searchResults.addEventListener('click', () => {
    setTimeout(() => {
      searchInput.value = '';
      searchResults.classList.remove('open');
    }, 50);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      searchResults.classList.remove('open');
      searchInput.blur();
    }
  });

  if (menuToggle) menuToggle.onclick = () => leftNav.classList.toggle('open');

  function loadState(key, defaults) {
    try {
      const raw = localStorage.getItem('mw:' + key);
      if (!raw) return { ...defaults };
      return { ...defaults, ...JSON.parse(raw) };
    } catch (e) { return { ...defaults }; }
  }
  function saveState(key, state) {
    try { localStorage.setItem('mw:' + key, JSON.stringify(state)); } catch (e) {}
  }

  navigate();
})();
