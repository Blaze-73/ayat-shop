"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shirt, Hand, Ear } from "lucide-react"
import { easeOut } from "@/lib/eases"

const categories = [
  {
    icon: Shirt,
    title: "Vêtements",
    description:
      "Pièces uniques confectionnées à la main, des robes aux ensembles sur mesure. Chaque couture raconte une histoire.",
    color: "from-[#c4956a]/20 to-[#c4956a]/5",
  },
  {
    icon: Hand,
    title: "Accessoires Perliers",
    description:
      "Sacs, bracelets et ceintures ornés de perles fines. L'élégance dans les moindres détails.",
    color: "from-[#d4a574]/20 to-[#d4a574]/5",
  },
  {
    icon: Ear,
    title: "Boucles d'Oreilles",
    description:
      "Créations artisanales en perles, fils et métal. Des pièces qui dansent à chaque mouvement.",
    color: "from-[#a0765a]/20 to-[#a0765a]/5",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
}

export default function Categories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="categories"
      ref={ref}
      className="px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#a0765a]">
            Mon univers
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#1a1a1a]">
            Ce que je crée
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-[#c4956a]/40" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-60 transition-opacity group-hover:opacity-100`}
                />
                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#faf7f2] ring-1 ring-[#c4956a]/10">
                    <Icon className="h-6 w-6 text-[#c4956a]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#1a1a1a]">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2c2c2c]/70">
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
