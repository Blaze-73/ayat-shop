"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { easeOut, easeInOut } from "@/lib/eases"
import heroBg from "@/images/messy-women-s-closet-filled-colorful-clothes-young-fill-many-outfits-clothing-shirts-dresses-69370739.webp"

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeOut },
    },
  }

  return (
    <section
      id="accueil"
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0e6d8]/40 via-[#faf7f2] to-[#faf7f2] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 4.5, ease: easeOut }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${heroBg.src})` }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,#c4956a20,transparent_70%)] pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(196, 149, 106, 0.5) 40px,
              rgba(196, 149, 106, 0.5) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(196, 149, 106, 0.5) 40px,
              rgba(196, 149, 106, 0.5) 41px
            )
          `,
        }}
      />

      <div className="absolute top-12 left-12 w-32 h-px bg-gradient-to-r from-[#c4956a]/30 to-transparent hidden sm:block" />
      <div className="absolute top-12 left-12 w-px h-32 bg-gradient-to-b from-[#c4956a]/30 to-transparent hidden sm:block" />

      <div className="absolute bottom-12 right-12 w-32 h-px bg-gradient-to-l from-[#c4956a]/30 to-transparent hidden sm:block" />
      <div className="absolute bottom-12 right-12 w-px h-32 bg-gradient-to-t from-[#c4956a]/30 to-transparent hidden sm:block" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c4956a]" />
          Collection Printemps-Été 2026
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-serif font-bold text-[clamp(2.8rem,10vw,6rem)] leading-[1.05] tracking-[-0.02em] text-white drop-shadow-lg"
        >
          L&apos;Art des
          <br />
          <span className="text-[#c4956a]">Vetements</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-white/70"
        >
          Une sélection soignée de robes, accessoires perliers
          et boucles d&apos;oreilles, dénichée pour vous
          à Asilah.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <motion.a
            href="/boutique"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#c4956a]"
          >
            Explorer la boutique
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:border-white/40"
          >
            Me contacter
          </motion.a>
        </motion.div>


      </motion.div>

      <motion.a
        href="/boutique"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-white"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: easeInOut }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  )
}
