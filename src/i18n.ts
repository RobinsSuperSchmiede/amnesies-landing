export type Lang = "de" | "en"

export const TEXT = {
  de: {
    headline: "Deine KI vergisst.",
    headlineAccent: "Amnesies nicht!",
    lead: "Eine dauerhafte Gedächtnisschicht für deine KI. Speichere Wissen, Dokumente, Aufgaben, Projekte und Termine in einem vernetzten System. Gib deiner Lieblings-KI über MCP genau den Kontext, den sie braucht – Open Source, local-first und unter deiner Kontrolle.",
    runLocally: "Lokal ausführen",
    signIn: "Anmelden",
    imprint: "Impressum",
    privacy: "Datenschutz",
    switchLang: "Switch to English",
    switchBg: "Hintergrund wechseln",
    switchVariant: "Hero-Variante",
    switchSurface: "Hintergrund Schwarz/Weiß",
  },
  en: {
    headline: "Your AI forgets.",
    headlineAccent: "Amnesies doesn't!",
    lead: "A persistent memory layer for your AI. Store your knowledge, documents, tasks, projects, and events in one connected system. Give your favorite AI access to the context it needs through MCP — open source, local-first, and under your control.",
    runLocally: "Run locally",
    signIn: "Sign in",
    imprint: "Imprint",
    privacy: "Privacy",
    switchLang: "Auf Deutsch wechseln",
    switchBg: "Change background",
    switchVariant: "Hero variant",
    switchSurface: "Background black/white",
  },
} satisfies Record<Lang, Record<string, string>>
