import type { CSSProperties } from "react"
import { ArrowRight, Image, Languages } from "lucide-react"
import { Backdrop } from "@/components/backdrop"
import { GithubIcon, XIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BACKGROUNDS, LINKS } from "@/config"
import { usePreferences } from "@/hooks/use-preferences"
import { TEXT } from "@/i18n"

// Einblenden beim Laden, gestaffelt über die Verzögerung
const reveal =
  "animate-in fade-in slide-in-from-bottom-3 fill-mode-both ease-out [animation-duration:900ms] motion-reduce:animate-none"
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

export function Landing() {
  const { lang, bgIndex, toggleLang, nextBg } = usePreferences()
  const t = TEXT[lang]
  // Text bei Sprachwechsel kurz einblenden
  const swap = "animate-in fade-in duration-300 motion-reduce:animate-none"

  return (
    <TooltipProvider>
      <div className="grid h-dvh grid-rows-[auto_1fr_auto] overflow-hidden">
        <Backdrop src={BACKGROUNDS[bgIndex].src} />

        <header className={`flex items-center gap-1 p-4 ${reveal}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={toggleLang} aria-label={t.switchLang}>
                <Languages />
                {lang.toUpperCase()}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.switchLang}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={nextBg} aria-label={t.switchBg}>
                <Image />
                <span className="text-muted-foreground tabular-nums">
                  {bgIndex + 1}/{BACKGROUNDS.length}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.switchBg}</TooltipContent>
          </Tooltip>
        </header>

        <main className="flex flex-col items-center justify-center gap-5 px-4 text-center">
          <h1 className={`text-[clamp(3rem,11vw,8rem)] leading-none font-bold tracking-[-0.045em] ${reveal}`} style={delay(100)}>
            Amnesies
          </h1>
          <p className={`max-w-xl text-base text-balance text-muted-foreground sm:text-lg ${reveal}`} style={delay(250)}>
            <span key={lang} className={swap}>
              {t.lead}
            </span>
          </p>
          <div className={`mt-3 flex flex-wrap justify-center gap-3 ${reveal}`} style={delay(400)}>
            <Button asChild variant="outline" size="lg" className="backdrop-blur-md">
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
        </main>

        <footer
          className={`flex items-center justify-center gap-4 px-6 py-4 text-[0.7rem] text-muted-foreground sm:justify-end ${reveal}`}
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
