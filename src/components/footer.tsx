"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Globe, Send, MapPin, Heart } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/store"
import { easeOut } from "@/lib/eases"

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative px-6 py-20 sm:py-28 bg-[#1a1a1a] text-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4956a]/30 to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,#c4956a08,transparent)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight">
              Parlons de
              <br />
              <span className="text-[#c4956a]">votre projet</span>
            </h2>
            <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-white/50">
              Chaque création commence par une conversation. Que vous ayez
              une idée précise ou besoin d&apos;inspiration, je suis là
              pour donner vie à vos envies.
            </p>

            <div className="mt-8 flex flex-col gap-4 text-sm text-white/60">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[#c4956a]"
              >
                <Globe className="h-5 w-5" />
                @aya.artisanale
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[#c4956a]"
              >
                <Send className="h-5 w-5" />
                +212 {WHATSAPP_NUMBER.substring(3, 5)} {WHATSAPP_NUMBER.substring(5, 8)} {WHATSAPP_NUMBER.substring(8)}
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                Asilah, Maroc
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
            className="flex flex-col items-start lg:items-end justify-center"
          >
            {submitted ? (
              <div className="w-full max-w-md rounded-xl border border-[#c4956a]/30 bg-[#c4956a]/10 p-8 text-center">
                <p className="font-serif text-lg text-[#c4956a]">Message envoyé !</p>
                <p className="mt-2 text-sm text-white/60">Merci, je vous répondrai dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#c4956a]/50 focus:bg-white/10"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#c4956a]/50 focus:bg-white/10"
                />
                <textarea
                  name="message"
                  placeholder="Parlez-moi de votre projet..."
                  rows={3}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#c4956a]/50 focus:bg-white/10"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#c4956a] px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-[#a0765a]"
                >
                  Envoyer
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-col items-center gap-2 border-t border-white/5 pt-8 text-center text-xs text-white/30"
        >
          <p className="flex items-center gap-1">
            &copy; 2026 AYA — Fait avec{" "}
            <Heart className="inline h-3 w-3 fill-[#c4956a] text-[#c4956a]" />{" "}
            et artisanat
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
