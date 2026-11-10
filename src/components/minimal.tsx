import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Komponenten aus dem „Minimal“-Design-System; Stile in src/styles/minimal.css

type BtnStyle = {
  variant?: "glass" | "primary" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: boolean
  // Tooltip-Text
  tip?: string
}

function btnClass({ variant = "glass", size = "md", icon = false }: BtnStyle, className?: string) {
  return cn(
    "ds-btn",
    variant !== "glass" && `ds-btn--${variant}`,
    size !== "md" && `ds-btn--${size}`,
    icon && "ds-btn--icon",
    className,
  )
}

export function Btn({ variant, size, icon, tip, className, ...props }: BtnStyle & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      data-tip={tip}
      aria-label={tip}
      className={btnClass({ variant, size, icon }, className)}
      {...props}
    />
  )
}

export function BtnLink({ variant, size, icon, tip, className, ...props }: BtnStyle & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a data-tip={tip} className={btnClass({ variant, size, icon }, className)} {...props} />
}

// Landing-CTA; Farbe über --brand / --brand-fg vom Elternelement
export function Cta({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn("ds-cta", className)} {...props} />
}

export function Group({ label, tip, className, children }: { label: string; tip?: string; className?: string; children: ReactNode }) {
  return (
    <div role="toolbar" aria-label={label} data-tip={tip} className={cn("ds-group", className)}>
      {children}
    </div>
  )
}

// Segmentierte Auswahl mit gleitendem Indikator
export function Segmented<T extends string>({
  label,
  tip,
  items,
  value,
  onChange,
  itemWidth = 64,
}: {
  label: string
  tip?: string
  items: { value: T; label: ReactNode }[]
  value: T
  onChange: (value: T) => void
  itemWidth?: number
}) {
  const index = Math.max(0, items.findIndex((item) => item.value === value))
  return (
    <div
      role="group"
      aria-label={label}
      data-tip={tip}
      className="ds-group"
      style={{ "--seg-w": `${itemWidth}px` } as CSSProperties}
    >
      <span aria-hidden="true" className="ds-seg-ind" style={{ transform: `translateX(${index * (itemWidth + 2)}px)` }} />
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={item.value === value}
          className={cn("ds-seg", item.value === value && "is-on")}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
