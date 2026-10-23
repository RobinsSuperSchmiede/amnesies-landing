// Links hier eintragen
export const LINKS = {
  github: "https://github.com/DEIN-USER/amnesies", // TODO: GitHub-Repo des SaaS
  app: "https://app.amnesies.com/login", // TODO: Login-URL des SaaS
  x: "https://x.com/DEIN-ACCOUNT", // TODO: X-Account
}

// tone = Helligkeit des Bildes, bestimmt die Textfarbe.
// Reihenfolge und Töne auch im Inline-Skript der HTML-Dateien anpassen.
export const BACKGROUNDS = [
  { src: "/bg/1.png", tone: "dark" },
  { src: "/bg/2.png", tone: "dark" },
  { src: "/bg/3.png", tone: "dark" },
  { src: "/bg/4.png", tone: "light" },
  { src: "/bg/5.png", tone: "dark" },
  { src: "/bg/6.png", tone: "light" },
] as const

export const DEFAULT_BG = { light: 5, dark: 4 }
