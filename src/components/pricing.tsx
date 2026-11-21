import type { ReactNode } from "react"
import { ArrowRight, Check, Download } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { BtnLink, Cta } from "@/components/minimal"
import { LINKS } from "@/config"
import type { CONTENT, Plan } from "@/content"
import { cn } from "@/lib/utils"

// Zwei Angebote nebeneinander: links selbst hosten (kostenlos), rechts die gehostete Cloud.
export function Pricing({ c }: { c: (typeof CONTENT)["de"] }) {
  return (
    <section aria-labelledby="pricing-title" className="flex min-h-dvh flex-col justify-center px-6 py-20 md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-medium tracking-wide text-foreground/60">{c.pricingLabel}</p>
        <h2 id="pricing-title" className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          {c.pricingTitle}
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <PlanCard plan={c.free}>
            <BtnLink size="lg" className="h-9" href={LINKS.download} target="_blank" rel="noopener">
              <Download />
              {c.download}
            </BtnLink>
            <BtnLink size="lg" className="h-9" href={LINKS.github} target="_blank" rel="noopener">
              <GithubIcon />
              {c.sourceCode}
            </BtnLink>
          </PlanCard>
          <PlanCard plan={c.cloud} highlight={c.recommended}>
            <Cta href={LINKS.app}>
              {c.startOnline}
              <ArrowRight />
            </Cta>
          </PlanCard>
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan, highlight, children }: { plan: Plan; highlight?: string; children: ReactNode }) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-3xl p-6 backdrop-blur-xl md:p-8",
        "bg-[var(--glass)] shadow-[var(--sheen)]",
        highlight && "ring-1 ring-[var(--brand)]",
      )}
    >
      {highlight && (
        <span className="absolute top-6 right-6 rounded-full px-2.5 py-1 text-[11px] font-medium md:top-8 md:right-8" style={{ background: "var(--brand)", color: "var(--brand-fg)" }}>
          {highlight}
        </span>
      )}
      <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
        <span className="text-sm text-foreground/60">{plan.period}</span>
      </p>
      <p className="mt-3 text-sm text-foreground/70">{plan.text}</p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {plan.points.map((point) => (
          <li key={point} className="flex gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0" style={{ color: "var(--brand)" }} />
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">{children}</div>
    </article>
  )
}
