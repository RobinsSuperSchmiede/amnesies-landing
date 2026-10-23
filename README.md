# Amnesies – Landing Page

One-Page-Website für Amnesies (die SaaS-App liegt in einem eigenen Repo).
Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui.

- `index.html`, `impressum.html`, `datenschutz.html` – Einstiegsseiten (Multi-Page-Build)
- `src/config.ts` – Links (GitHub, App-Login, X) und Hintergrundliste
- `src/i18n.ts` – Texte DE/EN
- `src/pages/landing.tsx` – Startseite (kein Scrollen)
- `src/pages/legal.tsx` – Impressum und Datenschutz (Platzhalter ausfüllen)
- `src/components/ui/` – shadcn-Komponenten (`npx shadcn@latest add …`)
- `public/bg/` – Hintergrundbilder

Sprache und Dark Mode folgen den Systemeinstellungen. Oben links lassen sich Sprache (DE/EN) und Hintergrund wechseln; die Wahl wird im Browser gespeichert. Die Textfarbe richtet sich nach der Helligkeit des Hintergrunds.

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
