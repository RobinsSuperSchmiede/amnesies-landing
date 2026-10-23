import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Layer = { id: number; src: string }

// Zwei Ebenen: neues Bild wird erst geladen, dann über das alte geblendet.
// Das Bild wird unverändert gezeigt (keine Filter); Position und Größe kommen über className.
export function Backdrop({ src, fit = "cover", className }: { src: string; fit?: "cover" | "contain"; className?: string }) {
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
            "backdrop-layer absolute inset-0 size-full motion-reduce:transition-none",
            fit === "contain" ? "object-contain" : "object-cover",
            layer.id === activeId ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
          )}
        />
      ))}
    </div>
  )
}
