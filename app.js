// Musicala · Flujo guiado + Cotización descargable (imagen)
// Porque la gente no lee, pero sí reenvía una imagen.

const WA_NUMBER = "573193529475";

function waLink(text) {
  const base = `https://wa.me/${WA_NUMBER}`;
  return `${base}?text=${encodeURIComponent((text || "").trim())}`;
}

// ====== MAPA: planId -> archivo de imagen ======
// Asegúrate de que estos PNG estén en la misma carpeta del proyecto.
const PRICE_IMAGES = {
  // Virtual
  "virtual-vivo": "planes clases virtuales.jpg",

  // Sede
  "sede-personal": "planes sede personalizado.jpg",
  "sede-grupal": "planes sede grupal.jpg",
  "musifam-2p-sede": "planes musifamiliar 2p sede.jpg",

  // Hogar
  "hogar-personal": "planes hogar personalizado.jpg",
  "hogar-grupal": "planes musifamiliar hogar grupal.jpg",
  "musifam-2p-hogar": "planes musifamiliar hogar 2p.jpg",

  // Suscripciones
  "automusicala": "planes automusicala.jpg",
  "musigym": "planes musigym.png",
};

// Imagen por defecto si no hay plan seleccionado (o si no existe en el mapa)
const DEFAULT_QUOTE_IMG = "planes sede personalizado.jpg";

// ====== DATA EDITABLE ======
const DATA = {
  globals: {
    enrollmentFee: "$60.000",
    artsIncluded: "Música, Danza, Artes plásticas y Teatro",
    trialClass: "Todos los planes incluyen clase de prueba (con costo menor) según disponibilidad.",
    classPacks: "Paquetes de 4, 8, 12 y 24 clases (según plan).",
    intensives: "En vacaciones tenemos temporada de descuento: Cursos Intensivos (jun–jul / dic–ene).",
    giftCards: "Se pueden adquirir tarjetas de regalo para todos los servicios.",
    alliances: "Hacemos convenios y alianzas con empresas para beneficios.",
  },

  lines: [
    { id: "musica", title: "Música", icon: "🎵", desc: "Instrumento, canto/ensamble y teoría aplicada." },
    { id: "danza", title: "Danza", icon: "💃", desc: "Técnica, ritmo, coordinación y montaje." },
    { id: "plasticas", title: "Artes plásticas", icon: "🎨", desc: "Dibujo, pintura, materiales y proyectos." },
    { id: "teatro", title: "Teatro", icon: "🎭", desc: "Voz, expresión, improvisación y escenas." },
  ],

  modes: [
    { id: "sede", title: "En sede", icon: "🏫", desc: "Pasadena (Bogotá)." },
    { id: "hogar", title: "Hogar", icon: "🏠", desc: "A domicilio (según zona)." },
    { id: "virtual", title: "Virtual en vivo", icon: "💻", desc: "Clases por videollamada." },
    { id: "online", title: "Programas online", icon: "📚", desc: "Autoguiado por módulos." },
  ],

  plansByMode: {
    sede: [
      {
        id: "sede-personal",
        name: "Sede · Personalizadas",
        price: "Ver imagen de precios",
        bullets: [
          "Para todas las artes",
          "Ruta por niveles",
          "Horario según disponibilidad",
          "Paquetes: 4 / 8 / 12 / 24 clases",
        ],
      },
      {
        id: "sede-grupal",
        name: "Sede · Cursos libres grupales",
        price: "Ver imagen de precios",
        bullets: [
          "Para todas las artes",
          "Ambiente motivador",
          "Horarios por nivel y edad",
          "Paquetes: 4 / 8 / 12 / 24 clases",
        ],
      },
      {
        id: "musifam-2p-sede",
        name: "Musifamiliar 2P (en sede)",
        price: "Ver imagen de precios",
        bullets: ["2 personas", "Ideal para familia/pareja", "Paquetes: 4 / 8 / 12 / 24 clases"],
      },
      {
        id: "musifam-grupal-sede",
        name: "Musifamiliar grupal (hasta 8)",
        price: "Ver imagen de precios",
        bullets: ["Hasta 8 personas (mismo núcleo)", "Experiencia en grupo", "Paquetes: 4 / 8 / 12 / 24 clases"],
      },
      {
        id: "preuniversitario",
        name: "Preuniversitario",
        price: "Ver imagen de precios",
        bullets: ["Preparación artística", "Enfoque técnico y repertorio", "Horario según convocatoria"],
      },
      {
        id: "vacacionales",
        name: "Vacacionales (jun–jul / dic–ene)",
        price: "Ver imagen de precios",
        bullets: ["Para todas las edades", "Para todas las artes", "Opción Cursos Intensivos (descuento)"],
      },
      {
        id: "cursos-formacion",
        name: "Cursos de formación (inicio a fin)",
        price: "Ver imagen de precios",
        bullets: ["Fechas definidas (inicio y cierre)", "Proceso estructurado", "Cupos y horarios por convocatoria"],
      },
      {
        id: "cap-docente",
        name: "Capacitación artística docente",
        price: "Ver imagen de precios",
        bullets: ["Para artistas/docentes", "Pedagogía + práctica", "Por cohorte / convocatoria"],
      },
      {
        id: "musigym",
        name: "MusiGym (suscripción)",
        price: "Suscripción",
        bullets: [
          "Vienes cuando quieras",
          "Proceso autónomo (con guía)",
          "Mensual / Bimestral / Trimestral / Semestral",
        ],
      },
      {
        id: "taller-colectivo",
        name: "Taller colectivo",
        price: "Mismo valor (sede o donde sea)",
        bullets: ["Ideal para empresas y grupos grandes", "Una sesión (o por acuerdo)", "Mismo valor en sede o fuera"],
      },
      {
        id: "taller-eventual",
        name: "Taller eventual (una sola sesión)",
        price: "Según tema",
        bullets: ["Ocasional", "Una sola sesión", "Para todas las edades (según taller)"],
      },
    ],

    hogar: [
      {
        id: "hogar-personal",
        name: "Hogar · Personalizado",
        price: "Ver imagen de precios",
        bullets: ["A domicilio (según zona)", "Para todas las artes", "Paquetes: 4 / 8 / 12 / 24 clases"],
      },
      {
        id: "musifam-2p-hogar",
        name: "Hogar · Musifamiliar 2P",
        price: "Ver imagen de precios",
        bullets: ["2 personas", "A domicilio", "Paquetes: 4 / 8 / 12 / 24 clases"],
      },
      {
        id: "hogar-grupal",
        name: "Hogar · Grupal",
        price: "Ver imagen de precios",
        bullets: ["Grupo (según tamaño)", "A domicilio", "Paquetes: 4 / 8 / 12 / 24 clases"],
      },
      {
        id: "taller-colectivo",
        name: "Taller colectivo",
        price: "Mismo valor (sede o donde sea)",
        bullets: ["Ideal para empresas y grupos grandes", "Una sesión (o por acuerdo)", "Mismo valor en sede o fuera"],
      },
    ],

    virtual: [
      {
        id: "virtual-vivo",
        name: "Virtual en vivo",
        price: "Ver imagen de precios",
        bullets: ["Clases por videollamada", "Para todas las artes", "Paquetes: 4 / 8 / 12 / 24 clases"],
      },
      {
        id: "taller-colectivo",
        name: "Taller colectivo",
        price: "Mismo valor (sede o donde sea)",
        bullets: ["Ideal para empresas y grupos grandes", "Una sesión (o por acuerdo)", "Mismo valor en sede o fuera"],
      },
    ],

    online: [
      {
        id: "automusicala",
        name: "AutoMusicala (programas online)",
        price: "Suscripción",
        bullets: [
          "Proceso autoguiado por módulos",
          "Mensual / Bimestral / Trimestral / Semestral",
          "Ideal para complementar o avanzar a tu ritmo",
        ],
      },
      {
        id: "musigym",
        name: "MusiGym (suscripción)",
        price: "Suscripción",
        bullets: [
          "Vienes cuando quieras",
          "Proceso autónomo (con guía)",
          "Mensual / Bimestral / Trimestral / Semestral",
        ],
      },
    ],
  },
};

// ====== STATE ======
const state = {
  step: 1,
  line: null,
  mode: null,
  plan: null,
  age: "",
  days: "",
  hours: "",
  doubts: "",
};

function $(id) {
  return document.getElementById(id);
}

// ====== Cotización (imagen) ======
function getQuoteImageForSelection() {
  const planId = state.plan?.id;
  if (planId && PRICE_IMAGES[planId]) return PRICE_IMAGES[planId];

  // Si NO hay plan, intenta un fallback por modalidad (opcional)
  const modeId = state.mode?.id;
  if (modeId === "virtual") return "planes clases virtuales.jpg";
  if (modeId === "online") return "planes automusicala.jpg";
  if (modeId === "hogar") return "planes hogar personalizado.jpg";
  if (modeId === "sede") return "planes sede personalizado.jpg";

  return DEFAULT_QUOTE_IMG;
}

function updateQuoteImageUI() {
  const file = getQuoteImageForSelection();
  const url = encodeURI(file);

  const img = $("quoteImg");
  const dl = $("downloadQuoteBtn");
  const open = $("openQuoteBtn");

  if (img) img.src = url;
  if (dl) {
    dl.href = url;
    dl.setAttribute("download", file.split("/").pop());
  }
  if (open) open.href = url;
}

// ====== WhatsApp buttons ======
function setTopWhatsAppLinks() {
  const baseMsg = "Hola Musicala 🙂 Quiero información por favor.";
  ["waTop", "waFloat"].forEach((id) => {
    const el = $(id);
    if (el) el.href = waLink(baseMsg);
  });
}

// ====== Render helpers ======
function renderChoices(containerId, items, onPick, selectedId) {
  const box = $(containerId);
  if (!box) return;

  box.innerHTML = items
    .map(
      (it) => `
    <button class="choice ${selectedId === it.id ? "is-selected" : ""}" type="button" data-id="${it.id}">
      <div class="choice__icon" aria-hidden="true">${it.icon}</div>
      <div class="choice__title">${it.title}</div>
      <p class="choice__desc">${it.desc}</p>
    </button>
  `
    )
    .join("");

  box.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => onPick(btn.dataset.id));
  });
}

function renderPlans() {
  const box = $("planChoices");
  if (!box) return;

  const list = state.mode ? DATA.plansByMode[state.mode.id] || [] : [];
  if (!state.mode) {
    box.innerHTML = `<p class="muted">Primero elige una modalidad (paso 3).</p>`;
    return;
  }
  if (!list.length) {
    box.innerHTML = `<p class="muted">No hay planes configurados para esta modalidad (todavía).</p>`;
    return;
  }

  box.innerHTML = list
    .map(
      (p) => `
    <button class="plan ${state.plan?.id === p.id ? "is-selected" : ""}" type="button" data-id="${p.id}">
      <div class="plan__name">${p.name}</div>
      <div class="plan__price">${p.price}</div>
      <ul class="plan__list">
        ${(p.bullets || []).map((b) => `<li>${b}</li>`).join("")}
      </ul>
    </button>
  `
    )
    .join("");

  box.querySelectorAll(".plan").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const plan = list.find((x) => x.id === id);
      state.plan = plan || null;

      updateSummary();
      renderPlans(); // para marcar selected
    });
  });
}

// ====== Step system ======
function setStep(n) {
  state.step = Math.max(1, Math.min(5, n));

  // panels
  document.querySelectorAll(".panel").forEach((p) => {
    p.classList.toggle("is-active", Number(p.dataset.step) === state.step);
  });

  // stepper
  document.querySelectorAll(".stepper__step").forEach((s) => {
    s.classList.toggle("is-active", Number(s.dataset.go) === state.step);
  });

  const pill = $("stepPill");
  if (pill) pill.textContent = `Paso ${state.step}/5`;

  if (state.step === 2) {
    renderChoices(
      "lineChoices",
      DATA.lines,
      (pickId) => {
        state.line = DATA.lines.find((x) => x.id === pickId) || null;
        updateSummary();
        setTimeout(() => setStep(3), 120);
      },
      state.line?.id
    );
  }

  if (state.step === 3) {
    renderChoices(
      "modeChoices",
      DATA.modes,
      (pickId) => {
        state.mode = DATA.modes.find((x) => x.id === pickId) || null;
        state.plan = null; // reset plan when mode changes
        updateSummary();
        setTimeout(() => setStep(4), 120);
      },
      state.mode?.id
    );
  }

  if (state.step === 4) {
    renderPlans();
  }

  updateSummary();
}

// ====== Summary + WhatsApp message ======
function formatSummaryHTML() {
  const line = state.line?.title || "—";
  const mode = state.mode?.title || "—";
  const planName = state.plan?.name || "—";
  const planPrice = state.plan?.price || "—";

  return `
    <div class="sum">
      <div><strong>Arte:</strong> ${line}</div>
      <div><strong>Modalidad:</strong> ${mode}</div>
      <div><strong>Plan:</strong> ${planName}</div>
      <div><strong>Valor:</strong> ${planPrice}</div>

      <hr style="border:0;border-top:1px solid rgba(12,10,30,.10);margin:10px 0;">

      <div><strong>Matrícula anual:</strong> ${DATA.globals.enrollmentFee}</div>
      <div><strong>Incluye:</strong> clase de prueba + paquetes 4/8/12/24 (según plan)</div>
      <div><strong>Artes:</strong> ${DATA.globals.artsIncluded}</div>
      <div class="tiny muted" style="margin-top:8px;">${DATA.globals.intensives}</div>

      <hr style="border:0;border-top:1px solid rgba(12,10,30,.10);margin:10px 0;">

      <div><strong>Edad:</strong> ${state.age || "—"}</div>
      <div><strong>Días posibles:</strong> ${state.days || "—"}</div>
      <div><strong>Horarios:</strong> ${state.hours || "—"}</div>
      <div><strong>Dudas:</strong> ${state.doubts || "—"}</div>
    </div>
  `;
}

function buildWhatsAppMessage() {
  const line = state.line?.title || "—";
  const mode = state.mode?.title || "—";
  const planName = state.plan?.name || "—";
  const planPrice = state.plan?.price || "—";
  const quoteImg = getQuoteImageForSelection();

  const isSubscription = (state.plan?.id === "musigym" || state.plan?.id === "automusicala");
  const packsNote = isSubscription
    ? "• Suscripción: mensual / bimestral / trimestral / semestral (según plan)"
    : "• Paquetes: 4 / 8 / 12 / 24 clases (según plan)";

  // Link de la imagen: si lo van a usar en web pública (GitHub Pages), esto queda perfecto.
  // Si lo abren local, el link no sirve en WhatsApp. Igual lo dejamos, y el usuario puede enviar la imagen descargada.
  const imgNote = `• Imagen del plan: ${quoteImg}`;

  const parts = [
    "Hola Musicala 🙂",
    "Quiero información y cotización, según esto:",
    "",
    `• Arte: ${line}`,
    `• Modalidad: ${mode}`,
    `• Plan: ${planName}`,
    `• Valor: ${planPrice}`,
    imgNote,
    "",
    `• Matrícula anual: ${DATA.globals.enrollmentFee}`,
    `• Artes incluidas: ${DATA.globals.artsIncluded}`,
    `• Clase de prueba: Sí (con costo menor, según disponibilidad)`,
    packsNote,
    `• Cursos Intensivos (vacaciones): Sí, si aplica (jun–jul / dic–ene)`,
    "",
    `• Edad: ${state.age || "—"}`,
    `• Días posibles: ${state.days || "—"}`,
    `• Horarios: ${state.hours || "—"}`,
  ];

  if (state.doubts?.trim()) {
    parts.push("", `• Dudas: ${state.doubts.trim()}`);
  }

  parts.push("", "Gracias 🙌");
  return parts.join("\n");
}

function updateSummary() {
  const box = $("summaryBox");
  if (box) box.innerHTML = formatSummaryHTML();

  // Actualiza la imagen de cotización (y botones descargar/abrir)
  updateQuoteImageUI();

  // Link del botón enviar
  const send = $("sendBtn");
  if (send) send.href = waLink(buildWhatsAppMessage());
}

// ====== Events ======
function wireNavButtons() {
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => setStep(state.step + 1));
  });
  document.querySelectorAll("[data-prev]").forEach((btn) => {
    btn.addEventListener("click", () => setStep(state.step - 1));
  });

  document.querySelectorAll(".stepper__step").forEach((btn) => {
    btn.addEventListener("click", () => setStep(Number(btn.dataset.go)));
  });

  const start = $("startBtn");
  if (start)
    start.addEventListener("click", () => {
      document.getElementById("flow")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setStep(1), 120);
    });

  const reset = $("resetBtn");
  if (reset)
    reset.addEventListener("click", () => {
      state.step = 1;
      state.line = null;
      state.mode = null;
      state.plan = null;
      state.age = state.days = state.hours = state.doubts = "";

      ["age", "days", "hours", "doubts"].forEach((id) => {
        const el = $(id);
        if (el) el.value = "";
      });

      setStep(1);
      updateSummary();
    });

  const finish = $("finishBtn");
  if (finish)
    finish.addEventListener("click", () => {
      state.age = $("age")?.value?.trim() || "";
      state.days = $("days")?.value?.trim() || "";
      state.hours = $("hours")?.value?.trim() || "";
      state.doubts = $("doubts")?.value?.trim() || "";
      updateSummary();
      window.open(waLink(buildWhatsAppMessage()), "_blank", "noopener");
    });

  // Live update inputs
  ["age", "days", "hours", "doubts"].forEach((id) => {
    const el = $(id);
    if (!el) return;

    el.addEventListener("input", () => {
      if (id === "age") state.age = el.value.trim();
      if (id === "days") state.days = el.value.trim();
      if (id === "hours") state.hours = el.value.trim();
      if (id === "doubts") state.doubts = el.value.trim();
      updateSummary();
    });
  });
}

// ====== Init ======
document.addEventListener("DOMContentLoaded", () => {
  setTopWhatsAppLinks();
  wireNavButtons();
  updateQuoteImageUI();
  setStep(1);
});
