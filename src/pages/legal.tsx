import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePreferences } from "@/hooks/use-preferences"
import type { Lang } from "@/i18n"

type Section = { heading: string; body: ReactNode }
type Doc = { title: string; sections: Section[] }

// TODO: Platzhalter durch echte Angaben ersetzen
const IMPRESSUM: Record<Lang, Doc> = {
  de: {
    title: "Impressum",
    sections: [
      { heading: "Angaben gemäß § 5 DDG", body: <>[Vorname Nachname]<br />[Straße Hausnummer]<br />[PLZ Ort]<br />[Land]</> },
      { heading: "Kontakt", body: "E-Mail: [kontakt@example.com]" },
      { heading: "Verantwortlich für den Inhalt", body: "[Vorname Nachname], Anschrift wie oben" },
    ],
  },
  en: {
    title: "Imprint",
    sections: [
      { heading: "Information according to § 5 DDG (German law)", body: <>[First name Last name]<br />[Street No.]<br />[ZIP City]<br />[Country]</> },
      { heading: "Contact", body: "Email: [contact@example.com]" },
      { heading: "Responsible for content", body: "[First name Last name], address as above" },
    ],
  },
}

// TODO: Platzhalter prüfen und an Hosting/Dienste anpassen
const DATENSCHUTZ: Record<Lang, Doc> = {
  de: {
    title: "Datenschutzerklärung",
    sections: [
      { heading: "1. Verantwortlicher", body: "[Vorname Nachname], [Anschrift], [E-Mail]" },
      { heading: "2. Hosting", body: "Diese Website wird bei [Hosting-Anbieter] gehostet. Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt, Browser) in Server-Logfiles verarbeitet (Art. 6 Abs. 1 lit. f DSGVO)." },
      { heading: "3. Cookies und Tracking", body: "Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Wenn Sie Darstellungseinstellungen ändern (Sprache, Layout, Hintergrund), wird diese Auswahl nur lokal in Ihrem Browser (localStorage) gespeichert und nicht übertragen." },
      { heading: "4. Schriftarten", body: "Die verwendeten Schriftarten sind auf dieser Website selbst gespeichert; es werden keine Daten an Dritte (z. B. Google) übertragen." },
      { heading: "5. Externe Links", body: "Die Website verlinkt auf GitHub, X und die Amnesies-Anwendung. Erst beim Anklicken werden Daten an diese Anbieter übertragen; es gelten deren Datenschutzbestimmungen." },
      { heading: "6. Ihre Rechte", body: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch sowie Beschwerde bei einer Aufsichtsbehörde." },
    ],
  },
  en: {
    title: "Privacy Policy",
    sections: [
      { heading: "1. Controller", body: "[First name Last name], [Address], [Email]" },
      { heading: "2. Hosting", body: "This website is hosted by [hosting provider]. When you visit, technically necessary data (e.g. IP address, time, browser) is processed in server log files (Art. 6(1)(f) GDPR)." },
      { heading: "3. Cookies and tracking", body: "This website sets no cookies and uses no analytics or tracking services. If you change display settings (language, layout, background), that choice is stored only locally in your browser (localStorage) and is never transmitted." },
      { heading: "4. Fonts", body: "All fonts are hosted on this website itself; no data is transferred to third parties (e.g. Google)." },
      { heading: "5. External links", body: "This website links to GitHub, X and the Amnesies application. Data is only transferred to these providers when you click a link; their privacy policies apply." },
      { heading: "6. Your rights", body: "You have the right to access, rectification, erasure, restriction of processing, data portability, objection, and to lodge a complaint with a supervisory authority." },
    ],
  },
}

const DOCS = { impressum: IMPRESSUM, datenschutz: DATENSCHUTZ }

export function Legal({ page }: { page: keyof typeof DOCS }) {
  const { lang } = usePreferences()
  const doc = DOCS[page][lang]

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 leading-relaxed animate-in fade-in duration-500 motion-reduce:animate-none">
      <Button asChild variant="ghost" size="sm" className="-ml-3 mb-8 text-muted-foreground">
        <a href="/">
          <ArrowLeft />
          Amnesies
        </a>
      </Button>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">{doc.title}</h1>
      {doc.sections.map((s) => (
        <section key={s.heading}>
          <h2 className="mt-7 mb-2 font-semibold">{s.heading}</h2>
          <p className="text-muted-foreground">{s.body}</p>
        </section>
      ))}
    </div>
  )
}
