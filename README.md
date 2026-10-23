# Amnesies – Landing Page

Statische One-Page-Website für Amnesies (die SaaS-App liegt in einem eigenen Repo).

- `index.html` – Startseite (kein Scrollen, Name + zwei Buttons + Footer)
- `impressum.html`, `datenschutz.html` – Rechtstexte (DE/EN, Platzhalter ausfüllen)
- `assets/main.js` – Links (GitHub, App-Login, X), Texte/Übersetzungen, Hintergrundliste
- `assets/style.css` – Styles (Buttons im shadcn/ui-Stil), Standard-Hintergrund hell `bg/6.png`, dunkel `bg/5.png`

Sprache und Dark Mode folgen den Systemeinstellungen. Oben links lassen sich Sprache (DE/EN) und Hintergrund wechseln; die Wahl wird im Browser gespeichert.

## Lokal ansehen

```bash
python -m http.server 5173
```
