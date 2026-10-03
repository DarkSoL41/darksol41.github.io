(function () {
  const S = window.SITE, P = window.PROJECTS;
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmtDate = (d) => {
    const [y, m, day] = d.split("-");
    return `${day} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m - 1]} ${y}`;
  };
  const ICON_DL = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11"/></svg>';

  /* ---------- Placeholder screenshots (pixel art on canvas) ---------- */
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }
  const PAL = {
    zx: ["#000000", "#0000D7", "#D70000", "#D700D7", "#00D700", "#00D7D7", "#D7D700", "#D7D7D7", "#FFFFFF"],
    nes: ["#0F0F0F", "#6844FC", "#F83800", "#00A800", "#FCA044", "#3CBCFC", "#F8D878", "#BCBCBC", "#FCFCFC"],
    sp: ["#0A0A0C", "#4D4D63", "#07A9D8", "#9C9CA6", "#E2344A", "#2ECC71", "#8E44EC", "#F5C518", "#F39C12"],
    dos: ["#000000", "#0000AA", "#00AA00", "#00AAAA", "#AA0000", "#AA00AA", "#AA5500", "#AAAAAA", "#555555", "#5555FF", "#55FF55", "#55FFFF", "#FF5555", "#FFFF55"]
  };
  function drawPlaceholder(style, seed) {
    const c = document.createElement("canvas");
    c.width = 240; c.height = 96;
    const g = c.getContext("2d"), r = rng(seed), pal = PAL[style];
    g.fillStyle = pal[0]; g.fillRect(0, 0, 240, 96);
    if (style === "sp") {
      // Supaplex-like map: base with carved tunnels, zonk piles, walls, infotrons along tunnels
      const W = 60, H = 24, m = [];
      for (let y = 0; y < H; y++) { m.push([]); for (let x = 0; x < W; x++) m[y].push(y === 0 || y === H - 1 || x === 0 || x === W - 1 ? 1 : 2); }
      for (let i = 0; i < 5; i++) {               // hardware walls with gaps
        const wx = 8 + ((r() * 44) | 0), gap = 3 + ((r() * 16) | 0);
        for (let y = 1; y < H - 1; y++) if (Math.abs(y - gap) > 1) m[y][wx] = 1;
      }
      for (let t = 0; t < 7; t++) {               // tunnels
        let x = 2 + ((r() * 56) | 0), y = 2 + ((r() * 20) | 0);
        for (let s = 0; s < 70; s++) {
          if (m[y][x] !== 1) m[y][x] = 0;
          if (r() < 0.5) x += r() < 0.5 ? 1 : -1; else y += r() < 0.5 ? 1 : -1;
          x = Math.max(1, Math.min(W - 2, x)); y = Math.max(1, Math.min(H - 2, y));
        }
      }
      for (let k = 0; k < 9; k++) {               // zonk piles
        const cx = 2 + ((r() * 55) | 0), cy = 2 + ((r() * 19) | 0), rw = 2 + ((r() * 4) | 0), rh = 1 + ((r() * 3) | 0);
        for (let y = cy; y < Math.min(H - 1, cy + rh); y++) for (let x = cx; x < Math.min(W - 1, cx + rw); x++) if (m[y][x] === 2) m[y][x] = 3;
      }
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        if (m[y][x] === 0 && r() < 0.18) m[y][x] = 4;         // infotrons
        else if (m[y][x] === 2 && r() < 0.03) m[y][x] = 5;    // RAM chips
        else if (m[y][x] === 1 && x > 0 && x < W - 1 && y > 0 && y < H - 1 && r() < 0.06) m[y][x] = 6; // ports
      }
      m[1 + ((r() * 21) | 0)][W - 3] = 7; m[1 + ((r() * 21) | 0)][2] = 8;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { g.fillStyle = pal[m[y][x]]; g.fillRect(x * 4, y * 4, 4, 4); }
    } else if (style === "zx") {
      // border stripes like a loading tape, then attribute blocks
      for (let y = 0; y < 96; y += 3) { g.fillStyle = r() > 0.5 ? pal[1] : pal[6]; g.fillRect(0, y, 240, 3); }
      g.fillStyle = pal[0]; g.fillRect(16, 8, 208, 80);
      for (let y = 0; y < 10; y++) for (let x = 0; x < 26; x++) {
        if (r() < 0.45) continue;
        g.fillStyle = pal[1 + Math.floor(r() * 7)];
        const bits = Math.floor(r() * 255);
        for (let b = 0; b < 8; b++) if (bits & (1 << b)) g.fillRect(16 + x * 8 + b, 8 + y * 8 + (b % 3) * 2, 1, 4);
      }
    } else if (style === "nes") {
      const tile = (x, y, p) => {
        for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
          const v = (r() * 4) | 0; if (!v) continue;
          g.fillStyle = pal[p[v - 1]]; g.fillRect(x + i, y + j, 1, 1);
        }
      };
      for (let y = 0; y < 12; y++) for (let x = 0; x < 30; x++) {
        const p = [[1, 5, 8], [2, 4, 6], [3, 6, 8], [7, 8, 5]][(x >> 1 ^ y >> 1) & 3];
        if (y > 8 ? (x + y) % 5 !== 0 : r() < 0.12) tile(x * 8, y * 8, p);
      }
    } else {
      for (let y = 0; y < 12; y++) for (let x = 0; x < 30; x++) {
        const edge = y === 0 || y === 11 || x === 0 || x === 29;
        const wall = edge || (x % 6 === 0 && y % 4 !== 2) || (y % 5 === 0 && x % 3 !== 1 && r() < 0.8);
        g.fillStyle = wall ? pal[6] : pal[r() < 0.08 ? 13 : 0];
        g.fillRect(x * 8, y * 8, 8, 8);
        if (wall) { g.fillStyle = pal[4]; g.fillRect(x * 8, y * 8 + 7, 8, 1); g.fillRect(x * 8 + 7, y * 8, 1, 8); }
      }
      for (let i = 0; i < 6; i++) { g.fillStyle = pal[10 + (i % 3)]; g.fillRect(((r() * 28 + 1) | 0) * 8 + 2, ((r() * 10 + 1) | 0) * 8 + 2, 4, 4); }
    }
    return c;
  }
  function shotEl(shot, alt) {
    if (shot.src) {
      const img = new Image();
      img.src = shot.src; img.alt = alt || shot.cap || ""; img.loading = "lazy";
      return img;
    }
    const c = drawPlaceholder(shot.gen, shot.seed);
    c.setAttribute("role", "img"); c.setAttribute("aria-label", alt || shot.cap || "");
    return c;
  }

  /* ---------- Shared bits ---------- */
  const kindCount = (k) => P.filter((p) => p.kind === k).length;
  const chipStatus = (p) => `<span class="chip chip-dot ${S.status[p.status].cls}">${S.status[p.status].label}</span>`;
  const chipPlatform = (p) => `<span class="chip pf pf-${p.platform}">${S.platforms[p.platform].name}</span>`;

  function card(p) {
    const a = document.createElement("a");
    a.className = "card"; a.href = `project.html#${p.id}`;
    a.innerHTML = `<div class="card-shot"></div>
      <div class="card-body">
        <span class="card-kind">${S.kinds[p.kind]}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="card-meta">${chipPlatform(p)}${chipStatus(p)}</div>
      </div>`;
    a.querySelector(".card-shot").append(shotEl(p.cover ? { src: p.cover } : p.shots[0], p.title));
    return a;
  }
  function row(p) {
    const a = document.createElement("a");
    a.className = "row"; a.href = `project.html#${p.id}`;
    a.innerHTML = `<div class="thumb"></div>
      <div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div>
      <div class="hide-sm" style="display:flex;gap:6px;flex-wrap:wrap">${chipPlatform(p)}<span class="chip">${S.kinds[p.kind]}</span></div>
      <div class="hide-md">${chipStatus(p)}</div>
      <div class="mono hide-sm"></div>`;
    a.querySelector(".thumb").append(shotEl(p.cover ? { src: p.cover } : p.shots[0], p.title));
    return a;
  }

  function filterButtons(host, current, onPick) {
    const opts = [["all", "All", P.length], ...Object.entries(S.kinds).map(([k, v]) => [k, v, kindCount(k)])];
    host.innerHTML = "";
    for (const [k, label, n] of opts) {
      if (!n) continue;
      const b = document.createElement("button");
      b.type = "button"; b.dataset.k = k;
      b.setAttribute("aria-pressed", String(k === current));
      b.innerHTML = `${label}<span class="count">${n}</span>`;
      b.onclick = () => { host.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); onPick(k); };
      host.append(b);
    }
  }

  /* ---------- Home ---------- */
  function home() {
    // Showcase: one screenshot per project, newest first
    const list = P; // data.js order: newest first
    const tabs = $("#lv-tabs"), name = $("#lv-name"), read = $("#lv-read"), link = $("#lv-link"), pic = $("#lv-img");
    function load(p) {
      tabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === p.id)));
      name.innerHTML = `<strong>${esc(p.title)}</strong>`;
      link.href = `project.html#${p.id}`;
      pic.src = p.shots[0].src; pic.alt = p.title;
      read.innerHTML = `<span>${S.kinds[p.kind]}</span><span>${S.platforms[p.platform].name}</span><span>Open project →</span>`;
    }
    list.forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.dataset.id = p.id; b.title = p.title;
      b.textContent = String(i + 1).padStart(2, "0");
      b.onclick = () => load(p);
      tabs.append(b);
    });
    load(list[0]);
    const cta = $("#hero-latest");
    if (cta) { cta.href = `project.html#${list[0].id}`; cta.textContent = list[0].title; }

    // facts
    $("#f-projects").textContent = P.length;
    $("#f-platforms").textContent = new Set(P.map((p) => p.platform)).size;

    // project grid with filter
    const grid = $("#home-grid");
    const show = (k) => { grid.innerHTML = ""; P.filter((p) => k === "all" || p.kind === k).forEach((p) => grid.append(card(p))); };
    filterButtons($("#home-filters"), "all", show);
    show("all");

    // platforms
    $("#home-platforms").innerHTML = Object.entries(S.platforms).map(([k, pf]) => {
      const n = P.filter((p) => p.platform === k).length;
      return `<a class="pf-${k} pf" href="projects.html#${k}"><div><div class="pf-name">${pf.name}</div><div class="pf-cpu">${pf.cpu}</div></div><div class="pf-count">${n}</div><div class="pf-bar"></div></a>`;
    }).join("");
  }

  /* ---------- Catalog ---------- */
  function catalog() {
    const host = $("#cat-list"), q = $("#q"), pf = $("#pf"), sort = $("#sort");
    let kind = "all", view = "grid";
    try { view = localStorage.getItem("view") || "grid"; } catch (_) {}
    pf.innerHTML = `<option value="all">All platforms</option>` + Object.entries(S.platforms).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("");
    const h = location.hash.slice(1);
    if (S.platforms[h]) pf.value = h;
    else if (S.kinds[h]) kind = h;

    function render() {
      const term = q.value.trim().toLowerCase();
      let list = P.filter((p) =>
        (kind === "all" || p.kind === kind) &&
        (pf.value === "all" || p.platform === pf.value) &&
        (!term || (p.title + " " + p.summary + " " + S.platforms[p.platform].name).toLowerCase().includes(term)));
      if (sort.value === "name") list.sort((a, b) => a.title.localeCompare(b.title));
      host.className = view === "grid" ? "grid" : "rows";
      host.innerHTML = "";
      list.forEach((p) => host.append(view === "grid" ? card(p) : row(p)));
      $("#cat-count").textContent = `${list.length} of ${P.length}`;
      $("#cat-empty").hidden = list.length > 0;
    }
    filterButtons($("#cat-filters"), kind, (k) => { kind = k; render(); });
    [q, pf, sort].forEach((el) => el.addEventListener("input", render));
    document.querySelectorAll(".view-toggle button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.view === view));
      b.onclick = () => {
        view = b.dataset.view;
        try { localStorage.setItem("view", view); } catch (_) {}
        document.querySelectorAll(".view-toggle button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        render();
      };
    });
    render();
  }

  /* ---------- Project page ---------- */
  function project() {
    const id = location.hash.slice(1);
    const p = P.find((x) => x.id === id) || P[0];
    document.title = `${p.title} · ${S.author}`;
    $("#p-crumb").innerHTML = `<a href="./">Home</a><span>/</span><a href="projects.html">Projects</a><span>/</span><a href="projects.html#${p.kind}">${S.kinds[p.kind]}</a>`;
    $("#p-title").textContent = p.title;
    $("#p-tagline").textContent = p.tagline;
    $("#p-chips").innerHTML = `${chipPlatform(p)}<span class="chip">${S.kinds[p.kind]}</span>${chipStatus(p)}${p.ai ? `<span class="chip">Built with ${esc(p.ai)}</span>` : ""}`;
    $("#p-cta").innerHTML = `<button type="button" class="btn btn-primary" id="to-dl">${ICON_DL}Download</button><small>${p.downloads.map((d) => d.name).join(" · ")}</small>`;

    $("#to-dl").onclick = () => $(".p-layout").scrollIntoView({ behavior: "smooth", block: "start" });

    // gallery
    const main = $("#g-main"), thumbs = $("#g-thumbs");
    let idx = 0;
    function pick(i) {
      idx = i;
      main.innerHTML = "";
      main.append(shotEl(p.shots[i]));
      main.insertAdjacentHTML("beforeend", `<span class="gallery-cap">${esc(p.shots[i].cap)} · ${i + 1}/${p.shots.length}</span>`);
      thumbs.querySelectorAll("button").forEach((b, j) => b.setAttribute("aria-current", String(j === i)));
    }
    thumbs.innerHTML = "";
    p.shots.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.setAttribute("aria-label", s.cap);
      b.append(shotEl(s)); b.onclick = () => pick(i);
      thumbs.append(b);
    });
    thumbs.hidden = p.shots.length < 2;
    pick(0);
    main.onclick = () => {
      const lb = document.createElement("div");
      lb.className = "lightbox";
      lb.append(shotEl(p.shots[idx]));
      lb.insertAdjacentHTML("beforeend", '<button type="button" aria-label="Close">×</button>');
      const close = () => { lb.remove(); document.removeEventListener("keydown", key); };
      const key = (e) => {
        if (e.key === "Escape") close();
        if (e.key === "ArrowRight") { pick((idx + 1) % p.shots.length); close(); main.onclick(); }
        if (e.key === "ArrowLeft") { pick((idx - 1 + p.shots.length) % p.shots.length); close(); main.onclick(); }
      };
      lb.onclick = close;
      document.addEventListener("keydown", key);
      document.body.append(lb);
    };

    // body
    $("#p-prose").innerHTML = `
      <h2>About</h2>${p.about.map((t) => `<p>${esc(t)}</p>`).join("")}
      <h2>Features</h2><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <h2>Getting started</h2><ol class="steps">${p.steps.map((s) => `<li><span>${s}</span></li>`).join("")}</ol>`;

    $("#p-side").innerHTML = `
      <div class="panel" id="download"><h3>Download</h3><div class="dl">${p.downloads.map((d) =>
        `<a ${d.href ? `href="${d.href}" download` : `href="${p.url || S.releases}" target="_blank" rel="noopener"`}><strong>${esc(d.name)}</strong><span>${esc(d.file)}</span>${ICON_DL}</a>`).join("")}</div>
        ${p.legal ? `<p class="note" style="margin-top:12px">${esc(p.legal)}</p>` : ""}${p.url ? `<p style="margin:12px 0 0;font-size:13px"><a href="${p.url}" target="_blank" rel="noopener">Also on itch.io →</a></p>` : ""}</div>
      <div class="panel"><h3>Specs</h3><div class="table-wrap"><table class="spec"><tbody>${p.spec.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table></div></div>`;

    // related
    const rel = P.filter((x) => x.id !== p.id && (x.platform === p.platform || x.kind === p.kind)).slice(0, 3);
    const rg = $("#p-related");
    rg.innerHTML = "";
    (rel.length ? rel : P.filter((x) => x.id !== p.id).slice(0, 3)).forEach((x) => rg.append(card(x)));
    window.scrollTo(0, 0);
  }

  /* ---------- Theme: auto (follows the OS) / light / dark ---------- */
  function themeSwitch() {
    const host = document.getElementById("theme-switch");
    if (!host) return;
    let mode = "auto";
    try { mode = localStorage.getItem("theme") || "auto"; } catch (_) {}
    const apply = (m) => {
      mode = m;
      if (m === "auto") document.documentElement.removeAttribute("data-theme");
      else document.documentElement.setAttribute("data-theme", m);
      try { m === "auto" ? localStorage.removeItem("theme") : localStorage.setItem("theme", m); } catch (_) {}
      host.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
    };
    host.querySelectorAll("button").forEach((b) => (b.onclick = () => apply(b.dataset.mode)));
    apply(mode);
  }
  themeSwitch();

  const page = document.body.dataset.page;
  if (page === "home") home();
  if (page === "catalog") catalog();
  if (page === "project") { project(); window.addEventListener("hashchange", project); }
})();
