import { Fragment, type CSSProperties } from "react"

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

// Wörter nacheinander unscharf einblenden
export function Words({ text, start = 0, step = 80 }: { text: string; start?: number; step?: number }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="word-in inline-block" style={delay(start + i * step)}>
        {word}
      </span>
    </Fragment>
  ))
}

// Buchstaben „vergessen“ sich nacheinander kurz und kommen zurück
export function Forgetting({ word, start = 0 }: { word: string; start?: number }) {
  return (
    <span className="word-in inline-block" style={delay(start)}>
      {[...word].map((char, i) => (
        <span key={i} className="amnesia inline-block" style={delay(2600 + i * 90)}>
          {char}
        </span>
      ))}
    </span>
  )
}

// Überschrift: letztes Wort vergisst sich
export function ForgettingLine({ text, start = 0 }: { text: string; start?: number }) {
  const cut = text.lastIndexOf(" ")
  const head = text.slice(0, cut)
  const last = text.slice(cut + 1)
  return (
    <>
      <Words text={head} start={start} /> <Forgetting word={last} start={start + head.split(" ").length * 80} />
    </>
  )
}

// Zeile mit Ausrufezeichen, das am Ende hineinspringt
export function BangLine({ text, start = 0 }: { text: string; start?: number }) {
  const bang = text.endsWith("!")
  const body = bang ? text.slice(0, -1) : text
  const words = body.split(" ").length
  return (
    <>
      <Words text={body} start={start} step={110} />
      {bang && (
        <span className="bang inline-block" style={delay(start + words * 110 + 250)}>
          !
        </span>
      )}
    </>
  )
}

// **…** im Text hervorheben
export function Emphasis({ text }: { text: string }) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-medium text-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}
