/* global window */
/* =============================================================================
   Musicala · Brochure Cotizador — DATOS (data.js)
   Todo el contenido editable vive aquí. Sin dependencias.
   Claves de modalidad: sede | hogar | virtual | online
============================================================================= */
(function () {
  'use strict';

  const MOD_LABEL = {
    sede: 'En sede',
    hogar: 'A domicilio',
    virtual: 'Virtual en vivo',
    online: 'Online',
  };

  // Emoji por área (se usa como fallback visual cuando no hay imagen)
  const AREA_EMOJI = {
    'Música': '🎵',
    'Danza': '💃',
    'Artes plásticas': '🎨',
    'Teatro': '🎭',
    'Otros': '✨',
  };

  window.MUSICALA_CATALOG = {
    /* ---------------------- META ---------------------- */
    meta: {
      whatsappNumber: '573193529475',
      defaultText: 'Hola Musicala 👋\n\nQuiero información sobre planes y precios 🙂',
      city: 'Bogotá',
      address: 'Carrera 45A #103B-34, Bogotá',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Carrera%2045A%20%23103B-34%2C%20Bogot%C3%A1',
      instagram: 'https://instagram.com/imusicala',
      website: 'https://www.imusicala.com',
      modLabel: MOD_LABEL,
      areaEmoji: AREA_EMOJI,
    },

    /* ---------------------- BLOQUE DE CONFIANZA ---------------------- */
    confianza: [
      { icon: '🌱', text: 'Rutas para empezar desde cero.' },
      { icon: '👨‍👩‍👧', text: 'Clases para niños, jóvenes y adultos.' },
      { icon: '🎨', text: 'Música, danza, artes plásticas y teatro en un solo lugar.' },
      { icon: '🔀', text: 'Modalidades flexibles: sede, domicilio, virtual y online.' },
      { icon: '🤝', text: 'Acompañamiento humano y cercano.' },
      { icon: '🎁', text: 'Clase de cortesía según disponibilidad.' },
    ],

    /* ---------------------- EMPIEZA EN 3 PASOS ---------------------- */
    pasos: [
      { n: 1, title: 'Elige el área o responde la guía', text: 'Cuéntanos qué te gusta o deja que el recomendador te oriente.' },
      { n: 2, title: 'Te recomendamos el plan ideal', text: 'Según edad, área, modalidad y objetivo.' },
      { n: 3, title: 'Coordinamos horario y empiezas', text: 'Resolvemos detalles por WhatsApp y arrancas tu clase.' },
    ],

    /* ---------------------- TABLA DE PRECIOS ---------------------- */
    precios: [
      {
        nombre: 'Grupal',
        precio: 'Plan de 4 clases desde $160.000',
        ideal: 'Quien disfruta aprender acompañado y a buen precio.',
        modalidad: 'sede',
        plan: 'Grupal',
      },
      {
        nombre: 'Personalizado en sede',
        precio: 'Plan de 4 clases desde $314.000',
        ideal: 'Quien quiere avanzar rápido con atención 1 a 1.',
        modalidad: 'sede',
        plan: 'Personalizado en sede',
      },
      {
        nombre: 'A domicilio',
        precio: 'Plan de 4 clases desde $320.000',
        ideal: 'Quien prefiere aprender desde casa con el docente.',
        modalidad: 'hogar',
        plan: 'A domicilio',
      },
      {
        nombre: 'Virtual en vivo',
        precio: 'Plan de 4 clases desde $282.000',
        ideal: 'Quien quiere clase en vivo desde donde esté.',
        modalidad: 'virtual',
        plan: 'Virtual en vivo',
      },
      {
        nombre: 'Plataforma Online',
        precio: 'Plan mensual desde $56.000',
        ideal: 'Quien quiere aprender a su ritmo con contenido siempre disponible.',
        modalidad: 'online',
        plan: 'Plataforma Online',
      },
    ],
    preciosNota:
      'Los valores pueden variar según modalidad, disponibilidad, programa y frecuencia. Te guiamos por WhatsApp para elegir la mejor opción.',

    /* ---------------------- RUTAS RECOMENDADAS ---------------------- */
    rutas: [
      { icon: '🌱', title: 'Quiero empezar desde cero', reco: 'Grupal o personalizado inicial.', wa: 'Quiero empezar desde cero. ¿Me recomiendan un plan grupal o personalizado inicial?' },
      { icon: '🚀', title: 'Quiero avanzar rápido', reco: 'Personalizado.', wa: 'Quiero avanzar rápido. Me interesa el plan personalizado.' },
      { icon: '🏠', title: 'Quiero aprender desde casa', reco: 'A domicilio o virtual en vivo.', wa: 'Quiero aprender desde casa, en modalidad a domicilio o virtual en vivo.' },
      { icon: '🧸', title: 'Es para un niño pequeño', reco: 'Musibabies o Música 4-6.', wa: 'Es para un niño pequeño. ¿Me cuentan sobre Musibabies o Música para niños?' },
      { icon: '✨', title: 'Quiero probar primero', reco: 'Clase de cortesía según disponibilidad.', wa: 'Quiero probar primero con una clase de cortesía según disponibilidad.' },
    ],

    /* ---------------------- RECOMENDADOR GUIADO ---------------------- */
    recomendador: {
      pasos: [
        {
          id: 'para',
          label: '¿Para quién es la clase?',
          field: 'Es para',
          options: ['Niño/a', 'Adolescente', 'Adulto', 'Empresa / grupo', 'No estoy seguro'],
        },
        {
          id: 'edad',
          label: '¿Qué edad tiene?',
          field: 'Edad',
          options: ['0 a 3 años', '4 a 6 años', '7 a 12 años', '13 a 17 años', 'Adulto'],
        },
        {
          id: 'area',
          label: '¿Qué área te interesa?',
          field: 'Área',
          options: ['Música', 'Danza', 'Artes plásticas', 'Teatro', 'No sé, quiero recomendación'],
        },
        {
          id: 'interes',
          label: '¿Qué quieres aprender?',
          field: 'Interés',
          // opciones dinámicas según área (ver intereses abajo)
          dynamic: 'area',
        },
        {
          id: 'modalidad',
          label: '¿Cómo prefieres aprender?',
          field: 'Modalidad preferida',
          options: ['En sede', 'A domicilio', 'Virtual en vivo', 'Online', 'No sé todavía'],
        },
        {
          id: 'objetivo',
          label: '¿Cuál es tu objetivo?',
          field: 'Objetivo',
          options: [
            'Empezar desde cero',
            'Retomar',
            'Avanzar rápido',
            'Preparar una presentación o audición',
            'Hobby',
            'Probar primero con clase de cortesía',
          ],
        },
      ],
      // Intereses por área (paso 4)
      intereses: {
        'Música': ['Piano', 'Guitarra', 'Canto', 'Violín', 'Ukelele', 'Bajo', 'Teclado', 'Musibabies', 'Música para niños'],
        'Danza': ['Ballet', 'Salsa', 'Danza urbana', 'Ritmos latinos', 'Danza para niños'],
        'Artes plásticas': ['Dibujo', 'Pintura', 'Arte infantil', 'Preuniversitario artes plásticas'],
        'Teatro': ['Teatro infantil', 'Teatro juvenil', 'Teatro para adultos', 'Expresión escénica'],
        'No sé, quiero recomendación': ['No sé, quiero recomendación'],
      },
    },

    /* ---------------------- FILTROS DE MODALIDAD (barra visible) ---------------------- */
    filtros: [
      { key: '', label: 'Ver todo' },
      { key: 'sede', label: 'En sede' },
      { key: 'hogar', label: 'A domicilio' },
      { key: 'virtual', label: 'Virtual en vivo' },
      { key: 'online', label: 'Online' },
    ],

    /* ---------------------- CATÁLOGO COMPLETO ----------------------
       img: opcional. Si falta o falla, se muestra fallback con emoji del área.
    -------------------------------------------------------------- */
    catalogo: [
      // ---- MÚSICA ----
      { id: 'piano', area: 'Música', title: 'Piano', img: './assets/catalogo/piano.png', modalidades: ['sede', 'hogar', 'virtual'],
        bullets: ['Para niños, jóvenes y adultos.', 'Puedes empezar desde cero.', 'Técnica, canciones y lectura a tu ritmo.'] },
      { id: 'guitarra', area: 'Música', title: 'Guitarra', img: './assets/catalogo/guitarra.png', modalidades: ['sede', 'hogar', 'virtual'],
        bullets: ['Acordes y ritmo desde el primer día.', 'Canciones reales que te gustan.', 'Avance rápido y práctico.'] },
      { id: 'canto', area: 'Música', title: 'Canto', img: './assets/catalogo/canto.png', modalidades: ['sede', 'virtual'],
        bullets: ['Respiración, afinación y técnica vocal.', 'Repertorio según tu estilo.', 'Ideal para ganar confianza al cantar.'] },
      { id: 'violin', area: 'Música', title: 'Violín', img: './assets/catalogo/violin.png', modalidades: ['sede', 'hogar', 'virtual'],
        bullets: ['Postura y técnica desde cero.', 'Lectura musical guiada.', 'Para niños, jóvenes y adultos.'] },
      { id: 'ukelele', area: 'Música', title: 'Ukelele', img: './assets/catalogo/ukelele.png', modalidades: ['sede', 'virtual'],
        bullets: ['Fácil y divertido para empezar.', 'Toca canciones muy pronto.', 'Ideal como primer instrumento.'] },
      { id: 'bajo', area: 'Música', title: 'Bajo', img: './assets/catalogo/bajo.png', modalidades: ['sede', 'virtual'],
        bullets: ['Groove y acompañamiento.', 'Técnica para tocar en banda.', 'Desde cero o nivel intermedio.'] },
      { id: 'teclado', area: 'Música', title: 'Teclado', img: './assets/catalogo/teclado.png', modalidades: ['sede', 'hogar', 'virtual'],
        bullets: ['Armonía y acompañamiento.', 'Canciones y sonidos.', 'Ideal para iniciar en teclas.'] },
      { id: 'musibabies', area: 'Música', title: 'Musibabies', img: './assets/catalogo/musibabies.png', modalidades: ['sede'],
        bullets: ['Estimulación musical temprana.', 'Para los más pequeños (0-3).', 'Juego, ritmo y vínculo.'] },
      { id: 'musica-ninos', area: 'Música', title: 'Música para niños 4-6', img: './assets/catalogo/musica-ninos.png', modalidades: ['sede'],
        bullets: ['Primer acercamiento a la música.', 'Juego y exploración sonora.', 'Bases para seguir aprendiendo.'] },

      // ---- DANZA ----
      { id: 'ballet', area: 'Danza', title: 'Ballet', img: './assets/catalogo/ballet.png', modalidades: ['sede'],
        bullets: ['Técnica, postura y elegancia.', 'Para niños, jóvenes y adultos.', 'Progreso por niveles.'] },
      { id: 'salsa', area: 'Danza', title: 'Salsa', img: './assets/catalogo/salsa.png', modalidades: ['sede'],
        bullets: ['Aprende desde cero.', 'Conexión, ritmo y figuras.', 'Ambiente bacano y social.'] },
      { id: 'danza-urbana', area: 'Danza', title: 'Danza urbana', img: './assets/catalogo/danza-urbana.png', modalidades: ['sede'],
        bullets: ['Estilos actuales y coreografías.', 'Energía y expresión.', 'Para jóvenes y adultos.'] },
      { id: 'ritmos-latinos', area: 'Danza', title: 'Ritmos latinos', img: './assets/catalogo/ritmos-latinos.png', modalidades: ['sede'],
        bullets: ['Salsa, merengue y más.', 'Suelta el cuerpo y disfruta.', 'Ideal para empezar a bailar.'] },
      { id: 'danza-ninos', area: 'Danza', title: 'Danza para niños', img: './assets/catalogo/danza-ninos.png', modalidades: ['sede'],
        bullets: ['Coordinación y ritmo jugando.', 'Confianza y expresión.', 'Pensada para los más pequeños.'] },
      { id: 'preu-danza', area: 'Danza', title: 'Preuniversitario danza', img: './assets/catalogo/preu-danza.png', modalidades: ['sede'],
        bullets: ['Preparación para audiciones.', 'Técnica y repertorio.', 'Acompañamiento enfocado.'] },

      // ---- ARTES PLÁSTICAS ----
      { id: 'dibujo', area: 'Artes plásticas', title: 'Dibujo', img: './assets/catalogo/dibujo.png', modalidades: ['sede', 'virtual'],
        bullets: ['Bases de forma, proporción, luz y color.', 'Proyectos guiados.', 'Para crear con más seguridad.'] },
      { id: 'pintura', area: 'Artes plásticas', title: 'Pintura', img: './assets/catalogo/pintura.png', modalidades: ['sede', 'virtual'],
        bullets: ['Color, técnica y composición.', 'Proyectos personales.', 'Desde cero o avanzado.'] },
      { id: 'arte-infantil', area: 'Artes plásticas', title: 'Arte infantil', img: './assets/catalogo/arte-infantil.png', modalidades: ['sede'],
        bullets: ['Creatividad y motricidad.', 'Exploración de materiales.', 'Diversión que enseña.'] },
      { id: 'preu-artes', area: 'Artes plásticas', title: 'Preuniversitario artes plásticas', img: './assets/catalogo/preu-artes.png', modalidades: ['sede'],
        bullets: ['Portafolio para tu carrera.', 'Técnica y conceptos.', 'Preparación para admisión.'] },

      // ---- TEATRO ----
      { id: 'teatro-infantil', area: 'Teatro', title: 'Teatro infantil', img: './assets/catalogo/teatro-infantil.png', modalidades: ['sede'],
        bullets: ['Expresión, confianza y creatividad.', 'Juegos escénicos.', 'Ideal para soltar la voz y el cuerpo.'] },
      { id: 'teatro-juvenil', area: 'Teatro', title: 'Teatro juvenil', img: './assets/catalogo/teatro-juvenil.png', modalidades: ['sede'],
        bullets: ['Improvisación y montaje.', 'Trabajo en equipo.', 'Confianza para hablar en público.'] },
      { id: 'teatro-adultos', area: 'Teatro', title: 'Teatro para adultos', img: './assets/catalogo/teatro-adultos.png', modalidades: ['sede'],
        bullets: ['Expresión y presencia escénica.', 'Suelta cuerpo y voz.', 'Un espacio para crear.'] },
      { id: 'expresion-escenica', area: 'Teatro', title: 'Expresión escénica', img: './assets/catalogo/expresion-escenica.png', modalidades: ['sede', 'virtual'],
        bullets: ['Comunicación y oratoria.', 'Manejo del escenario.', 'Confianza frente al público.'] },

      // ---- OTROS SERVICIOS ----
      { id: 'vacacionales', area: 'Otros', title: 'Vacacionales artísticos', modalidades: ['sede'],
        bullets: ['Planes en temporada de vacaciones.', 'Varias artes en pocos días.', 'Diversión y aprendizaje.'] },
      { id: 'intensivos', area: 'Otros', title: 'Intensivos artísticos', modalidades: ['sede'],
        bullets: ['Avanza mucho en poco tiempo.', 'Enfoque concentrado.', 'Ideal para metas puntuales.'] },
      { id: 'spaces', area: 'Otros', title: 'Musicala Spaces', modalidades: ['sede'],
        bullets: ['Espacios para crear y ensayar.', 'Ambiente artístico.', 'Pregunta por disponibilidad.'] },
      { id: 'tarjetas-regalo', area: 'Otros', title: 'Tarjetas regalo', modalidades: ['sede', 'virtual', 'online'],
        bullets: ['Regala arte a quien quieras.', 'Válida para varias áreas.', 'Un regalo que deja huella.'] },
      { id: 'musigym', area: 'Otros', title: 'MusiGym', modalidades: ['sede'],
        bullets: ['Entrenamiento artístico-corporal.', 'Energía y movimiento.', 'Pregúntanos cómo funciona.'] },
    ],

    /* ---------------------- VIDEOS POR ÁREA (sección destacada) ---------------------- */
    videos: [
      { area: 'Música', src: './assets/videos/musica-general.mp4', poster: './assets/areas/musica.png', title: 'Música' },
      { area: 'Danza', src: './assets/videos/danza-general.mp4', poster: './assets/areas/danza.png', title: 'Danza' },
      { area: 'Artes plásticas', src: './assets/videos/artes-plasticas.mp4', poster: './assets/areas/artes-plasticas.png', title: 'Artes plásticas' },
      { area: 'Teatro', src: './assets/videos/teatro-general.mp4', poster: './assets/areas/teatro.png', title: 'Teatro' },
    ],

    /* ---------------------- FAQs ---------------------- */
    faqs: [
      { q: '¿Qué incluye el plan?', a: 'Clases con docente, plan adaptado a tu nivel y acompañamiento. El detalle exacto depende del área y la modalidad; te lo confirmamos por WhatsApp.' },
      { q: '¿Puedo empezar desde cero?', a: '¡Claro! La mayoría empieza sin experiencia. Te armamos una ruta según tu objetivo.' },
      { q: '¿Reciben adultos?', a: 'Sí. Tenemos clases para jóvenes y adultos en todas las áreas.' },
      { q: '¿Reciben niños pequeños?', a: 'Sí. Para los más pequeños tenemos Musibabies y Música para niños 4-6.' },
      { q: '¿Puedo tomar clase a domicilio?', a: 'Sí, vamos a tu casa en Bogotá según disponibilidad y zona. Escríbenos y coordinamos.' },
      { q: '¿Qué diferencia hay entre virtual en vivo y online?', a: 'Virtual en vivo es clase real con docente por videollamada. Online es la plataforma con contenido disponible siempre para aprender a tu ritmo.' },
      { q: '¿Puedo probar primero?', a: 'Sí, tenemos clase de cortesía según disponibilidad y cupos.' },
      { q: '¿Cómo se coordinan los horarios?', a: 'Según modalidad y disponibilidad. Por WhatsApp te proponemos opciones que se ajusten a ti.' },
      { q: '¿Dónde queda la sede?', a: 'Carrera 45A #103B-34, Bogotá. Puedes abrir la ubicación en Google Maps desde esta página.' },
      { q: '¿Cómo pago?', a: 'Coordinamos el pago por WhatsApp con varias opciones. Te guiamos paso a paso.' },
      { q: '¿Qué plan me recomiendan si no sé qué elegir?', a: 'Usa el recomendador de esta página o escríbenos: con tu edad, área y objetivo te sugerimos la mejor opción.' },
    ],
  };
})();
