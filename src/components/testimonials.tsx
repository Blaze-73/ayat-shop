"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Fatima Z.",
    text: "Des créations d'une élégance rare. La robe sur mesure que j'ai commandée est absolument magnifique — chaque détail est parfait.",
  },
  {
    name: "Sarah M.",
    text: "Les boucles d'oreilles perlées sont un véritable bijou d'artisanat. Je reçois des compliments à chaque fois que je les porte.",
  },
  {
    name: "Leïla K.",
    text: "Aya a créé le sac perlier de mes rêves pour mon mariage. Un travail minutieux, plein de patience et d'amour. Merci infiniment !",
  },
  {
    name: "Mariam D.",
    text: "Ce n'est pas juste de la mode, c'est de l'art. Chaque pièce raconte une histoire et reflète un savoir-faire exceptionnel.",
  },
  {
    name: "Aïcha B.",
    text: "La qualité est incomparable et le contact humain est précieux. Aya prend le temps de comprendre vos envies pour créer la pièce parfaite.",
  },
]

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: "-80px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="avis"
      ref={ref}
      className="relative px-6 py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#a0765a]">
            Témoignages
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#1a1a1a]">
            Ce qu&apos;elles disent
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-[#c4956a]/40" />
        </div>

        <div className="relative mt-14">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none -mx-6 px-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`min-w-[300px] sm:min-w-[340px] flex-shrink-0 snap-start transition-all duration-700 ease-out ${
                  inView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-[#c4956a]/5">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-[#c4956a] text-[#c4956a]"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-sm sm:text-base leading-relaxed text-[#2c2c2c]/75">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="mt-4 font-serif text-sm text-[#a0765a]">
                    — {t.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-[#faf7f2] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
