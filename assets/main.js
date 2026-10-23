// Links hier eintragen
const LINKS = {
  github: "https://github.com/DEIN-USER/amnesies", // TODO: GitHub-Repo des SaaS
  app: "https://app.amnesies.com/login",          // TODO: Login-URL des SaaS
  x: "https://x.com/DEIN-ACCOUNT",                 // TODO: X-Account
};

const TEXT = {
  de: {
    lead: "Das Gedächtnis für deine KI. Open Source, selbst gehostet oder in der Cloud.",
    runLocally: "Lokal ausführen",
    signIn: "Anmelden",
    imprint: "Impressum",
    privacy: "Datenschutz",
    switchLang: "Switch to English",
    switchBg: "Hintergrund wechseln",
  },
  en: {
    lead: "Memory for your AI. Open source, self-hosted or in the cloud.",
    runLocally: "Run locally",
    signIn: "Sign in",
    imprint: "Imprint",
    privacy: "Privacy",
    switchLang: "Auf Deutsch wechseln",
    switchBg: "Change background",
  },
};

// tone = Helligkeit des Bildes, bestimmt die Textfarbe
const BACKGROUNDS = [
  { src: "assets/bg/1.png", tone: "dark" },
  { src: "assets/bg/2.png", tone: "dark" },
  { src: "assets/bg/3.png", tone: "dark" },
  { src: "assets/bg/4.png", tone: "light" },
  { src: "assets/bg/5.png", tone: "dark" },
  { src: "assets/bg/6.png", tone: "light" },
];
const DEFAULT_BG = { light: 5, dark: 4 };

const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch {} },
};

const root = document.documentElement;
const systemDark = matchMedia("(prefers-color-scheme: dark)");

// ---------- Sprache ----------
let lang = store.get("lang") || ((navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en");

function applyLang() {
  root.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = TEXT[lang][el.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = TEXT[lang][el.dataset.i18nTitle];
    el.setAttribute("aria-label", el.title);
  });
  const label = document.getElementById("lang-label");
  if (label) label.textContent = lang.toUpperCase();
}

// ---------- Hintergrund ----------
const storedBg = store.get("bg");
let bgIndex = storedBg !== null && BACKGROUNDS[+storedBg] ? +storedBg : null;
const currentBg = () => bgIndex ?? DEFAULT_BG[systemDark.matches ? "dark" : "light"];

const layers = document.querySelectorAll(".backdrop .layer");
let activeLayer = 0;

function showBg(index, animate) {
  const bg = BACKGROUNDS[index];
  root.dataset.theme = bg.tone;
  const label = document.getElementById("bg-label");
  if (label) label.textContent = `${index + 1}/${BACKGROUNDS.length}`;
  if (!layers.length) return;

  if (!animate) {
    layers[activeLayer].style.backgroundImage = `url("${bg.src}")`;
    return;
  }
  // erst laden, dann überblenden
  const img = new Image();
  img.onload = () => {
    const next = 1 - activeLayer;
    layers[next].style.backgroundImage = `url("${bg.src}")`;
    layers[next].classList.add("is-active");
    layers[activeLayer].classList.remove("is-active");
    activeLayer = next;
  };
  img.src = bg.src;
}

// Text kurz ausblenden, tauschen, wieder einblenden
function fadeSwap(update) {
  const els = document.querySelectorAll(".swap");
  els.forEach((el) => el.classList.add("is-out"));
  setTimeout(() => {
    update();
    els.forEach((el) => el.classList.remove("is-out"));
  }, 250);
}

applyLang();
showBg(currentBg(), false);

document.querySelectorAll("[data-link]").forEach((el) => {
  el.href = LINKS[el.dataset.link];
});

document.getElementById("lang-toggle")?.addEventListener("click", () => {
  lang = lang === "de" ? "en" : "de";
  store.set("lang", lang);
  fadeSwap(applyLang);
});

document.getElementById("bg-toggle")?.addEventListener("click", () => {
  bgIndex = (currentBg() + 1) % BACKGROUNDS.length;
  store.set("bg", bgIndex);
  showBg(bgIndex, true);
});

// Systemwechsel hell/dunkel übernehmen, solange kein Hintergrund gewählt wurde
systemDark.addEventListener("change", () => {
  if (bgIndex === null) showBg(currentBg(), true);
});
