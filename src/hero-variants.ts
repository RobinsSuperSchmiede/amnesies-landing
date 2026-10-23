// Hero-Layout-Varianten. Neue Variante: Wert im Enum ergänzen und Eintrag in HERO_VARIANTS anlegen.
// Unterhalb von md stapeln alle Varianten Text über Bild; die md:-Klassen bestimmen das Desktop-Layout.

export enum HeroVariant {
  Sidebar = "sidebar",
  ShiftRight = "shift-right",
  Split = "split",
  Rotated = "rotated",
}

export type HeroLayout = {
  label: string
  // Logo klein in der Ecke oben links oder zentriert am oberen Rand
  logo: "corner" | "center"
  // cover füllt den Rahmen (beschneidet), contain zeigt das ganze Motiv auf der Randfarbe
  imageFit: "cover" | "contain"
  // Bild um 90° gedreht (Hochformat)
  imageRotated?: boolean
  // image: Fläche in Randfarbe des Bildes, neutral: schwarz oder weiß (umschaltbar)
  surface: "image" | "neutral"
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
    surface: "image",
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
    surface: "image",
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
    surface: "image",
    className: {
      // oben mindestens so hoch wie der Text, sonst halbe-halbe; Text liegt immer über dem Bild
      root: "md:grid md:grid-rows-[minmax(min-content,1fr)_minmax(0,1fr)]",
      content: "md:relative md:z-10 md:px-10 md:pt-6",
      body: "md:flex-1 md:justify-center",
      headline: "md:text-[clamp(2.5rem,4.5vw,4.25rem)]",
      image: "md:h-full",
      footer: "md:justify-end",
    },
  },
  [HeroVariant.Rotated]: {
    label: "4",
    logo: "corner",
    imageFit: "cover",
    imageRotated: true,
    surface: "neutral",
    className: {
      // Außenabstand rundum, seitlich größer, damit Content und Bild mittig sitzen
      root: "md:grid md:grid-cols-[minmax(0,1fr)_auto] md:grid-rows-[minmax(0,1fr)] md:gap-[6vw] md:px-[max(4rem,calc((100vw-72rem)/2))] md:py-[6vh]",
      content: "md:h-full md:min-h-0 md:px-0 md:pt-0 md:pb-10",
      body: "md:flex-1 md:items-start md:justify-center md:text-left",
      headline: "md:text-[clamp(2.5rem,4vw,4rem)]",
      image: "md:aspect-[9/16] md:h-full md:flex-none md:rounded-2xl",
      footer: "md:right-auto md:bottom-[6vh] md:left-[max(4rem,calc((100vw-72rem)/2))] md:justify-start md:p-0",
    },
  },
}

export const DEFAULT_VARIANT = HeroVariant.Sidebar
