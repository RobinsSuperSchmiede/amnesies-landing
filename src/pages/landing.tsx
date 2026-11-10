import type { CSSProperties } from "react"
import { ArrowRight, Contrast, Image } from "lucide-react"
import { Backdrop } from "@/components/backdrop"
import { BangLine, Emphasis, ForgettingLine } from "@/components/hero-text"
import { GithubIcon, XIcon } from "@/components/icons"
import { Btn, BtnLink, Cta, Group, Segmented } from "@/components/minimal"
import { BACKGROUNDS, LINKS } from "@/config"
import { HERO_VARIANTS, HeroVariant } from "@/hero-variants"
import { usePreferences } from "@/hooks/use-preferences"
import { TEXT } from "@/i18n"
import { cn } from "@/lib/utils"

// Einblenden beim Laden, gestaffelt über die Verzögerung
const reveal =
  "animate-in fade-in slide-in-from-bottom-3 fill-mode-both ease-out [animation-duration:900ms] motion-reduce:animate-none"
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })
// Text bei Sprachwechsel kurz einblenden
const swap = "animate-in fade-in duration-300 motion-reduce:animate-none"

function Logo() {
  return (
    <a href="/" className="text-xl font-semibold tracking-tight md:text-2xl">
      Amnesies
    </a>
  )
}

export function Landing() {
  const prefs = usePreferences()
  const { lang, bgIndex, variant } = prefs
  const t = TEXT[lang]
  const bg = BACKGROUNDS[bgIndex]
  const layout = HERO_VARIANTS[variant]
  const neutral = layout.surface === "neutral"
  const surface = neutral ? (prefs.neutral === "black" ? "#000000" : "#ffffff") : bg.surface
  // Akzent wäre auf gleichfarbiger Fläche unsichtbar: dann Button weiß mit Akzentschrift
  const clash = !neutral && bg.accentIsSurface
  const brand = {
    "--surface": surface,
    "--brand": clash ? "#ffffff" : bg.accent,
    "--brand-fg": clash ? bg.accent : "#0b0b0c",
  } as CSSProperties

  const toolbar = (
    <div className="flex items-center gap-2">
      <Segmented
        label={t.switchVariant}
        tip={t.switchVariant}
        items={Object.values(HeroVariant).map((v) => ({ value: v, label: HERO_VARIANTS[v].label }))}
        value={variant}
        onChange={prefs.selectVariant}
        itemWidth={24}
      />
      <Group label={t.display}>
        <Btn variant="ghost" size="sm" icon tip={t.switchLang} onClick={prefs.toggleLang}>
          {lang.toUpperCase()}
        </Btn>
        {neutral && (
          <Btn variant="ghost" size="sm" icon tip={t.switchSurface} onClick={prefs.toggleNeutral}>
            <Contrast />
          </Btn>
        )}
        <Btn variant="ghost" size="sm" icon tip={`${t.switchBg} (${bgIndex + 1}/${BACKGROUNDS.length})`} onClick={prefs.nextBg}>
          <Image />
        </Btn>
      </Group>
    </div>
  )

  return (
    <>
      <div
        className={cn("relative flex h-dvh flex-col overflow-hidden transition-colors duration-700", layout.className.root)}
        style={{ backgroundColor: surface, ...brand }}
      >
        {/* key: Einblend-Animation läuft beim Variantenwechsel erneut */}
        <section key={variant} className={cn("relative z-10 flex flex-col px-6 pt-4", layout.className.content)}>
          <header className={cn("relative flex flex-wrap items-center gap-y-2", reveal)}>
            {layout.logo === "corner" ? (
              <>
                <Logo />
                <div className="ml-auto">{toolbar}</div>
              </>
            ) : (
              <>
                {toolbar}
                <div className="absolute left-1/2 -translate-x-1/2">
                  <Logo />
                </div>
              </>
            )}
          </header>

          <div className={cn("flex flex-col items-center gap-5 py-8 text-center", layout.className.body)}>
            {/* key: Wort-Animation läuft beim Sprachwechsel erneut */}
            <h1 key={lang} className={cn("text-3xl leading-[1.05] font-semibold tracking-tight", layout.className.headline)}>
              <span className="block">
                <ForgettingLine text={t.headline} start={150} />
              </span>
              {/* zweite Zeile: Serifenschrift in der Akzentfarbe */}
              <span
                className="block font-serif text-[1.15em] leading-none font-normal tracking-normal italic transition-colors duration-700"
                style={{ color: clash ? undefined : bg.accent }}
              >
                <BangLine text={t.headlineAccent} start={450} />
              </span>
            </h1>
            <p className={cn("max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base", reveal)} style={delay(700)}>
              <span key={lang} className={swap}>
                <Emphasis text={t.lead} />
              </span>
            </p>
            <div className={cn("mt-2 flex flex-wrap gap-3", reveal)} style={delay(850)}>
              <BtnLink size="lg" className="h-9" href={LINKS.github} target="_blank" rel="noopener">
                <GithubIcon />
                <span key={lang} className={swap}>
                  {t.runLocally}
                </span>
              </BtnLink>
              <Cta href={LINKS.app}>
                <span key={lang} className={swap}>
                  {t.signIn}
                </span>
                <ArrowRight />
              </Cta>
            </div>
          </div>
        </section>

        <Backdrop src={bg.src} fit={layout.imageFit} rotated={layout.imageRotated} className={cn("min-h-0 flex-1", layout.className.image)} />

        <footer
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 px-6 py-4 text-[0.7rem] text-foreground/70",
            layout.className.footer,
            reveal,
          )}
          style={delay(1100)}
        >
          <a key={`i-${lang}`} href="/impressum.html" className={`transition-colors hover:text-foreground ${swap}`}>
            {t.imprint}
          </a>
          <a key={`p-${lang}`} href="/datenschutz.html" className={`transition-colors hover:text-foreground ${swap}`}>
            {t.privacy}
          </a>
          <a href={LINKS.x} target="_blank" rel="noopener" aria-label="X" className="transition-colors hover:text-foreground">
            <XIcon className="size-3" />
          </a>
        </footer>
      </div>
    </>
  )
}
