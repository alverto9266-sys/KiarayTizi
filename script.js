/* =========================================================
   INVITACIÓN DE BODA — TIZIANO & KIARA
   Lógica interactiva, Audio, Partículas y Cuenta Regresiva
   ========================================================= */

// CONFIGURACIÓN DE LA BODA (Datos oficiales de Tiziano y Kiara)
const WEDDING_CONFIG = {
  // Nombres de los novios
  groom: "Tiziano",
  bride: "Kiara",

  // Archivo de música oficial de la boda
  audioFile: "Coldplay - A Sky Full of Stars.mp3",
  songTitle: "Coldplay - A Sky Full of Stars",

  // Fecha y hora del evento: Lunes 30 de Noviembre de 2026 a las 20:00 hs (Argentina UTC-3)
  weddingDate: new Date('2026-11-30T20:00:00-03:00'),
  weddingEndDate: new Date('2026-12-01T05:00:00-03:00'),
  
  // Textos para mostrar en la portada
  displayWeekday: "LUNES",
  displayDay: "30",
  displayMonthYear: "NOVIEMBRE · 2026",

  // Ceremonia Religiosa
  ceremony: {
    venue: "Parroquia Nuestra Señora del Carmen",
    time: "20:00 HS",
    address: "9 de Julio 276, San Martín, Mendoza",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parroquia+Nuestra+Señora+del+Carmen+9+de+Julio+276+San+Martin+Mendoza"
  },

  // Fiesta / Recepción
  party: {
    venue: "Acacias Multieventos",
    time: "21:30 HS (A continuación)",
    address: "Carril Norte s/n (e/ Carril Montecaseros), Buen Orden, San Martín, Mendoza",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Acacias+Multieventos+San+Martin+Mendoza",
    parking: "Estacionamiento Privado"
  },

  // Código de Vestimenta
  dresscode: {
    style: "Elegante",
    description: "Queremos que te sientas radiante y cómodo/a para celebrar y bailar con nosotros toda la noche.",
    note: "Por favor, color blanco reservado para la novia."
  },

  // Confirmación de Asistencia (RSVP)
  rsvp: {
    deadline: "24 de Noviembre de 2026",
    googleFormsUrl: "https://forms.gle/QVqx4ek6T9vk6M8d7"
  },

  // Datos para Regalo / Cuenta bancaria
  gifts: {
    alias: "kiara.tizi.boda",
    holder: "Tiziano & Kiara"
  },

  // Playlist colaborativa de Spotify
  spotify: {
    url: "https://open.spotify.com/playlist/1KyTA7UHCkBmMSjdYw7jZi?si=Z83s9wfxQy-Ls1eCG9WtAg&utm_source=copy-link&pi=KgLjugJuRaa1c"
  }
};

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  applyConfigData();
  initParticles();
  initAudioAndWelcome();
  initCountdown();
  initCopyActions();
  initCalendarButton();
  initScrollAnimations();
});

/* =========================================================
   0. APLICAR DATOS DE CONFIGURACIÓN AL DOM
   ========================================================= */
function applyConfigData() {
  // Configuración de Audio
  const audioElement = document.getElementById('bg-audio');
  const musicTooltip = document.getElementById('music-tooltip');
  if (audioElement && WEDDING_CONFIG.audioFile) {
    const sourceEl = audioElement.querySelector('source');
    if (sourceEl) {
      sourceEl.src = WEDDING_CONFIG.audioFile;
      audioElement.load();
    }
  }
  if (musicTooltip && WEDDING_CONFIG.songTitle) {
    musicTooltip.textContent = WEDDING_CONFIG.songTitle;
  }

  // Portada
  const weekdayEl = document.getElementById('display-weekday');
  const dayEl = document.getElementById('display-day');
  const monthYearEl = document.getElementById('display-month-year');
  if (weekdayEl) weekdayEl.textContent = WEDDING_CONFIG.displayWeekday;
  if (dayEl) dayEl.textContent = WEDDING_CONFIG.displayDay;
  if (monthYearEl) monthYearEl.textContent = WEDDING_CONFIG.displayMonthYear;

  // Ceremonia
  const ceremonyVenue = document.getElementById('ceremony-venue');
  const ceremonyTime = document.getElementById('ceremony-time');
  const ceremonyAddress = document.getElementById('ceremony-address');
  const btnCeremonyMap = document.getElementById('btn-ceremony-map');

  if (ceremonyVenue) ceremonyVenue.textContent = WEDDING_CONFIG.ceremony.venue;
  if (ceremonyTime) ceremonyTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${WEDDING_CONFIG.ceremony.time}`;
  if (ceremonyAddress) ceremonyAddress.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${WEDDING_CONFIG.ceremony.address}`;
  if (btnCeremonyMap) btnCeremonyMap.href = WEDDING_CONFIG.ceremony.mapsUrl;

  // Fiesta
  const partyVenue = document.getElementById('party-venue');
  const partyTime = document.getElementById('party-time');
  const partyAddress = document.getElementById('party-address');
  const btnPartyMap = document.getElementById('btn-party-map');

  if (partyVenue) partyVenue.textContent = WEDDING_CONFIG.party.venue;
  if (partyTime) partyTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${WEDDING_CONFIG.party.time}`;
  if (partyAddress) partyAddress.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${WEDDING_CONFIG.party.address}`;
  if (btnPartyMap) btnPartyMap.href = WEDDING_CONFIG.party.mapsUrl;

  // Dress Code
  const dresscodeStyle = document.getElementById('dresscode-style');
  const dresscodeDesc = document.getElementById('dresscode-desc');
  const dresscodeNote = document.getElementById('dresscode-note');

  if (dresscodeStyle) dresscodeStyle.textContent = WEDDING_CONFIG.dresscode.style;
  if (dresscodeDesc) dresscodeDesc.textContent = WEDDING_CONFIG.dresscode.description;
  if (dresscodeNote) dresscodeNote.textContent = WEDDING_CONFIG.dresscode.note;

  // RSVP
  const rsvpDeadline = document.getElementById('rsvp-deadline');
  const btnRsvpLink = document.getElementById('btn-rsvp-link');

  if (rsvpDeadline) {
    rsvpDeadline.innerHTML = `<i class="fa-regular fa-calendar-check"></i> Por favor confirmar antes del <strong>${WEDDING_CONFIG.rsvp.deadline}</strong>`;
  }

  if (btnRsvpLink) {
    btnRsvpLink.href = WEDDING_CONFIG.rsvp.googleFormsUrl;
  }

  // Regalos / Cuenta
  const aliasValue = document.getElementById('alias-value');
  const bankHolder = document.getElementById('bank-holder');

  if (aliasValue) aliasValue.textContent = WEDDING_CONFIG.gifts.alias;
  if (bankHolder) bankHolder.textContent = WEDDING_CONFIG.gifts.holder;

  // Spotify Playlist
  const btnSpotify = document.getElementById('btn-spotify');
  if (btnSpotify && WEDDING_CONFIG.spotify && WEDDING_CONFIG.spotify.url) {
    btnSpotify.href = WEDDING_CONFIG.spotify.url;
  }
}

/* =========================================================
   1. PARTICULAS DE DESTELLOS FLOTANTES (CANVAS)
   ========================================================= */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  const particleCount = window.innerWidth < 768 ? 35 : 65;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class WeddingGlowParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.4 + 0.8;
      this.speedY = -(Math.random() * 0.35 + 0.12);
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.6 + 0.15;
      this.fadeSpeed = Math.random() * 0.008 + 0.004;
      this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      this.opacity += this.fadeSpeed * this.fadeDir;
      if (this.opacity > 0.75) {
        this.opacity = 0.75;
        this.fadeDir = -1;
      } else if (this.opacity < 0.1) {
        this.opacity = 0.1;
        this.fadeDir = 1;
      }

      if (this.y < 0) this.y = height;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 156, 57, ${this.opacity})`;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new WeddingGlowParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* =========================================================
   2. REPRODUCTOR DE AUDIO Y APERTURA DE SOBRE
   ========================================================= */
function initAudioAndWelcome() {
  const audio = document.getElementById('bg-audio');
  const btnEnter = document.getElementById('btn-enter');
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const musicController = document.getElementById('music-controller');
  const btnMusicToggle = document.getElementById('btn-music-toggle');

  if (!audio) return;

  // Volumen agradable
  audio.volume = 0.8;

  function playAudio() {
    audio.play().then(() => {
      if (musicController) musicController.classList.add('playing');
    }).catch(err => {
      console.log('Audio autoplay prevenido por el navegador:', err);
    });
  }

  function pauseAudio() {
    audio.pause();
    if (musicController) musicController.classList.remove('playing');
  }

  // Apertura al hacer clic en el sello de cera o en cualquier parte del sobre
  let opened = false;
  function handleOpen() {
    if (opened) return;
    opened = true;
    playAudio();
    if (welcomeOverlay) {
      welcomeOverlay.classList.add('hidden');
      setTimeout(() => {
        welcomeOverlay.style.display = 'none';
      }, 800);
    }
  }

  if (btnEnter) {
    btnEnter.addEventListener('click', (e) => {
      e.stopPropagation();
      handleOpen();
    });
  }

  if (welcomeOverlay) {
    welcomeOverlay.addEventListener('click', handleOpen);
  }

  // Botón flotante para pausar o reproducir en cualquier momento
  if (btnMusicToggle) {
    btnMusicToggle.addEventListener('click', () => {
      if (audio.paused) {
        playAudio();
      } else {
        pauseAudio();
      }
    });
  }
}

/* =========================================================
   3. CUENTA REGRESIVA
   ========================================================= */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const now = new Date().getTime();
    const target = WEDDING_CONFIG.weddingDate.getTime();
    const distance = target - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* =========================================================
   4. AGENDAR EN GOOGLE CALENDAR
   ========================================================= */
function initCalendarButton() {
  const btn = document.getElementById('btn-add-calendar');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const title = encodeURIComponent(`Boda ${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride} 💍`);
    const details = encodeURIComponent(`¡El casamiento de ${WEDDING_CONFIG.groom} y ${WEDDING_CONFIG.bride}!\nCeremonia: ${WEDDING_CONFIG.ceremony.venue} (${WEDDING_CONFIG.ceremony.time})\nFiesta: ${WEDDING_CONFIG.party.venue} (${WEDDING_CONFIG.party.time})`);
    const location = encodeURIComponent(`${WEDDING_CONFIG.party.venue}, ${WEDDING_CONFIG.party.address}`);

    // Formato UTC para Google Calendar YYYYMMDDTHHMMSSZ
    function toGCalFormat(date) {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    }

    const startGCal = toGCalFormat(WEDDING_CONFIG.weddingDate);
    const endGCal = toGCalFormat(WEDDING_CONFIG.weddingEndDate);

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startGCal}/${endGCal}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  });
}

/* =========================================================
   5. COPIAR ALIAS Y CBU AL PORTAPAPELES
   ========================================================= */
function initCopyActions() {
  const btnCopyAlias = document.getElementById('btn-copy-alias');
  const btnCopyCbu = document.getElementById('btn-copy-cbu');
  const toast = document.getElementById('copy-toast');

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2500);
  }

  function copyText(text, btn, originalLabel) {
    navigator.clipboard.writeText(text).then(() => {
      btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>¡Copiado!</span>`;
      btn.style.background = '#c99c39';
      btn.style.color = '#ffffff';
      showToast(`¡Copiado al portapapeles! ✨`);

      setTimeout(() => {
        btn.innerHTML = `<i class="fa-regular fa-copy"></i> <span>${originalLabel}</span>`;
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  }

  if (btnCopyAlias) {
    btnCopyAlias.addEventListener('click', () => {
      copyText(WEDDING_CONFIG.gifts.alias, btnCopyAlias, 'Copiar');
    });
  }

  if (btnCopyCbu) {
    btnCopyCbu.addEventListener('click', () => {
      copyText(WEDDING_CONFIG.gifts.cbu, btnCopyCbu, 'Copiar');
    });
  }
}

/* =========================================================
   6. ANIMACIÓN AL HACER SCROLL (INTERSECTION OBSERVER)
   ========================================================= */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('active'));
  }
}
