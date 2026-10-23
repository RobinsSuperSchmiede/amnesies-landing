# Amnesies – Landing Page

One-Page-Website für Amnesies (die SaaS-App liegt in einem eigenen Repo).
Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui.

- `index.html`, `impressum.html`, `datenschutz.html` – Einstiegsseiten (Multi-Page-Build)
- `src/config.ts` – Links (GitHub, App-Login, X) und Hintergrundliste
- `src/i18n.ts` – Texte DE/EN
- `src/pages/landing.tsx` – Startseite (kein Scrollen)
- `src/hero-variants.ts` – Hero-Layout-Varianten (Enum + Config); neue Variante dort eintragen
- `src/pages/legal.tsx` – Impressum und Datenschutz (Platzhalter ausfüllen)
- `src/components/ui/` – shadcn-Komponenten (`npx shadcn@latest add …`)
- `public/bg/` – Hintergrundbilder

Sprache und Dark Mode folgen den Systemeinstellungen. Oben lassen sich Hero-Variante (1/2/3), Sprache (DE/EN) und Hintergrund wechseln; die Wahl wird im Browser gespeichert. Das Bild wird ohne Filter gezeigt; die Fläche daneben bekommt die Randfarbe des Bildes (`surface` in `src/config.ts`), die Textfarbe richtet sich nach dessen Helligkeit.

## Entwicklung

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Ergebnis liegt in `dist/` und kann auf jedem statischen Hosting (GitHub Pages, Netlify, Vercel …) ausgeliefert werden.
