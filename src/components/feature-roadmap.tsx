import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { Check } from "lucide-react"
import { Emphasis } from "@/components/hero-text"
import type { Feature } from "@/content"
import { cn } from "@/lib/utils"

// Vertikale Roadmap wie im Onboarding der App: ein geschwungener Pfad mit einer Station pro Feature.
// Der Abschnitt ist mehrere Bildschirme hoch, der Inhalt klebt (sticky); beim Scrollen wandert die
// Markierung den Pfad entlang. Sichtbar ist nur die Umgebung der aktuellen Station.

const GAP = 150 // Abstand der Stationen
const AMPLITUDE = 22 // seitlicher Ausschlag
const DOT_GAP = 12
const swing = [0.6, -0.7, 0.45, -0.55, 0.7, -0.4, 0.55, -0.6, 0.4]
// Scrollstrecke pro Station (in Bildschirmhöhen)
const SCROLL_PER_STEP = 0.7

type Point = { x: number; y: number }
type Track = { points: Point[]; lengths: number[]; stations: Point[]; stationLengths: number[]; total: number }

const cubic = (a: Point, b: Point, c: Point, d: Point, t: number): Point => {
  const u = 1 - t
  return {
    x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x,
    y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y,
  }
}

function buildTrack(count: number, center: number): Track {
  const stations = Array.from({ length: count }, (_, i) => ({ x: center + swing[i % swing.length] * AMPLITUDE, y: i * GAP }))
  const segments: [Point, Point, Point, Point][] = []
  // Zulauf von oben und Auslauf nach unten, damit der Pfad aus dem Bild kommt und darin verschwindet
  const lead = { x: center, y: -GAP * 1.2 }
  segments.push([lead, { x: lead.x, y: lead.y + GAP * 0.6 }, { x: stations[0].x, y: -GAP * 0.5 }, stations[0]])
  for (let i = 0; i < count - 1; i++) {
    const a = stations[i]
    const b = stations[i + 1]
    segments.push([a, { x: a.x, y: a.y + GAP / 2 }, { x: b.x, y: b.y - GAP / 2 }, b])
  }
  const end = stations[count - 1]
  segments.push([end, { x: end.x, y: end.y + GAP * 0.5 }, { x: center, y: end.y + GAP * 0.7 }, { x: center, y: end.y + GAP * 1.2 }])

  const points: Point[] = [segments[0][0]]
  const lengths = [0]
  const stationLengths: number[] = []
  segments.forEach((segment, position) => {
    for (let s = 1; s <= 48; s++) {
      const p = cubic(...segment, s / 48)
      const prev = points[points.length - 1]
      lengths.push(lengths[lengths.length - 1] + Math.hypot(p.x - prev.x, p.y - prev.y))
      points.push(p)
    }
    if (position < count) stationLengths.push(lengths[lengths.length - 1])
  })
  return { points, lengths, stations, stationLengths, total: lengths[lengths.length - 1] }
}

function pointAt(track: Track, distance: number): { point: Point; index: number } {
  const { points, lengths } = track
  let low = 0
  let high = lengths.length - 1
  while (low < high) {
    const mid = (low + high) >> 1
    if (lengths[mid] < distance) low = mid + 1
    else high = mid
  }
  if (low === 0) return { point: points[0], index: 0 }
  const t = Math.min(1, Math.max(0, (distance - lengths[low - 1]) / (lengths[low] - lengths[low - 1] || 1)))
  const a = points[low - 1]
  const b = points[low]
  return { point: { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }, index: low }
}

// Fortschritt des Scrollens durch den Abschnitt, in Stationen (0 … count-1)
function useScrollStep(section: React.RefObject<HTMLElement | null>, count: number) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const element = section.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      setStep(progress * (count - 1))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
    }
  }, [section, count])
  return step
}

export function FeatureRoadmap({ label, title, features }: { label: string; title: string; features: Feature[] }) {
  const section = useRef<HTMLElement>(null)
  const trail = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const count = features.length
  const step = useScrollStep(section, count)
  const current = Math.round(step)
  const last = count - 1
  const feature = features[current]

  useLayoutEffect(() => {
    const element = trail.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setSize({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) }),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const center = Math.min(56, size.width / 2)
  const track = useMemo(() => buildTrack(count, center), [count, center])

  // Markierung zwischen zwei Stationen, entsprechend dem Scrollstand
  const from = Math.floor(step)
  const to = Math.min(last, from + 1)
  const progress = track.stationLengths[from] + (track.stationLengths[to] - track.stationLengths[from]) * (step - from)
  const { point: marker, index: markerIndex } = pointAt(track, progress)

  const traveled = useMemo(() => {
    const head = track.points.slice(0, markerIndex).map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    head.push(`${marker.x.toFixed(1)},${marker.y.toFixed(1)}`)
    return `M${head.join(" L")}`
  }, [track, marker.x, marker.y, markerIndex])

  const dots = useMemo(() => {
    const result: { x: number; y: number; at: number }[] = []
    for (let at = DOT_GAP; at < track.total; at += DOT_GAP) {
      if (track.stationLengths.some((length) => Math.abs(length - at) < 10)) continue
      const { point } = pointAt(track, at)
      result.push({ ...point, at })
    }
    return result
  }, [track])

  // Der Pfad wird verschoben, sodass die Markierung immer in der Mitte steht
  const offset = size.height / 2 - marker.y
  const nextStop = track.stationLengths[Math.min(last, current + 1)]

  return (
    <section
      ref={section}
      aria-label={label}
      className="relative"
      style={{ height: `${100 + (count - 1) * SCROLL_PER_STEP * 100}dvh` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden px-6 py-10 md:px-12">
        <header className="mx-auto w-full max-w-5xl">
          <p className="text-xs font-medium tracking-wide text-foreground/60">{label}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        </header>

        <div className="mx-auto grid min-h-0 w-full max-w-5xl flex-1 grid-cols-[4.5rem_1fr] gap-4 md:grid-cols-[14rem_1fr] md:gap-12">
          {/* Pfad: oben und unten ausgeblendet, sichtbar ist nur die aktuelle Station */}
          <div
            ref={trail}
            className="relative min-h-0 select-none [mask-image:linear-gradient(transparent_22%,black_42%,black_58%,transparent_78%)]"
          >
            {size.height > 0 && (
              <svg width={size.width} height={size.height} className="absolute inset-0 overflow-visible" aria-hidden="true">
                <defs>
                  <linearGradient id="feature-trail" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--brand)" stopOpacity="0" />
                    <stop offset="0.15" stopColor="var(--brand)" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <g transform={`translate(0 ${offset.toFixed(1)})`}>
                  {/* Noch vor uns: ASCII-Punkte, die zur nächsten Station hin schimmern */}
                  <g className="font-mono" fontSize="12" textAnchor="middle" dominantBaseline="central" fill="currentColor">
                    {dots.map((dot) => {
                      if (dot.at < progress + 4) return null
                      const leading = current < last && dot.at < nextStop
                      return (
                        <text
                          key={dot.at}
                          x={dot.x}
                          y={dot.y}
                          className={leading ? "roadmap-dot-lead" : undefined}
                          style={{ "--d": `${Math.round((dot.at - progress) * 9)}ms`, opacity: leading ? undefined : 0.25 } as CSSProperties}
                        >
                          {leading ? "·" : "."}
                        </text>
                      )
                    })}
                  </g>
                  {/* Schon gegangen */}
                  <path d={traveled} fill="none" stroke="url(#feature-trail)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />

                  {track.stations.map((station, i) => {
                    const done = progress >= track.stationLengths[i] - 0.5
                    const active = i === current
                    return (
                      <g key={i}>
                        {active && <circle cx={station.x} cy={station.y} r={12} fill="var(--brand)" className="roadmap-halo" style={{ transformOrigin: `${station.x}px ${station.y}px` }} />}
                        {i === last ? (
                          // Ziel: „x marks the spot“
                          <text x={station.x} y={station.y} textAnchor="middle" dominantBaseline="central" className="font-mono" fontSize={done ? 18 : 15} fill={done ? "var(--brand)" : "currentColor"} opacity={done ? 1 : 0.5}>
                            ×
                          </text>
                        ) : (
                          <circle
                            cx={station.x}
                            cy={station.y}
                            r={done && !active ? 3.5 : 5}
                            fill={done && !active ? "var(--brand)" : "var(--surface)"}
                            stroke={active || done ? "var(--brand)" : "currentColor"}
                            strokeOpacity={active || done ? 1 : 0.35}
                            strokeWidth={1.5}
                            className="transition-[r] duration-500"
                          />
                        )}
                        {/* Beschriftung neben der Station (nur auf breiten Bildschirmen) */}
                        <text
                          x={station.x + 24}
                          y={station.y}
                          dominantBaseline="central"
                          fill="currentColor"
                          className={cn("hidden text-[12px] transition-opacity duration-500 md:block", active ? "font-medium" : "")}
                          opacity={active ? 1 : 0.5}
                        >
                          <tspan className="font-mono" fontSize="10" opacity="0.6">
                            {String(i + 1).padStart(2, "0")}{"  "}
                          </tspan>
                          {features[i].label}
                        </text>
                      </g>
                    )
                  })}

                  {/* Reisender */}
                  <circle cx={marker.x} cy={marker.y} r={4} fill="var(--brand)" />
                  <circle cx={marker.x} cy={marker.y} r={9} fill="none" stroke="var(--brand)" strokeOpacity={0.35} />
                </g>
              </svg>
            )}
          </div>

          {/* Nur die aktuelle Station; key: blendet beim Wechsel neu ein */}
          <div className="flex min-h-0 items-center">
            <article key={current} className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out motion-reduce:animate-none">
              <p className="font-mono text-xs text-foreground/60">
                {String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} · {feature.label}
              </p>
              <h3 className="mt-3 text-3xl leading-tight font-semibold tracking-tight md:text-5xl">{feature.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                <Emphasis text={feature.text} />
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {feature.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0" style={{ color: "var(--brand)" }} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
