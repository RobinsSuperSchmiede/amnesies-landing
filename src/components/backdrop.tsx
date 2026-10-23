import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Layer = { id: number; src: string }

// Zwei Ebenen: neues Bild wird erst geladen, dann über das alte geblendet
export function Backdrop({ src }: { src: string }) {
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
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      {layers.map((layer) => (
        <div
          key={layer.id}
          className={cn(
            "backdrop-layer absolute -inset-[2%] bg-cover bg-center bg-no-repeat",
            layer.id === activeId ? "scale-100 opacity-55" : "scale-[1.06] opacity-0",
          )}
          style={{ backgroundImage: `url("${layer.src}")` }}
        />
      ))}
      <div className="backdrop-scrim absolute inset-0 transition-colors duration-500" />
    </div>
  )
}
