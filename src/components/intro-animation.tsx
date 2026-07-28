"use client"

import { useEffect, useState } from "react"

export default function IntroAnimation() {
  const [show, setShow] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (leaving) {
      const t = setTimeout(() => setShow(false), 500)
      return () => clearTimeout(t)
    }
  }, [leaving])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1a1a]"
      style={leaving ? { animation: "slide-up 0.5s ease-in forwards" } : {}}
    >
      <div className="flex items-baseline gap-1 sm:gap-3 overflow-hidden">
        {"AYA".split("").map((letter, i) => (
          <span
            key={i}
            className="font-serif text-[clamp(5rem,25vw,12rem)] leading-none tracking-[-0.04em] text-[#c4956a] opacity-0"
            style={{
              animation: `fade-up 0.5s ease-out ${0.1 + i * 0.12}s forwards`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <p
        className="mt-4 sm:mt-6 font-sans text-[clamp(0.8rem,2vw,1.2rem)] tracking-[0.3em] text-[#f0e6d8]/70 uppercase opacity-0"
        style={{ animation: "fade-up 0.5s ease-out 0.6s forwards" }}
      >
        Asilah &mdash; Maroc
      </p>
    </div>
  )
}
