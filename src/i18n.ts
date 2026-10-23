export type Lang = "de" | "en"

export const TEXT = {
  de: {
    // Das letzte Wort von headline „vergisst“ sich in der Animation immer wieder
    headline: "Deine KI vergisst.",
    headlineAccent: "Amnesies nicht!",
    // **…** wird hervorgehoben
    lead: "Eine dauerhafte **Gedächtnisschicht** für deine KI. Wissen, Dokumente, Aufgaben, Projekte und Termine – vereint in einem vernetzten System. Deine Lieblings-KI holt sich über **MCP** genau den Kontext, den sie braucht. Open Source, local-first und **komplett unter deiner Kontrolle**.",
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
    lead: "A persistent **memory layer** for your AI. Knowledge, documents, tasks, projects, and events — woven into one connected system. Your favorite AI pulls exactly the context it needs through **MCP**. Open source, local-first, and **fully under your control**.",
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
