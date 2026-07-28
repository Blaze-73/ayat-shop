"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart } from "lucide-react"
import { easeOut } from "@/lib/eases"

const products = [
  {
    name: "Robe Ébène",
    category: "Vêtements",
    gradient: "from-[#2c2c2c] to-[#1a1a1a]",
    price: "Sur mesure",
  },
  {
    name: "Sac Perlier Nubia",
    category: "Accessoires Perliers",
    gradient: "from-[#c4956a] to-[#a0765a]",
    price: "Sur mesure",
  },
  {
    name: "Créoles Dorées",
    category: "Boucles d'Oreilles",
    gradient: "from-[#d4a574] to-[#c4956a]",
    price: "Sur mesure",
  },
  {
    name: "Ensemble Saharienne",
    category: "Vêtements",
    gradient: "from-[#a0765a] to-[#8b5e3c]",
    price: "Sur mesure",
  },
  {
    name: "Bracelet Perles Fines",
    category: "Accessoires Perliers",
    gradient: "from-[#f0e6d8] to-[#e8d5c4]",
    price: "Sur mesure",
    textDark: true,
  },
  {
    name: "Pendanges d'Art",
    category: "Boucles d'Oreilles",
    gradient: "from-[#8b5e3c] to-[#5c3a2e]",
    price: "Sur mesure",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const productVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export default function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="creations"
      ref={ref}
      className="px-6 py-24 sm:py-32 bg-[#faf7f2]"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#a0765a]">
            Collection
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#1a1a1a]">
            Mes créations
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-[#c4956a]/40" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <motion.div
              key={product.name}
              variants={productVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg"
            >
              <div
                className={`relative h-64 sm:h-72 w-full bg-gradient-to-br ${product.gradient} flex flex-col justify-end p-6 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 8px,
                        rgba(255,255,255,0.3) 8px,
                        rgba(255,255,255,0.3) 9px
                      )
                    `,
                  }}
                />

                <button
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 active:scale-95"
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className="h-4 w-4 text-white" />
                </button>

                <div className="relative z-10">
                  <p
                    className={`text-xs uppercase tracking-[0.2em] ${product.textDark ? "text-[#a0765a]" : "text-white/60"}`}
                  >
                    {product.category}
                  </p>
                  <h3
                    className={`mt-1 font-serif text-xl ${product.textDark ? "text-[#1a1a1a]" : "text-white"}`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${product.textDark ? "text-[#2c2c2c]/60" : "text-white/50"}`}
                  >
                    {product.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
