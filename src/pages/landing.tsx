import type { CSSProperties, ReactNode } from "react"
import { ArrowRight, Image } from "lucide-react"
import { Backdrop } from "@/components/backdrop"
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
    <a href="/" className="text-base font-semibold tracking-tight">
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
        style={{ backgroundColor: layout.surface === "white" ? "#ffffff" : bg.surface }}
      >
        {/* key: Einblend-Animation läuft beim Variantenwechsel erneut */}
        <section key={variant} className={cn("flex flex-col px-6 pt-4", layout.className.content)}>
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
            <h1
              className={cn("text-3xl leading-[1.05] font-bold tracking-tight text-balance", layout.className.headline, reveal)}
              style={delay(100)}
            >
              <span key={lang} className={swap}>
                {t.headline}
              </span>
            </h1>
            <p className={cn("max-w-xl text-sm leading-relaxed text-foreground/75 md:text-base", reveal)} style={delay(250)}>
              <span key={lang} className={swap}>
                {t.lead}
              </span>
            </p>
            <div className={cn("mt-2 flex flex-wrap gap-3", reveal)} style={delay(400)}>
              <Button asChild variant="outline" size="lg">
                <a href={LINKS.github} target="_blank" rel="noopener">
                  <GithubIcon />
                  <span key={lang} className={swap}>
                    {t.runLocally}
                  </span>
                </a>
              </Button>
              <Button asChild size="lg" className="group">
                <a href={LINKS.app}>
                  <span key={lang} className={swap}>
                    {t.signIn}
                  </span>
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
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
          style={delay(600)}
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
