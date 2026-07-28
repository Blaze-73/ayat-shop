"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Heart, ArrowRight } from "lucide-react"
import { useCart, useFavorites, getSingleProductWhatsAppUrl } from "@/lib/store"
import { featuredProducts } from "@/lib/products"
import ProductModal from "@/components/product-modal"
import { easeOut } from "@/lib/eases"

export default function Shop() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof featuredProducts)[number] | null
  >(null)
  const { addItem, lastAdded } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <>
      <section
        id="selection"
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
            {featuredProducts.map((product, i) => {
              const fav = isFavorite(product.name)
              const justAdded = lastAdded === product.name
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: easeOut,
                    delay: i * 0.08,
                  }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div
                    className={`relative h-56 sm:h-64 w-full bg-gradient-to-br ${product.gradient} overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.5) 8px, rgba(255,255,255,0.5) 9px)
                        `,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
                        {product.category}
                      </span>
                      {product.isNew && (
                        <span className="inline-block rounded-full bg-[#c4956a]/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
                          Nouveau
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(product.name)
                      }}
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
                      aria-label={
                        fav
                          ? "Retirer des favoris"
                          : "Ajouter aux favoris"
                      }
                    >
                      <Heart
                        className={`h-3.5 w-3.5 transition-all ${
                          fav
                            ? "fill-red-400 text-red-400 scale-110"
                            : "text-white"
                        }`}
                      />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          addItem({
                            name: product.name,
                            category: product.category,
                            price: product.price,
                            gradient: product.gradient,
                          })
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex-1 rounded-xl py-3 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                          justAdded
                            ? "bg-green-500 text-white"
                            : "bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 hover:bg-white/30"
                        }`}
                      >
                        {justAdded ? "Ajouté ✓" : "Ajouter au panier"}
                      </motion.button>
                      <motion.a
                        href={getSingleProductWhatsAppUrl(
                          product.name,
                          product.price,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="rounded-xl bg-[#25D366] px-3 py-3 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#20BD5C]"
                        aria-label="Commander via WhatsApp"
                      >
                        <span className="sr-only">WhatsApp</span>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </motion.a>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg text-[#1a1a1a]">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#c4956a]">
                      {product.price}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a
              href="/boutique"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-8 py-4 text-xs uppercase tracking-[0.15em] text-white transition-all hover:bg-[#c4956a] hover:gap-3"
            >
              Voir toute la boutique
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
