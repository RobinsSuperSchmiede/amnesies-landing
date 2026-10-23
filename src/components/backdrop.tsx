import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Layer = { id: number; src: string }

// Zwei Ebenen: neues Bild wird erst geladen, dann über das alte geblendet.
// Das Bild wird unverändert gezeigt (keine Filter); Position und Größe kommen über className.
// rotated: ab md um 90° gedreht; erwartet einen 9:16-Rahmen, Breite und Höhe des Bildes sind darauf getauscht.
export function Backdrop({
  src,
  fit = "cover",
  rotated = false,
  className,
}: {
  src: string
  fit?: "cover" | "contain"
  rotated?: boolean
  className?: string
}) {
  const [layers, setLayers] = useState<Layer[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const nextId = useRef(0)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const id = nextId.current++
      setLayers((prev) => [...prev.slice(-1), { id, src }])
      // erst gerendert mit opacity 0, dann aktivieren, damit die Überblendung läuft
      requestAnimationFrame(() => requestAnimationFrame(() => setActiveId(id)))
    }
    img.src = src
    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden", className)}>
      {layers.map((layer) => (
        <img
          key={layer.id}
          src={layer.src}
          alt=""
          decoding="async"
          className={cn(
            "backdrop-layer absolute motion-reduce:transition-none",
            "inset-0 size-full",
            rotated &&
              "md:inset-auto md:top-1/2 md:left-1/2 md:h-[56.25%] md:w-[177.78%] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2 md:rotate-90",
            fit === "contain" ? "object-contain" : "object-cover",
            layer.id === activeId ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
          )}
        />
      ))}
    </div>
  )
}
