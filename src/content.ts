import type { Lang } from "@/i18n"

// Inhalte der Abschnitte unter dem Hero: Feature-Roadmap und Preise. **…** wird hervorgehoben.

export type Feature = { label: string; title: string; text: string; points: string[] }
export type Plan = { name: string; price: string; period: string; text: string; points: string[] }

type Content = {
  roadmapLabel: string
  roadmapTitle: string
  features: Feature[]
  pricingLabel: string
  pricingTitle: string
  free: Plan
  cloud: Plan
  recommended: string
  download: string
  sourceCode: string
  startOnline: string
  scrollHint: string
}

export const CONTENT: Record<Lang, Content> = {
  de: {
    roadmapLabel: "Was Amnesies kann",
    roadmapTitle: "Ein Gedächtnis, Station für Station",
    features: [
      {
        label: "MCP",
        title: "Deine KI erinnert sich",
        text: "Über den eingebauten **MCP-Server** lesen und schreiben Claude und andere Assistenten deinen Workspace – Projekte, Notizen, Termine, Dateien.",
        points: ["Fertige Snippets für Claude Code & Desktop", "Suchen, anlegen, verknüpfen, wiederherstellen", "Zugriff nur mit deinem Token"],
      },
      {
        label: "Planen",
        title: "Projekte und Aufgaben",
        text: "Jedes Projekt mit eigener Übersicht, Aufgaben und Listen. **Heute** zeigt, was fällig ist, **Angepinnt** deine wichtigsten Projekte.",
        points: ["Projektseiten mit Cover", "Aufgaben, Listen, Ideen", "Archiv für Erledigtes"],
      },
      {
        label: "Kalender",
        title: "Termine, Meetings, Erinnerungen",
        text: "Kalender mit Terminen und Meetings samt Notizen. **Erinnerungen**, auch wiederkehrend, kommen pünktlich an.",
        points: ["Meeting-Notizen direkt am Termin", "Wiederkehrende Erinnerungen", "Tägliche Zusammenfassung"],
      },
      {
        label: "Wissen",
        title: "Explorer für Notizen und Dateien",
        text: "Notizen, Dokumente, Dateien und Bilder in einem Ordnerbaum. Ein **Markdown-Editor** mit Tabs, Split-View und [[Wiki-Links]].",
        points: ["Tabs und geteilte Ansicht", "Bilder, PDFs, Office-Dateien", "Wiki-Links zwischen Einträgen"],
      },
      {
        label: "Vernetzt",
        title: "Alles hängt zusammen",
        text: "**Tags** und Verknüpfungen zwischen allen Einträgen – und ein **Graph**, der zeigt, wie dein Wissen zusammenhängt.",
        points: ["Tags für alles", "Links zwischen beliebigen Einträgen", "Interaktiver Graph"],
      },
      {
        label: "Unterwegs",
        title: "Telegram und Browser",
        text: "Ein eigener **Telegram-Bot** für Erinnerungen und schnelle Notizen. Die **Browser-Erweiterung** klebt Notizen auf Webseiten und hängt Websites an Projekte.",
        points: ["/aufgabe, /notiz, /erinnerung", "Sticky Notes auf jeder Seite", "Websites mit Screenshot am Projekt"],
      },
      {
        label: "Verlauf",
        title: "Nichts geht verloren",
        text: "Das **Warehouse** speichert jede Änderung: frühere Versionen ansehen, gelöschte Einträge wiederherstellen, alles exportieren.",
        points: ["Vollständige Historie", "Wiederherstellen per Klick", "Export deiner Daten"],
      },
      {
        label: "Überall",
        title: "Desktop, Browser, Handy",
        text: "Als **Desktop-App**, im Browser oder per Docker – auf dem Handy genauso. In sechs Sprachen, hell oder dunkel, ganz nach deinem Geschmack.",
        points: ["Windows, macOS, Linux", "Offline-Cache, nur Änderungen werden synchronisiert", "Deutsch, Englisch und vier weitere Sprachen"],
      },
    ],
    pricingLabel: "Preise",
    pricingTitle: "Selbst betreiben oder einfach loslegen",
    free: {
      name: "Selbst hosten",
      price: "0 €",
      period: "für immer",
      text: "Open Source unter MIT-Lizenz. Läuft auf deinem Rechner – du besitzt alles.",
      points: [
        "Alle Funktionen, ohne Einschränkung",
        "Deine Datenbank, deine Daten – nichts verlässt deinen Rechner",
        "Lokale Sicherheit, eigene Konten",
        "Eigene Domain, eigener Mailserver",
        "Datenbank-Browser und Erweiterungen",
      ],
    },
    cloud: {
      name: "Amnesies Cloud",
      price: "9 €",
      period: "pro Monat",
      text: "Wir betreiben Amnesies für dich. Anmelden und sofort loslegen.",
      points: [
        "Datenbank, Backups und Updates inklusive",
        "Anmeldung mit Google oder Passwort",
        "Im Browser und auf dem Handy, überall",
        "MCP-Zugang für Claude ohne eigene Domain",
        "Verschlüsselte Verbindung, monatlich kündbar",
      ],
    },
    recommended: "Am schnellsten",
    download: "Herunterladen",
    sourceCode: "Quellcode",
    startOnline: "Online starten",
    scrollHint: "Mehr entdecken",
  },
  en: {
    roadmapLabel: "What Amnesies does",
    roadmapTitle: "A memory, station by station",
    features: [
      {
        label: "MCP",
        title: "Your AI remembers",
        text: "Through the built-in **MCP server**, Claude and other assistants read and write your workspace – projects, notes, events, files.",
        points: ["Ready-made snippets for Claude Code & Desktop", "Search, create, link, restore", "Access only with your token"],
      },
      {
        label: "Plan",
        title: "Projects and tasks",
        text: "Every project with its own overview, tasks and lists. **Today** shows what is due, **Pinned** your most important projects.",
        points: ["Project pages with covers", "Tasks, lists, ideas", "Archive for finished work"],
      },
      {
        label: "Calendar",
        title: "Events, meetings, reminders",
        text: "A calendar with events and meetings including notes. **Reminders**, recurring too, arrive on time.",
        points: ["Meeting notes right at the event", "Recurring reminders", "Daily summary"],
      },
      {
        label: "Knowledge",
        title: "Explorer for notes and files",
        text: "Notes, documents, files and images in one folder tree. A **Markdown editor** with tabs, split view and [[wiki links]].",
        points: ["Tabs and split view", "Images, PDFs, Office files", "Wiki links between entries"],
      },
      {
        label: "Connected",
        title: "Everything is linked",
        text: "**Tags** and links between any entries – and a **graph** that shows how your knowledge fits together.",
        points: ["Tags for everything", "Links between any entries", "Interactive graph"],
      },
      {
        label: "On the go",
        title: "Telegram and browser",
        text: "Your own **Telegram bot** for reminders and quick notes. The **browser extension** sticks notes on web pages and attaches websites to projects.",
        points: ["/task, /note, /remind", "Sticky notes on any page", "Websites with screenshots on projects"],
      },
      {
        label: "History",
        title: "Nothing gets lost",
        text: "The **warehouse** keeps every change: look at earlier versions, restore deleted entries, export everything.",
        points: ["Complete history", "Restore with one click", "Export your data"],
      },
      {
        label: "Everywhere",
        title: "Desktop, browser, phone",
        text: "As a **desktop app**, in the browser or with Docker – on your phone just the same. In six languages, light or dark, the way you like it.",
        points: ["Windows, macOS, Linux", "Offline cache, only changes are synced", "English, German and four more languages"],
      },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Run it yourself or just get started",
    free: {
      name: "Self-hosted",
      price: "€0",
      period: "forever",
      text: "Open source under the MIT license. Runs on your machine – you own everything.",
      points: [
        "Every feature, no limits",
        "Your database, your data – nothing leaves your machine",
        "Local security, your own accounts",
        "Your own domain and mail server",
        "Database browser and extensions",
      ],
    },
    cloud: {
      name: "Amnesies Cloud",
      price: "€9",
      period: "per month",
      text: "We run Amnesies for you. Sign up and start right away.",
      points: [
        "Database, backups and updates included",
        "Sign in with Google or a password",
        "In the browser and on your phone, anywhere",
        "MCP access for Claude without your own domain",
        "Encrypted connection, cancel any month",
      ],
    },
    recommended: "Fastest start",
    download: "Download",
    sourceCode: "Source code",
    startOnline: "Start online",
    scrollHint: "Discover more",
  },
}
