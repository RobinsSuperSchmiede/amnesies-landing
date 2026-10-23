// Links hier eintragen
export const LINKS = {
  github: "https://github.com/DEIN-USER/amnesies", // TODO: GitHub-Repo des SaaS
  app: "https://app.amnesies.com/login", // TODO: Login-URL des SaaS
  x: "https://x.com/DEIN-ACCOUNT", // TODO: X-Account
}

// tone = Helligkeit des Bildes, bestimmt die Textfarbe.
// surface = Randfarbe des Bildes, damit Fläche und Bild nahtlos ineinander übergehen.
// accent = Farbe des Motivs, für den Anmelden-Button und die zweite Headline-Zeile.
// accentIsSurface = Akzent entspricht der Randfarbe; dann wird er auf dieser Fläche invertiert.
// Reihenfolge und Töne auch im Inline-Skript der HTML-Dateien anpassen.
export const BACKGROUNDS = [
  { src: "/bg/1.png", tone: "dark", surface: "#006cfc", accent: "#006cfc", accentIsSurface: true },
  { src: "/bg/2.png", tone: "dark", surface: "#006cfd", accent: "#006cfc", accentIsSurface: true },
  { src: "/bg/3.png", tone: "dark", surface: "#006cfd", accent: "#006cfc", accentIsSurface: true },
  { src: "/bg/4.png", tone: "light", surface: "#fefefe", accent: "#db1c1d", accentIsSurface: false },
  { src: "/bg/5.png", tone: "dark", surface: "#000000", accent: "#7357ff", accentIsSurface: false },
  { src: "/bg/6.png", tone: "light", surface: "#fefefe", accent: "#db1c1d", accentIsSurface: false },
] as const

export const DEFAULT_BG = { light: 5, dark: 4 }
