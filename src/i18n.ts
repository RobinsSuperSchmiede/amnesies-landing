export type Lang = "de" | "en"

export const TEXT = {
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
} satisfies Record<Lang, Record<string, string>>
