import { useEffect, useState, useSyncExternalStore } from "react"
import { BACKGROUNDS, DEFAULT_BG } from "@/config"
import { DEFAULT_VARIANT, HERO_VARIANTS, HeroVariant } from "@/hero-variants"
import type { Lang } from "@/i18n"

const store = {
  get(key: string) {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value)
    } catch {
      // privater Modus o. Ä. – Auswahl gilt dann nur für diesen Besuch
    }
  },
}

const darkQuery = matchMedia("(prefers-color-scheme: dark)")

function useSystemDark() {
  return useSyncExternalStore(
    (cb) => {
      darkQuery.addEventListener("change", cb)
      return () => darkQuery.removeEventListener("change", cb)
    },
    () => darkQuery.matches,
  )
}

function initialLang(): Lang {
  const stored = store.get("lang")
  if (stored === "de" || stored === "en") return stored
  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en"
}

function initialVariant(): HeroVariant {
  const stored = store.get("variant")
  return Object.values(HeroVariant).find((v) => v === stored) ?? DEFAULT_VARIANT
}

export type NeutralSurface = "white" | "black"

function initialNeutral(): NeutralSurface {
  return store.get("surface") === "black" ? "black" : "white"
}

function initialBg(): number | null {
  const stored = store.get("bg")
  return stored !== null && BACKGROUNDS[+stored] ? +stored : null
}

// Sprache und Hintergrund: folgen dem System, bis der Besucher selbst wählt
export function usePreferences() {
  const systemDark = useSystemDark()
  const [lang, setLang] = useState(initialLang)
  const [chosenBg, setChosenBg] = useState(initialBg)
  const [variant, setVariant] = useState(initialVariant)
  const [neutral, setNeutral] = useState(initialNeutral)

  const bgIndex = chosenBg ?? DEFAULT_BG[systemDark ? "dark" : "light"]
  // Varianten mit neutraler Fläche richten die Textfarbe nach Schwarz/Weiß, sonst nach dem Bild
  const tone =
    HERO_VARIANTS[variant].surface === "neutral"
      ? neutral === "black" ? "dark" : "light"
      : BACKGROUNDS[bgIndex].tone

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tone === "dark")
  }, [tone])

  return {
    lang,
    bgIndex,
    variant,
    neutral,
    toggleNeutral() {
      const next = neutral === "white" ? "black" : "white"
      store.set("surface", next)
      setNeutral(next)
    },
    selectVariant(next: HeroVariant) {
      store.set("variant", next)
      setVariant(next)
    },
    toggleLang() {
      const next = lang === "de" ? "en" : "de"
      store.set("lang", next)
      setLang(next)
    },
    nextBg() {
      const next = (bgIndex + 1) % BACKGROUNDS.length
      store.set("bg", String(next))
      setChosenBg(next)
    },
  }
}
