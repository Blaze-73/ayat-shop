"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Heart, Minus, Plus } from "lucide-react"
import { useCart, useFavorites, getSingleProductWhatsAppUrl } from "@/lib/store"
import { easeOut } from "@/lib/eases"
import { useState } from "react"

interface ProductModalProps {
  product: {
    name: string
    category: string
    price: string
    gradient: string
    description?: string
    textDark?: boolean
    image?: string
  } | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const fav = isFavorite(product.name)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm p-0 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[#faf7f2] rounded-t-3xl sm:rounded-3xl shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>

          <div
            className={`relative h-64 sm:h-80 w-full bg-gradient-to-br ${product.gradient}`}
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority
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

            <div className="absolute top-4 left-4">
              <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-white">
                {product.category}
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(product.name)}
              className="absolute top-4 right-16 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
              aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart
                className={`h-4 w-4 transition-all ${
                  fav ? "fill-red-400 text-red-400 scale-110" : "text-white"
                }`}
              />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#a0765a]">
                {product.category}
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#1a1a1a]">
                {product.name}
              </h2>
              <p className="mt-2 text-xl font-medium text-[#c4956a]">
                {product.price}
              </p>
            </div>

            {product.description && (
              <p className="text-sm leading-relaxed text-[#2c2c2c]/70">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-4">
              <span className="text-sm text-[#2c2c2c]/60">Quantité</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c4956a]/20 text-[#c4956a] hover:bg-[#c4956a]/10 transition-colors"
                  aria-label="Diminuer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center font-medium text-[#1a1a1a]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c4956a]/20 text-[#c4956a] hover:bg-[#c4956a]/10 transition-colors"
                  aria-label="Augmenter"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addItem({
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      gradient: product.gradient,
                      image: product.image,
                    })
                  }
                  onClose()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a1a1a] px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-[#c4956a] hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" />
                Ajouter au panier —{" "}
                {(
                  parseInt(product.price.replace(/\s/g, ""), 10) * quantity
                ).toLocaleString("fr-MA")}{" "}
                MAD
              </button>

              <a
                href={getSingleProductWhatsAppUrl(product.name, product.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#c4956a]/20 bg-white px-6 py-4 text-sm font-medium text-[#2c2c2c] transition-all hover:bg-[#c4956a]/5 hover:border-[#c4956a]/40"
              >
                Me renseigner via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
