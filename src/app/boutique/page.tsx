"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Filter } from "lucide-react"
import { products, CATEGORIES, type Category } from "@/lib/products"
import { useCart, useFavorites, getSingleProductWhatsAppUrl } from "@/lib/store"
import ProductModal from "@/components/product-modal"
import { easeOut } from "@/lib/eases"

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous")
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[number] | null
  >(null)
  const { addItem, lastAdded } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  const filtered =
    activeCategory === "Tous"
      ? products
      : products.filter((p) =>
          activeCategory === "Nouveautés"
            ? p.isNew
            : p.category === activeCategory,
        )

  return (
    <>
      <div className="min-h-dvh bg-[#faf7f2] pt-24 sm:pt-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#a0765a] text-center">
              AYA — Artisanale &amp; Élégance
            </p>
            <h1 className="mt-2 text-center font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#1a1a1a]">
              La boutique
            </h1>
            <p className="mt-3 text-center text-sm text-[#2c2c2c]/60">
              {filtered.length} article{filtered.length > 1 ? "s" : ""}
              {activeCategory !== "Tous" ? ` — ${activeCategory}` : ""}
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-all ${
                  activeCategory === cat
                    ? "bg-[#1a1a1a] text-white shadow-md"
                    : "bg-white text-[#2c2c2c]/60 hover:text-[#c4956a] border border-[#c4956a]/10 hover:border-[#c4956a]/30"
                }`}
              >
                {cat === "Tous" ? (
                  <span className="flex items-center gap-2">
                    <Filter className="h-3 w-3" />
                    Tous
                  </span>
                ) : (
                  cat
                )}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-24"
          >
            {filtered.map((product, i) => {
              const fav = isFavorite(product.name)
              const justAdded = lastAdded === product.name
              return (
                <motion.div
                  layout
                  key={product.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeOut, delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div
                    className={`relative h-56 sm:h-64 w-full bg-gradient-to-br ${product.gradient} overflow-hidden`}
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                        quality={60}
                      />
                    )}
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
                        fav ? "Retirer des favoris" : "Ajouter aux favoris"
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
                            image: product.image,
                          })
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex-1 rounded-xl py-3 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                          justAdded
                            ? "bg-green-500 text-white"
                            : "bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto hover:bg-white/30"
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
                        className="rounded-xl bg-[#25D366] px-3 py-3 text-xs font-medium text-white opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 hover:bg-[#20BD5C]"
                        aria-label="Commander via WhatsApp"
                      >
                        <ShoppingBag className="h-4 w-4" />
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
          </motion.div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
