import type { CSSProperties, ReactNode } from "react"
import { ArrowRight, Contrast, Image } from "lucide-react"
import { Backdrop } from "@/components/backdrop"
import { BangLine, Emphasis, ForgettingLine } from "@/components/hero-text"
import { GithubIcon, XIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

function WithTooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

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
    "--brand": clash ? "#ffffff" : bg.accent,
    "--brand-fg": clash ? bg.accent : "#ffffff",
  } as CSSProperties

  const toolbar = (
    <div className="flex items-center gap-1">
      <WithTooltip label={t.switchVariant}>
        <div role="group" aria-label={t.switchVariant} className="flex rounded-md border border-foreground/15 p-0.5">
          {Object.values(HeroVariant).map((v) => (
            <Button
              key={v}
              size="icon-xs"
              variant={v === variant ? "secondary" : "ghost"}
              aria-pressed={v === variant}
              onClick={() => prefs.selectVariant(v)}
              className="w-6 tabular-nums"
            >
              {HERO_VARIANTS[v].label}
            </Button>
          ))}
        </div>
      </WithTooltip>
      <WithTooltip label={t.switchLang}>
        <Button variant="ghost" size="icon-sm" onClick={prefs.toggleLang} aria-label={t.switchLang} className="text-xs">
          {lang.toUpperCase()}
        </Button>
      </WithTooltip>
      {neutral && (
        <WithTooltip label={t.switchSurface}>
          <Button variant="ghost" size="icon-sm" onClick={prefs.toggleNeutral} aria-label={t.switchSurface}>
            <Contrast />
          </Button>
        </WithTooltip>
      )}
      <WithTooltip label={`${t.switchBg} (${bgIndex + 1}/${BACKGROUNDS.length})`}>
        <Button variant="ghost" size="icon-sm" onClick={prefs.nextBg} aria-label={t.switchBg}>
          <Image />
        </Button>
      </WithTooltip>
    </div>
  )

  return (
    <TooltipProvider>
      <div
        className={cn("relative flex h-dvh flex-col overflow-hidden transition-colors duration-700", layout.className.root)}
        style={{ backgroundColor: surface, ...brand }}
      >
        {/* key: Einblend-Animation läuft beim Variantenwechsel erneut */}
        <section key={variant} className={cn("relative z-10 flex flex-col px-6 pt-4", layout.className.content)}>
          <header className={cn("relative flex items-center", reveal)}>
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
              <Button asChild variant="outline" size="lg" className="cta-ghost">
                <a href={LINKS.github} target="_blank" rel="noopener">
                  <GithubIcon />
                  <span key={lang} className={swap}>
                    {t.runLocally}
                  </span>
                </a>
              </Button>
              <Button asChild size="lg" className="cta group relative overflow-hidden">
                <a href={LINKS.app}>
                  <span key={lang} className={swap}>
                    {t.signIn}
                  </span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
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
    </TooltipProvider>
  )
}
