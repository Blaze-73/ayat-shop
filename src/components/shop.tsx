"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingBag } from "lucide-react"
import { easeOut } from "@/lib/eases"

const products = [
  {
    name: "Robe d'Été Fleurie",
    category: "Vêtements",
    price: "4 500 DZD",
    gradient: "from-[#2c2c2c] to-[#1a1a1a]",
  },
  {
    name: "Ensemble Saharienne",
    category: "Vêtements",
    price: "6 200 DZD",
    gradient: "from-[#a0765a] to-[#8b5e3c]",
  },
  {
    name: "Sac Perlier Nubia",
    category: "Accessoires",
    price: "3 800 DZD",
    gradient: "from-[#c4956a] to-[#a0765a]",
  },
  {
    name: "Créoles Dorées",
    category: "Boucles d'Oreilles",
    price: "1 500 DZD",
    gradient: "from-[#d4a574] to-[#c4956a]",
  },
  {
    name: "Robe de Cérémonie",
    category: "Vêtements",
    price: "8 500 DZD",
    gradient: "from-[#5c3a2e] to-[#3a2218]",
  },
  {
    name: "Collier de Perles Fines",
    category: "Accessoires",
    price: "2 800 DZD",
    gradient: "from-[#e8d5c4] to-[#d4a574]",
    textDark: true,
  },
  {
    name: "Boucles d'Oreilles Pendantes",
    category: "Boucles d'Oreilles",
    price: "1 200 DZD",
    gradient: "from-[#8b5e3c] to-[#5c3a2e]",
  },
  {
    name: "Ceinture Perlée",
    category: "Accessoires",
    price: "2 200 DZD",
    gradient: "from-[#f0e6d8] to-[#e8d5c4]",
    textDark: true,
  },
  {
    name: "Kimono Brodé",
    category: "Vêtements",
    price: "5 500 DZD",
    gradient: "from-[#c4956a] to-[#8b5e3c]",
  },
]

export default function Shop() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="boutique"
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
            Nouveautés
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#1a1a1a]">
            La boutique
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-[#c4956a]/40" />
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeOut, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div
                className={`relative h-56 sm:h-64 w-full bg-gradient-to-br ${product.gradient} overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 8px,
                        rgba(255,255,255,0.5) 8px,
                        rgba(255,255,255,0.5) 9px
                      )
                    `,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
                    {product.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-xl bg-white/20 backdrop-blur-sm py-3 text-xs font-medium uppercase tracking-[0.15em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                  >
                    Commander
                  </motion.button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg text-[#1a1a1a]">
                    {product.name}
                  </h3>
                  <ShoppingBag className="h-4 w-4 text-[#c4956a] shrink-0 mt-1" />
                </div>
                <p className="mt-1 text-sm font-medium text-[#c4956a]">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
