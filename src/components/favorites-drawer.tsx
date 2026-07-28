"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ShoppingBag } from "lucide-react"
import { useFavorites, useCart, getSingleProductWhatsAppUrl } from "@/lib/store"
import { products } from "@/lib/products"
import { easeOut } from "@/lib/eases"

export default function FavoritesDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { favorites, toggleFavorite } = useFavorites()
  const { addItem } = useCart()
  const favProducts = products.filter((p) => favorites.includes(p.name))

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#faf7f2] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-[#c4956a]/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-red-400" />
                <h2 className="font-serif text-xl text-[#1a1a1a]">
                  Favoris
                </h2>
                {favProducts.length > 0 && (
                  <span className="rounded-full bg-red-400 px-2.5 py-0.5 text-xs text-white">
                    {favProducts.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Fermer les favoris"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {favProducts.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <Heart className="h-12 w-12 text-red-300/30" />
                <p className="font-serif text-lg text-[#1a1a1a]/50">
                  Aucun favori pour le moment
                </p>
                <p className="text-sm text-[#2c2c2c]/40 max-w-xs">
                  Cliquez sur le cœur ♡ à côté d&apos;un produit pour l&apos;ajouter à vos favoris
                </p>
                <button
                  onClick={onClose}
                  className="rounded-full bg-[#1a1a1a] px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#c4956a]"
                >
                  Découvrir la boutique
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                  {favProducts.map((product) => (
                    <motion.div
                      key={product.name}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <div
                        className={`h-20 w-20 shrink-0 rounded-xl bg-gradient-to-br ${product.gradient}`}
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-serif text-sm text-[#1a1a1a]">
                              {product.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-[#2c2c2c]/50">
                              {product.category}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleFavorite(product.name)}
                            className="shrink-0 text-red-300 hover:text-red-400 transition-colors"
                            aria-label={`Retirer ${product.name} des favoris`}
                          >
                            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#c4956a]">
                            {product.price}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                addItem({
                                  name: product.name,
                                  category: product.category,
                                  price: product.price,
                                  gradient: product.gradient,
                                })
                              }
                              className="rounded-full bg-[#1a1a1a] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#c4956a]"
                            >
                              <ShoppingBag className="inline h-3 w-3 mr-1" />
                              Panier
                            </button>
                            <a
                              href={getSingleProductWhatsAppUrl(
                                product.name,
                                product.price,
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-[#25D366] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#20BD5C]"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#c4956a]/10 px-6 py-5">
                  <button
                    onClick={onClose}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#c4956a]/20 px-6 py-3 text-xs text-[#2c2c2c]/60 transition-colors hover:bg-white"
                  >
                    Voir tous les produits
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
