// Links hier eintragen
const LINKS = {
  github: "https://github.com/DEIN-USER/amnesies", // TODO: GitHub-Repo des SaaS
  app: "https://app.amnesies.com/login",          // TODO: Login-URL des SaaS
  x: "https://x.com/DEIN-ACCOUNT",                 // TODO: X-Account
};

const TEXT = {
  de: { runLocally: "Lokal ausführen", signIn: "Anmelden", imprint: "Impressum", privacy: "Datenschutz" },
  en: { runLocally: "Run locally", signIn: "Sign in", imprint: "Imprint", privacy: "Privacy" },
};

// Sprache vom System übernehmen (Deutsch, sonst Englisch)
const lang = (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";
document.documentElement.lang = lang;

document.querySelectorAll("[data-i18n]").forEach((el) => {
  el.textContent = TEXT[lang][el.dataset.i18n];
});

document.querySelectorAll("[data-link]").forEach((el) => {
  el.href = LINKS[el.dataset.link];
});
