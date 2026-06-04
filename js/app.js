/* global MUSICALA_CATALOG */
/* =============================================================================
   Musicala · Brochure Cotizador — LÓGICA (app.js)
   Vanilla JS. Sin dependencias. Compatible con GitHub Pages.
============================================================================= */
(function () {
  'use strict';

  const CAT = window.MUSICALA_CATALOG || {};
  const META = CAT.meta || {};
  const MOD_LABEL = META.modLabel || { sede: 'En sede', hogar: 'A domicilio', virtual: 'Virtual en vivo', online: 'Online' };
  const AREA_EMOJI = META.areaEmoji || {};

  /* ---------- helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function waUrl(text) {
    const num = String(META.whatsappNumber || '').trim();
    const t = encodeURIComponent(String(text || ''));
    return num ? `https://wa.me/${num}?text=${t}` : `https://wa.me/?text=${t}`;
  }
  function openWa(text, ev) {
    track(ev || 'click_whatsapp');
    window.open(waUrl(text), '_blank', 'noopener');
  }

  /* ---------- analítica segura ---------- */
  function track(event, params) {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', event, params || {});
      if (window.dataLayer && typeof window.dataLayer.push === 'function') {
        window.dataLayer.push(Object.assign({ event: event }, params || {}));
      }
    } catch (e) { /* nunca romper la página por analítica */ }
  }
  window.track = track;

  /* ---------- toast ---------- */
  let toastT = null;
  function toast(msg) {
    const el = $('#toast'); if (!el) return;
    el.textContent = String(msg || '');
    el.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), 1700);
  }

  /* =========================================================================
     MENSAJES DE WHATSAPP (contextuales)
  ========================================================================= */
  function msgBase(linesObj) {
    // linesObj: array de {label, value} solo con lo que el usuario eligió
    const lines = linesObj.filter((l) => l && l.value);
    let out = 'Hola Musicala 👋\n\nQuiero información de planes y precios para:\n';
    lines.forEach((l) => { out += `• ${l.label}: ${l.value}\n`; });
    out += '\n¿Me comparten opciones, horarios y valores?';
    return out;
  }

  // Tarjeta de catálogo: solo experiencia (y modalidad SOLO si hay filtro activo)
  function msgCatalogo(item) {
    const lines = [{ label: 'Instrumento/Experiencia', value: item.title }];
    if (state.modalidad) lines.push({ label: 'Modalidad', value: MOD_LABEL[state.modalidad] });
    return msgBase(lines);
  }

  // Plan de la tabla de precios
  function msgPlan(plan) {
    return msgBase([
      { label: 'Plan', value: plan.plan },
      { label: 'Modalidad', value: MOD_LABEL[plan.modalidad] },
    ]);
  }

  /* =========================================================================
     ESTADO GLOBAL
  ========================================================================= */
  const state = {
    modalidad: '',   // '' = ver todo (NO cuenta como modalidad elegida)
    area: 'all',     // filtro de área en catálogo
  };

  /* =========================================================================
     RENDER: CONFIANZA / PASOS / RUTAS / FAQ / VIDEOS
  ========================================================================= */
  function renderConfianza() {
    const g = $('#trust-grid'); if (!g) return;
    g.innerHTML = (CAT.confianza || []).map((c) => `
      <div class="trust-item reveal">
        <span class="trust-ic">${esc(c.icon)}</span>
        <span>${esc(c.text)}</span>
      </div>`).join('');
  }

  function renderPasos() {
    const g = $('#steps3'); if (!g) return;
    g.innerHTML = (CAT.pasos || []).map((p) => `
      <div class="step3 reveal">
        <div class="step3-n">${esc(p.n)}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </div>`).join('');
  }

  function renderRutas() {
    const g = $('#rutas-grid'); if (!g) return;
    g.innerHTML = (CAT.rutas || []).map((r, i) => `
      <div class="ruta reveal">
        <span class="ruta-ic">${esc(r.icon)}</span>
        <h3>${esc(r.title)}</h3>
        <p class="hint">Recomendado: ${esc(r.reco)}</p>
        <button class="mini whats js-ruta" data-i="${i}" type="button">💬 Cotizar por WhatsApp</button>
      </div>`).join('');
  }

  function renderFaq() {
    const g = $('#faq'); if (!g) return;
    g.innerHTML = (CAT.faqs || []).map((f) => `
      <details class="faq-item">
        <summary>${esc(f.q)}</summary>
        <p>${esc(f.a)}</p>
      </details>`).join('');
  }

  function renderVideos() {
    const g = $('#video-grid'); if (!g) return;
    g.innerHTML = (CAT.videos || []).map((v) => `
      <figure class="vcard reveal">
        <video muted loop playsinline preload="none" poster="${esc(v.poster)}"
               data-lazy-src="${esc(v.src)}"></video>
        <figcaption>${esc(AREA_EMOJI[v.area] || '🎬')} ${esc(v.title)}</figcaption>
      </figure>`).join('');
    setupLazyVideos();
  }

  /* =========================================================================
     RENDER: PRECIOS + FILTROS
  ========================================================================= */
  function renderFiltros() {
    const bar = $('#filterbar'); if (!bar) return;
    bar.innerHTML = (CAT.filtros || []).map((f) => `
      <button class="pill js-filter" type="button"
        data-key="${esc(f.key)}"
        aria-pressed="${f.key === state.modalidad ? 'true' : 'false'}">${esc(f.label)}</button>`).join('');
  }

  function renderPrecios() {
    const g = $('#price-grid'); if (!g) return;
    const list = (CAT.precios || []).filter((p) => !state.modalidad || p.modalidad === state.modalidad);
    g.innerHTML = list.map((p, i) => `
      <article class="price-card reveal">
        <div class="price-card-top">
          <h3>${esc(p.nombre)}</h3>
          <span class="tag">${esc(MOD_LABEL[p.modalidad] || '')}</span>
        </div>
        <div class="price-amount">${esc(p.precio)}</div>
        <p class="price-ideal">${esc(p.ideal)}</p>
        <button class="mini whats js-plan" data-i="${i}" type="button">💬 Cotizar este plan por WhatsApp</button>
      </article>`).join('');
    // guardamos referencia filtrada para los botones
    g.__list = list;
    const note = $('#price-note');
    if (note) note.textContent = CAT.preciosNota || '';
    setupReveal();
  }

  /* =========================================================================
     RENDER: CATÁLOGO + TABS DE ÁREA
  ========================================================================= */
  function areas() {
    const set = [];
    (CAT.catalogo || []).forEach((c) => { if (!set.includes(c.area)) set.push(c.area); });
    return set;
  }

  function renderAreaTabs() {
    const bar = $('#area-tabs'); if (!bar) return;
    const tabs = [{ key: 'all', label: 'Todas' }].concat(areas().map((a) => ({ key: a, label: a })));
    bar.innerHTML = tabs.map((t) => `
      <button class="pill js-area" type="button"
        data-area="${esc(t.key)}"
        aria-pressed="${t.key === state.area ? 'true' : 'false'}">${esc(t.label)}</button>`).join('');
  }

  function catCardHtml(item) {
    const emoji = AREA_EMOJI[item.area] || '🎵';
    const media = item.img
      ? `<img src="${esc(item.img)}" alt="${esc(item.title)}" loading="lazy" decoding="async"
             onerror="this.closest('.media').classList.add('noimg')">`
      : '';
    return `
      <article class="cat-card reveal" data-area="${esc(item.area)}" data-mods="${esc((item.modalidades || []).join(','))}">
        <div class="media ${item.img ? '' : 'noimg'}" data-emoji="${esc(emoji)}">${media}</div>
        <div class="body">
          <div class="top">
            <h3 class="title">${esc(item.title)}</h3>
            <span class="tag">${esc(emoji)} ${esc(item.area)}</span>
          </div>
          <ul class="bullets">${(item.bullets || []).slice(0, 3).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
          <button class="mini whats js-cat" data-id="${esc(item.id)}" type="button">💬 WhatsApp</button>
        </div>
      </article>`;
  }

  function renderCatalogo() {
    const g = $('#cat-grid'); if (!g) return;
    g.innerHTML = (CAT.catalogo || []).map(catCardHtml).join('');
    applyCatFilters();
    setupReveal();
  }

  function applyCatFilters() {
    const cards = $$('#cat-grid .cat-card');
    let visible = 0;
    cards.forEach((card) => {
      const area = card.getAttribute('data-area');
      const mods = (card.getAttribute('data-mods') || '').split(',').filter(Boolean);
      const okArea = state.area === 'all' || area === state.area;
      const okMod = !state.modalidad || mods.includes(state.modalidad);
      const show = okArea && okMod;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const empty = $('#cat-empty');
    if (empty) empty.hidden = visible !== 0;
  }

  /* =========================================================================
     RECOMENDADOR GUIADO (6 pasos)
  ========================================================================= */
  const reco = { idx: 0, answers: {} };

  function recoSteps() { return (CAT.recomendador && CAT.recomendador.pasos) || []; }

  function recoOptionsFor(step) {
    if (step.dynamic) {
      const area = reco.answers[step.dynamic];
      const map = (CAT.recomendador && CAT.recomendador.intereses) || {};
      return map[area] || ['No sé, quiero recomendación'];
    }
    return step.options || [];
  }

  function renderReco() {
    const steps = recoSteps();
    const wrap = $('#reco-step'); if (!wrap) return;

    // ¿Terminó?
    if (reco.idx >= steps.length) { renderRecoResult(); return; }

    const step = steps[reco.idx];
    const opts = recoOptionsFor(step);
    const current = reco.answers[step.id] || '';

    $('#reco-bar').style.width = ((reco.idx) / steps.length * 100) + '%';

    wrap.innerHTML = `
      <div class="reco-q">Paso ${reco.idx + 1} de ${steps.length}</div>
      <h3 class="reco-label">${esc(step.label)}</h3>
      <div class="reco-opts">
        ${opts.map((o) => `
          <button class="opt-btn js-reco-opt" type="button"
            data-val="${esc(o)}" aria-pressed="${o === current ? 'true' : 'false'}">${esc(o)}</button>`).join('')}
      </div>`;

    $('#reco-back').hidden = reco.idx === 0;
    $('#reco-restart').hidden = reco.idx === 0;
  }

  function recoFieldLine(step) {
    const v = reco.answers[step.id];
    if (!v) return null;
    // Filtramos respuestas tipo "no sé" para no ensuciar el mensaje
    if (/^no\b|no estoy seguro|no sé|no se todav/i.test(v)) return null;
    return { label: step.field, value: v };
  }

  function buildRecoMessage() {
    const steps = recoSteps();
    const lines = steps.map(recoFieldLine).filter(Boolean);
    let out = 'Hola Musicala 👋\n\nQuiero que me recomienden un plan.\n\n';
    lines.forEach((l) => { out += `• ${l.label}: ${l.value}\n`; });
    out += '\n¿Me ayudan con opciones, horarios y precios?';
    return out;
  }

  function recoSummaryText() {
    const a = reco.answers;
    const area = a.area && !/no s/i.test(a.area) ? a.area : null;
    const interes = a.interes && !/no s/i.test(a.interes) ? a.interes : null;
    const main = interes || area || 'una clase artística';
    const mod = a.modalidad && !/no s/i.test(a.modalidad) ? ` en modalidad ${a.modalidad.toLowerCase()}` : '';
    return `Te recomendamos empezar con ${main}${mod}, en plan personalizado o grupal según disponibilidad de horarios.`;
  }

  function renderRecoResult() {
    const wrap = $('#reco-step');
    $('#reco-bar').style.width = '100%';
    wrap.innerHTML = `
      <div class="reco-result">
        <div class="reco-result-ic">✅</div>
        <h3 class="reco-label">${esc(recoSummaryText())}</h3>
        <p class="hint">Te ayudamos a confirmar horarios, cupos y precio final por WhatsApp.</p>
        <button class="btn primary" id="reco-send" type="button">💬 Enviar recomendación por WhatsApp</button>
      </div>`;
    $('#reco-back').hidden = false;
    $('#reco-restart').hidden = false;
    $('#reco-send').addEventListener('click', () => openWa(buildRecoMessage(), 'click_whatsapp_recomendador'));
  }

  function wireReco() {
    const wrap = $('#reco-step');
    wrap.addEventListener('click', (e) => {
      const b = e.target.closest('.js-reco-opt');
      if (!b) return;
      const steps = recoSteps();
      const step = steps[reco.idx];
      reco.answers[step.id] = b.dataset.val;
      track('select_' + step.id, { value: b.dataset.val });
      // avanzar
      reco.idx++;
      renderReco();
      $('#recomendador').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $('#reco-back').addEventListener('click', () => {
      if (reco.idx > 0) reco.idx--;
      renderReco();
    });
    $('#reco-restart').addEventListener('click', () => {
      reco.idx = 0; reco.answers = {};
      renderReco();
    });
  }

  /* =========================================================================
     FILTRO DE MODALIDAD (barra visible) — afecta precios y catálogo
  ========================================================================= */
  function setModalidad(key) {
    state.modalidad = key || '';
    renderFiltros();
    renderPrecios();
    applyCatFilters();
    if (key) { track('select_modalidad', { value: MOD_LABEL[key] }); toast(`Filtro: ${MOD_LABEL[key]} ✅`); }
    else toast('Mostrando todo ✅');
    updateWaBubble();
  }

  /* =========================================================================
     WHATSAPP FLOTANTE
  ========================================================================= */
  function floatingMessage() {
    if (state.modalidad) {
      return msgBase([{ label: 'Modalidad', value: MOD_LABEL[state.modalidad] }]);
    }
    return META.defaultText || 'Hola Musicala 👋';
  }
  function updateWaBubble() {
    const sub = $('#wa-fab-sub');
    if (sub) sub.textContent = state.modalidad ? MOD_LABEL[state.modalidad] : 'Te ayudamos';
  }

  /* =========================================================================
     LAZY VIDEOS (no hero) + REVEAL
  ========================================================================= */
  function setupLazyVideos() {
    const vids = $$('video[data-lazy-src]');
    if (!vids.length) return;
    if (!('IntersectionObserver' in window)) {
      vids.forEach(loadVideo);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { loadVideo(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '200px' });
    vids.forEach((v) => io.observe(v));
  }
  function loadVideo(v) {
    const src = v.getAttribute('data-lazy-src');
    if (!src || v.dataset.loaded) return;
    const s = document.createElement('source');
    s.src = src; s.type = 'video/mp4';
    // Si el video no existe, el poster permanece visible (no rompe layout)
    v.addEventListener('error', () => { v.removeAttribute('loop'); }, true);
    v.appendChild(s);
    v.dataset.loaded = '1';
    v.removeAttribute('data-lazy-src');
    v.load();
    // Solo reproducir cuando haya datos reales; si no, el poster se queda
    v.addEventListener('loadeddata', () => {
      const p = v.play(); if (p && p.catch) p.catch(() => {});
    }, { once: true });
  }

  let revealIO = null;
  function setupReveal() {
    const els = $$('.reveal:not(.in)');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
      }, { threshold: 0.1 });
    }
    els.forEach((el) => revealIO.observe(el));
  }

  /* =========================================================================
     HERO: si el video no carga, garantizar fallback de imagen
  ========================================================================= */
  function setupHeroVideo() {
    const v = $('#hero-video');
    if (!v) return;
    const fail = () => v.classList.add('failed'); // CSS muestra la imagen fallback
    v.addEventListener('error', fail, true);
    // Si en ~1.2s no hay datos, asumimos que no existe y mostramos imagen
    setTimeout(() => { if (v.readyState < 2) fail(); }, 1200);
    const p = v.play(); if (p && p.catch) p.catch(() => {});
  }

  /* =========================================================================
     EVENTOS GLOBALES
  ========================================================================= */
  function wireEvents() {
    // data-track en cualquier elemento
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-track]');
      if (t) track(t.getAttribute('data-track'));
    });

    // Filtros de modalidad
    $('#filterbar')?.addEventListener('click', (e) => {
      const b = e.target.closest('.js-filter'); if (!b) return;
      setModalidad(b.dataset.key);
    });

    // Tabs de área
    $('#area-tabs')?.addEventListener('click', (e) => {
      const b = e.target.closest('.js-area'); if (!b) return;
      state.area = b.dataset.area;
      track('select_area', { value: state.area });
      renderAreaTabs();
      applyCatFilters();
    });

    // Catálogo → WhatsApp
    $('#cat-grid')?.addEventListener('click', (e) => {
      const b = e.target.closest('.js-cat'); if (!b) return;
      const item = (CAT.catalogo || []).find((x) => x.id === b.dataset.id);
      if (!item) return;
      track('click_whatsapp_card', { item: item.title });
      openWa(msgCatalogo(item), 'click_whatsapp_card');
    });

    // Precios → WhatsApp
    $('#price-grid')?.addEventListener('click', (e) => {
      const b = e.target.closest('.js-plan'); if (!b) return;
      const list = $('#price-grid').__list || [];
      const plan = list[Number(b.dataset.i)];
      if (!plan) return;
      openWa(msgPlan(plan), 'click_whatsapp_card');
    });

    // Rutas → WhatsApp
    $('#rutas-grid')?.addEventListener('click', (e) => {
      const b = e.target.closest('.js-ruta'); if (!b) return;
      const r = (CAT.rutas || [])[Number(b.dataset.i)];
      if (!r) return;
      openWa('Hola Musicala 👋\n\n' + r.wa + '\n\n¿Me comparten opciones, horarios y valores?', 'click_whatsapp_ruta');
    });

    // CTAs WhatsApp generales
    $('#hero-wa')?.addEventListener('click', () => openWa(floatingMessage(), 'click_whatsapp_hero'));
    $('#wa-fab')?.addEventListener('click', () => openWa(floatingMessage(), 'click_whatsapp_fab'));
    const footWa = $('#foot-wa');
    if (footWa) {
      footWa.setAttribute('href', waUrl(META.defaultText || 'Hola Musicala 👋'));
      footWa.setAttribute('target', '_blank');
      footWa.setAttribute('rel', 'noopener');
    }

    // Smooth scroll topnav
    document.addEventListener('click', (e) => {
      const a = e.target.closest('.topnav a[href^="#"], a.btn[href^="#"]');
      if (!a) return;
      const id = (a.getAttribute('href') || '').slice(1);
      const sec = id && document.getElementById(id);
      if (!sec) return;
      e.preventDefault();
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* =========================================================================
     BOOT
  ========================================================================= */
  function boot() {
    if (!window.MUSICALA_CATALOG) { console.warn('MUSICALA_CATALOG no cargado'); return; }
    renderConfianza();
    renderPasos();
    renderRutas();
    renderFaq();
    renderVideos();
    renderFiltros();
    renderPrecios();
    renderAreaTabs();
    renderCatalogo();
    renderReco();
    wireReco();
    wireEvents();
    setupHeroVideo();
    setupReveal();
    updateWaBubble();
    setTimeout(() => { const b = $('#wa-bubble'); if (b) b.classList.add('show'); }, 2500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
