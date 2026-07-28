import Image from "next/image"
import { ArrowDown } from "lucide-react"
import heroBg from "@/images/messy-women-s-closet-filled-colorful-clothes-young-fill-many-outfits-clothing-shirts-dresses-69370739.webp"

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0e6d8]/40 via-[#faf7f2] to-[#faf7f2]" />

      <div
        className="absolute inset-0 opacity-0"
        style={{ animation: "hero-fade 0.8s ease-out 2s forwards" }}
      >
        <Image src={heroBg} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,#c4956a20,transparent_70%)]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(196,149,106,0.5) 40px, rgba(196,149,106,0.5) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(196,149,106,0.5) 40px, rgba(196,149,106,0.5) 41px)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1
          className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] tracking-[-0.02em] text-white opacity-0"
          style={{ animation: "fade-up 0.5s ease-out 0.1s forwards" }}
        >
          Vêtements
          <br />
          <span className="text-[#c4956a]">&amp; Accessoires</span>
        </h1>

        <p
          className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-white/70 opacity-0"
          style={{ animation: "fade-up 0.5s ease-out 0.25s forwards" }}
        >
          Une sélection soignée de robes, accessoires perliers
          et boucles d&apos;oreilles, dénichée pour vous
          à Asilah.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto opacity-0"
          style={{ animation: "fade-up 0.5s ease-out 0.4s forwards" }}
        >
          <a
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-[#c4956a] hover:scale-[1.03] active:scale-[0.97]"
          >
            Explorer la boutique
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40 hover:scale-[1.03] active:scale-[0.97]"
          >
            Me contacter
          </a>
        </div>
      </div>

      <a
        href="/boutique"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white opacity-0"
        style={{ animation: "fade-up 0.8s ease-out 1.8s forwards" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Découvrir</span>
        <div style={{ animation: "bounce-arrow 2s ease-in-out infinite" }}>
          <ArrowDown size={16} />
        </div>
      </a>
    </section>
  )
}
