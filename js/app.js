/* ============================================================
   Mewgenics Wiki — App
   Hash router, page renderers, search, filters.
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
  const link = (href, text, attrs = '') =>
    `<a href="${esc(href)}" ${attrs}>${esc(text)}</a>`;
  const titleCase = (s) => String(s || '').replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  function lookupCat(id)     { return byId(D.cats, id); }
  function lookupAbility(id) { return byId(D.abilities, id); }
  function lookupItem(id)    { return byId(D.items, id); }
  function lookupEnemy(id)   { return byId(D.enemies, id); }
  function lookupLocation(id){ return byId(D.locations, id); }
  function lookupStatus(id)  { return byId(D.statuses, id); }

  function nameLink(kind, id) {
    const map = {
      cat:      [D.cats,      '#/cats/'],
      ability:  [D.abilities, '#/abilities/'],
      item:     [D.items,     '#/items/'],
      enemy:    [D.enemies,   '#/enemies/'],
      location: [D.locations, '#/locations/'],
      status:   [D.statuses,  '#/status']
    };
    const [arr, base] = map[kind] || [[], '#/'];
    const obj = byId(arr, id);
    if (!obj) return esc(id);
    if (kind === 'status') return link('#/status', obj.name, 'class="row-link"');
    return link(base + id, obj.name, 'class="row-link"');
  }

  /* -------------------- left nav -------------------- */
  function renderLeftNav(activeRoute) {
    leftNav.innerHTML = `
      <h3>Game Basics</h3>
      <ul>
        <li><a href="#/" data-r="/">Overview</a></li>
        <li><a href="#/getting-started" data-r="/getting-started">Getting Started</a></li>
      </ul>
      <h3>Mechanics</h3>
      <ul>
        <li><a href="#/cats" data-r="/cats">Cats</a></li>
        <li><a href="#/genetics" data-r="/genetics">Genetics</a></li>
        <li><a href="#/breeding" data-r="/breeding">Breeding</a></li>
        <li><a href="#/combat" data-r="/combat">Combat</a></li>
        <li><a href="#/abilities" data-r="/abilities">Abilities</a></li>
      </ul>
      <h3>Database</h3>
      <ul>
        <li><a href="#/items" data-r="/items">Items</a></li>
        <li><a href="#/enemies" data-r="/enemies">Enemies</a></li>
        <li><a href="#/locations" data-r="/locations">Locations</a></li>
        <li><a href="#/status" data-r="/status">Status Effects</a></li>
        <li><a href="#/genes" data-r="/genes">Gene Index</a></li>
      </ul>
      <h3>Community</h3>
      <ul>
        <li><a href="#/strategies" data-r="/strategies">Strategies</a></li>
        <li><a href="#/patches" data-r="/patches">Patch Notes</a></li>
      </ul>
    `;
    leftNav.querySelectorAll('a').forEach((a) => {
      const r = a.getAttribute('data-r');
      if (activeRoute === r || activeRoute.startsWith(r + '/') && r !== '/') {
        a.classList.add('active');
      }
      if (r === '/' && activeRoute === '/') a.classList.add('active');
    });
  }

  /* -------------------- right nav -------------------- */
  function renderRightNav(route) {
    let extra = '';
    if (route.startsWith('/cats/')) {
      extra = `<h3>This Cat</h3><ul>
        <li><a href="#/cats">Back to Cats</a></li>
        <li><a href="#/genetics">How genes work</a></li>
        <li><a href="#/breeding">Breeding rules</a></li>
      </ul>`;
    } else if (route.startsWith('/abilities')) {
      extra = `<h3>Related</h3><ul>
        <li><a href="#/combat">Combat overview</a></li>
        <li><a href="#/status">Status effects</a></li>
      </ul>`;
    } else if (route.startsWith('/items')) {
      extra = `<h3>Related</h3><ul>
        <li><a href="#/locations">Where loot drops</a></li>
        <li><a href="#/strategies">Build guides</a></li>
      </ul>`;
    }
    rightNav.innerHTML = `
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#/cats">All cats</a></li>
        <li><a href="#/abilities">All abilities</a></li>
        <li><a href="#/items">All items</a></li>
        <li><a href="#/enemies">Bestiary</a></li>
        <li><a href="#/strategies">Strategies</a></li>
      </ul>
      ${extra}
      <h3>Did you know?</h3>
      <p class="qd">Recessive genes only express when both alleles are lowercase. Want a rare trait? Inbreed carefully.</p>
      <h3>Contribute</h3>
      <p class="qd">Found wrong info? Edit <code>js/data.js</code> in the GitHub repo and open a PR.</p>
    `;
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  function parseRoute() {
    const h = location.hash.replace(/^#/, '') || '/';
    return h;
  }

  function navigate() {
    const route = parseRoute();
    renderLeftNav(route);
    renderRightNav(route);

    if (route === '/' || route === '') return renderHome();
    if (route === '/getting-started') return renderStaticPage('getting-started');
    if (route === '/genetics')        return renderStaticPage('genetics');
    if (route === '/breeding')        return renderStaticPage('breeding');
    if (route === '/combat')          return renderStaticPage('combat');
    if (route === '/cats')            return renderCatsList();
    if (route === '/abilities')       return renderAbilitiesList();
    if (route === '/items')           return renderItemsList();
    if (route === '/enemies')         return renderEnemiesList();
    if (route === '/locations')       return renderLocationsList();
    if (route === '/status')          return renderStatusList();
    if (route === '/genes')           return renderGenesList();
    if (route === '/strategies')      return renderStrategiesList();
    if (route === '/patches')         return renderPatches();

    if (route.startsWith('/cats/'))      return renderCatDetail(route.slice(6));
    if (route.startsWith('/abilities/')) return renderAbilityDetail(route.slice(11));
    if (route.startsWith('/items/'))     return renderItemDetail(route.slice(7));
    if (route.startsWith('/enemies/'))   return renderEnemyDetail(route.slice(9));
    if (route.startsWith('/locations/')) return renderLocationDetail(route.slice(11));
    if (route.startsWith('/strategies/'))return renderStrategyDetail(route.slice(12));

    render404(route);
  }

  /* ============================================================
     HOME
     ============================================================ */
  function renderHome() {
    main.innerHTML = `
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
        <a class="card" href="#/getting-started"><div class="icon">🐾</div><h4>Getting Started</h4><p>Your first run, in plain English.</p></a>
        <a class="card" href="#/cats"><div class="icon">🐱</div><h4>Cats Database</h4><p>${D.cats.length} entries with stats and abilities.</p></a>
        <a class="card" href="#/genetics"><div class="icon">🧬</div><h4>Genetics</h4><p>How genes pass, mutate, and stack.</p></a>
        <a class="card" href="#/breeding"><div class="icon">💕</div><h4>Breeding</h4><p>Pairings, litters, and inheritance.</p></a>
        <a class="card" href="#/combat"><div class="icon">⚔️</div><h4>Combat</h4><p>AP, positioning, status, matchups.</p></a>
        <a class="card" href="#/abilities"><div class="icon">✨</div><h4>Abilities</h4><p>${D.abilities.length} attacks &amp; spells.</p></a>
        <a class="card" href="#/items"><div class="icon">🎁</div><h4>Items</h4><p>${D.items.length} pieces of gear &amp; treats.</p></a>
        <a class="card" href="#/enemies"><div class="icon">👹</div><h4>Bestiary</h4><p>${D.enemies.length} enemies &amp; their tactics.</p></a>
        <a class="card" href="#/strategies"><div class="icon">📘</div><h4>Strategies</h4><p>Builds &amp; comp ideas.</p></a>
      </div>

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
        <p><a href="#/patches">View full patch history →</a></p>
      </div>
    `;
  }

  function renderCatCardInline(c) {
    if (!c) return '';
    return `
      <a class="card" href="#/cats/${esc(c.id)}" style="display:flex;gap:14px;align-items:center;">
        <div style="font-size:40px;">${esc(c.emoji)}</div>
        <div>
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
      <div class="page">
        <h1>${esc(p.title)}</h1>
        <div class="breadcrumb">Home / ${esc(p.title)}</div>
        ${p.body}
      </div>
    `;
  }

  /* ============================================================
     CATS
     ============================================================ */
  function renderCatsList() {
    const stateKey = 'cats-filters';
    const state = loadState(stateKey, { type: 'all', rarity: 'all', search: '', sort: 'name', dir: 'asc' });

    main.innerHTML = `
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
            <td><a href="#/cats/${esc(c.id)}" class="row-link">${esc(c.emoji)} ${esc(c.name)}</a></td>
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
      // active button states
      document.querySelectorAll('#catsToolbar [data-f="type"]').forEach(b => b.classList.toggle('active', b.dataset.v === state.type));
      document.querySelectorAll('#catsToolbar [data-f="rarity"]').forEach(b => b.classList.toggle('active', b.dataset.v === state.rarity));
      // sort indicator
      document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.toggle('sorted', th.dataset.sort === state.sort);
        const arr = th.querySelector('.sort-arrow');
        if (arr) arr.textContent = th.dataset.sort === state.sort ? (state.dir === 'asc' ? '↑' : '↓') : '↕';
      });
    }

    // wire events
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
      <div class="page">
        <div class="breadcrumb"><a href="#/cats">Cats</a> / ${esc(c.name)}</div>
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
                return a ? `<a class="chip" href="#/abilities/${esc(a.id)}">${esc(a.name)} ${tag(a.type, a.type)}</a>` : '';
              }).join('')}
            </div>
            <h3>Traits</h3>
            <div class="chip-list">${(c.traits || []).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
            <h3>Genes</h3>
            <p>${(c.genes || []).map(g => `<code>${esc(g)}</code>`).join(' · ')}</p>
            <p style="color:var(--muted);font-size:13px;">See <a href="#/genetics">Genetics</a> for how to read these.</p>
            <h3>Suggested role</h3>
            <p>${esc(c.role)}</p>
          </div>
          <div class="infobox">
            <div class="sprite ${esc(c.type)}">${esc(c.emoji)}</div>
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
    `;
  }

  /* ============================================================
     ABILITIES
     ============================================================ */
  function renderAbilitiesList() {
    const stateKey = 'abilities-filters';
    const state = loadState(stateKey, { type: 'all', search: '', sort: 'name', dir: 'asc' });

    main.innerHTML = `
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
            <td><a href="#/abilities/${esc(a.id)}" class="row-link">${esc(a.name)}</a></td>
            <td>${tag(a.type, a.type)}</td>
            <td class="num">${a.cost}</td>
            <td class="num">${a.range}</td>
            <td class="num">${a.damage || '—'}</td>
            <td>${(a.effects || []).map(e => {
              const s = lookupStatus(e);
              return s ? `<a href="#/status">${tag(s.name)}</a>` : tag(e);
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
      <div class="page">
        <div class="breadcrumb"><a href="#/abilities">Abilities</a> / ${esc(a.name)}</div>
        <div class="detail-grid">
          <div>
            <h1>${esc(a.name)} ${tag(a.type, a.type)}</h1>
            <p>${esc(a.description)}</p>
            ${a.tip ? `<div class="callout tip"><strong>Tip:</strong> ${esc(a.tip)}</div>` : ''}
            <h3>Used by</h3>
            <div class="chip-list">
              ${usedBy.length ? usedBy.map(c => `<a class="chip" href="#/cats/${esc(c.id)}">${esc(c.emoji)} ${esc(c.name)}</a>`).join('')
                              : '<span class="qd">No cats start with this ability.</span>'}
            </div>
            <h3>Applied effects</h3>
            <div class="chip-list">
              ${(a.effects || []).length
                ? (a.effects || []).map(e => {
                    const s = lookupStatus(e);
                    return s ? `<a class="chip" href="#/status">${esc(s.name)}</a>` : `<span class="chip">${esc(e)}</span>`;
                  }).join('')
                : '<span class="qd">None.</span>'}
            </div>
          </div>
          <div class="infobox">
            <div class="sprite ${esc(a.type)}">✨</div>
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
            <td><a href="#/items/${esc(i.id)}" class="row-link">${esc(i.name)}</a></td>
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
      <div class="page">
        <div class="breadcrumb"><a href="#/items">Items</a> / ${esc(i.name)}</div>
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
            <div class="sprite">🎁</div>
            <h4>${esc(i.name)}</h4>
            <dl>
              <dt>Slot</dt><dd>${tag(i.slot)}</dd>
              <dt>Rarity</dt><dd>${tag(i.rarity, i.rarity)}</dd>
              <dt>Drop</dt><dd>${esc(i.drop || '—')}</dd>
            </dl>
          </div>
        </div>
      </div>
    `;
  }

  /* ============================================================
     ENEMIES
     ============================================================ */
  function renderEnemiesList() {
    main.innerHTML = `
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
                <td><a href="#/enemies/${esc(e.id)}" class="row-link">${esc(e.name)}</a></td>
                <td>${tag(e.type, e.type)}</td>
                <td class="num">${e.hp}</td>
                <td class="num">${e.speed}</td>
                <td>${tag(e.threat, e.threat === 'boss' ? 'legendary' : (e.threat === 'high' ? 'epic' : (e.threat === 'medium' ? 'uncommon' : 'common')))}</td>
                <td>${(e.locations || []).map(l => {
                  const loc = lookupLocation(l);
                  return loc ? `<a href="#/locations/${esc(loc.id)}">${esc(loc.name)}</a>` : esc(l);
                }).join(', ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderEnemyDetail(id) {
    const e = lookupEnemy(id);
    if (!e) return render404(id);
    main.innerHTML = `
      <div class="page">
        <div class="breadcrumb"><a href="#/enemies">Enemies</a> / ${esc(e.name)}</div>
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
                return loc ? `<a class="chip" href="#/locations/${esc(loc.id)}">${esc(loc.name)}</a>` : '';
              }).join('')}
            </div>
          </div>
          <div class="infobox">
            <div class="sprite ${esc(e.type)}">👹</div>
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
    `;
  }

  /* ============================================================
     LOCATIONS
     ============================================================ */
  function renderLocationsList() {
    main.innerHTML = `
      <div class="page">
        <h1>Locations</h1>
        <div class="breadcrumb">Home / Locations</div>
        <p>The world is divided into biomes. Each has its own enemy mix, treats, and difficulty curve.</p>
        <div class="cards">
          ${D.locations.map(l => `
            <a class="card" href="#/locations/${esc(l.id)}">
              <h4>${esc(l.name)} ${tag(l.tier, l.tier === 'high' ? 'epic' : (l.tier === 'mid' ? 'rare' : (l.tier === 'low' ? 'uncommon' : 'common')))}</h4>
              <p>${esc(l.description.slice(0, 100))}…</p>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderLocationDetail(id) {
    const l = lookupLocation(id);
    if (!l) return render404(id);
    main.innerHTML = `
      <div class="page">
        <div class="breadcrumb"><a href="#/locations">Locations</a> / ${esc(l.name)}</div>
        <h1>${esc(l.name)} ${tag(l.tier)}</h1>
        <p>${esc(l.description)}</p>
        <div class="callout tip"><strong>Tip:</strong> ${esc(l.tips)}</div>
        <h3>Enemies</h3>
        <div class="chip-list">
          ${(l.enemies || []).map(eid => {
            const en = lookupEnemy(eid);
            return en ? `<a class="chip" href="#/enemies/${esc(en.id)}">${esc(en.name)} ${tag(en.threat)}</a>` : '';
          }).join('')}
        </div>
        <h3>Notable drops</h3>
        <ul>${(l.drops || []).map(d => `<li>${esc(d)}</li>`).join('')}</ul>
      </div>
    `;
  }

  /* ============================================================
     STATUS / GENES / STRATEGIES / PATCHES
     ============================================================ */
  function renderStatusList() {
    main.innerHTML = `
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
    `;
  }

  function renderGenesList() {
    main.innerHTML = `
      <div class="page">
        <h1>Gene Index</h1>
        <div class="breadcrumb">Home / Genes</div>
        <p>Every gene tracked by the breeding system. See <a href="#/genetics">Genetics</a> for inheritance rules and <a href="#/breeding">Breeding</a> for how to combine them.</p>
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
    `;
  }

  function renderStrategiesList() {
    main.innerHTML = `
      <div class="page">
        <h1>Strategies &amp; Builds</h1>
        <div class="breadcrumb">Home / Strategies</div>
        <p>Community-curated team comps and tactics. To submit one, edit <code>js/data.js</code> and open a PR.</p>
        <div class="cards">
          ${D.strategies.map(s => `
            <a class="card" href="#/strategies/${esc(s.id)}">
              <h4>${esc(s.title)}</h4>
              <p>${esc(s.summary)}</p>
              <div style="margin-top:8px;">${(s.tags || []).map(t => tag(t)).join(' ')}</div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderStrategyDetail(id) {
    const s = (D.strategies || []).find(x => x.id === id);
    if (!s) return render404(id);
    main.innerHTML = `
      <div class="page">
        <div class="breadcrumb"><a href="#/strategies">Strategies</a> / ${esc(s.title)}</div>
        <h1>${esc(s.title)}</h1>
        <p style="color:var(--muted);">By ${esc(s.author)} · ${(s.tags || []).map(t => tag(t)).join(' ')}</p>
        <p><strong>${esc(s.summary)}</strong></p>
        <p>${esc(s.body)}</p>
      </div>
    `;
  }

  function renderPatches() {
    main.innerHTML = `
      <div class="page">
        <h1>Patch Notes</h1>
        <div class="breadcrumb">Home / Patch Notes</div>
        <p style="color:var(--muted);font-size:13px;">Most recent first. Sourced from official dev posts.</p>
        ${D.patches.map(p => `
          <div class="patch">
            <div class="patch-meta"><span class="ver">${esc(p.version)}</span><span>${esc(p.date)}</span></div>
            <ul>${p.changes.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
    `;
  }

  function render404(slug) {
    main.innerHTML = `
      <div class="page">
        <h1>Not found</h1>
        <p>No wiki entry for <code>${esc(slug)}</code>.</p>
        <p><a href="#/">← Back to home</a></p>
      </div>
    `;
  }

  /* ============================================================
     SEARCH (across all entities)
     ============================================================ */
  function buildSearchIndex() {
    const index = [];
    D.cats.forEach(c       => index.push({ title: c.name, sub: 'Cat',      href: '#/cats/' + c.id }));
    D.abilities.forEach(a  => index.push({ title: a.name, sub: 'Ability',  href: '#/abilities/' + a.id }));
    D.items.forEach(i      => index.push({ title: i.name, sub: 'Item',     href: '#/items/' + i.id }));
    D.enemies.forEach(e    => index.push({ title: e.name, sub: 'Enemy',    href: '#/enemies/' + e.id }));
    D.locations.forEach(l  => index.push({ title: l.name, sub: 'Location', href: '#/locations/' + l.id }));
    D.statuses.forEach(s   => index.push({ title: s.name, sub: 'Status',   href: '#/status' }));
    D.genes.forEach(g      => index.push({ title: g.name, sub: 'Gene',     href: '#/genes' }));
    D.strategies.forEach(s => index.push({ title: s.title, sub: 'Strategy', href: '#/strategies/' + s.id }));
    D.patches.forEach(p    => index.push({ title: 'Patch ' + p.version, sub: 'Patch', href: '#/patches' }));
    Object.entries(D.pages).forEach(([k, v]) => index.push({ title: v.title, sub: 'Page', href: '#/' + k }));
    return index;
  }

  const searchIndex = buildSearchIndex();

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

  // Keyboard: / focuses search
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

  /* -------------------- mobile menu -------------------- */
  if (menuToggle) {
    menuToggle.onclick = () => leftNav.classList.toggle('open');
  }

  /* -------------------- localStorage helpers -------------------- */
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

  /* -------------------- boot -------------------- */
  window.addEventListener('hashchange', () => {
    leftNav.classList.remove('open');
    navigate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  navigate();
})();
