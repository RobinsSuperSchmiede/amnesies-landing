// Hero-Layout-Varianten. Neue Variante: Wert im Enum ergänzen und Eintrag in HERO_VARIANTS anlegen.
// Unterhalb von md stapeln alle Varianten Text über Bild; die md:-Klassen bestimmen das Desktop-Layout.

export enum HeroVariant {
  Sidebar = "sidebar",
  ShiftRight = "shift-right",
  Split = "split",
}

export type HeroLayout = {
  label: string
  // Logo klein in der Ecke oben links oder zentriert am oberen Rand
  logo: "corner" | "center"
  // cover füllt den Rahmen (beschneidet), contain zeigt das ganze Motiv auf der Randfarbe
  imageFit: "cover" | "contain"
  className: {
    root: string // Gesamtlayout
    content: string // Bereich mit Logo, Headline, Text, Buttons
    body: string // Headline, Text, Buttons
    headline: string
    image: string // Rahmen des Bildes
    footer: string
  }
}

export const HERO_VARIANTS: Record<HeroVariant, HeroLayout> = {
  [HeroVariant.Sidebar]: {
    label: "1",
    logo: "corner",
    imageFit: "cover",
    className: {
      root: "md:grid md:grid-cols-[minmax(22rem,34%)_1fr]",
      content: "md:h-dvh md:px-8 md:pt-6 md:pb-14",
      body: "md:flex-1 md:items-start md:justify-center md:text-left",
      headline: "md:text-[clamp(2.25rem,3.4vw,3.25rem)]",
      image: "md:h-dvh",
      footer: "md:right-auto md:w-[max(22rem,34%)] md:justify-start md:px-8",
    },
  },
  [HeroVariant.ShiftRight]: {
    label: "2",
    logo: "corner",
    imageFit: "cover",
    className: {
      root: "md:block",
      content: "md:relative md:z-10 md:h-dvh md:w-[max(24rem,40vw)] md:px-12 md:pt-6 md:pb-14",
      body: "md:flex-1 md:items-start md:justify-center md:text-left",
      headline: "md:text-[clamp(2.5rem,4vw,4rem)]",
      // Bild beginnt rechts der Textspalte und ragt rechts aus dem Viewport
      image: "md:absolute md:top-1/2 md:left-[max(24rem,40vw)] md:aspect-video md:w-[75vw] md:flex-none md:-translate-y-1/2",
      footer: "md:justify-end",
    },
  },
  [HeroVariant.Split]: {
    label: "3",
    logo: "center",
    imageFit: "contain",
    className: {
      root: "md:grid md:grid-rows-2",
      content: "md:px-10 md:pt-6",
      body: "md:flex-1 md:justify-center",
      headline: "md:text-[clamp(2.5rem,4.5vw,4.25rem)]",
      image: "md:h-full",
      footer: "md:justify-end",
    },
  },
}

export const DEFAULT_VARIANT = HeroVariant.Sidebar
