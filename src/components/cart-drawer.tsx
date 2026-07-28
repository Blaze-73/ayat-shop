"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart, getWhatsAppUrl } from "@/lib/store"
import { easeOut } from "@/lib/eases"

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart()

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
                <ShoppingBag className="h-5 w-5 text-[#c4956a]" />
                <h2 className="font-serif text-xl text-[#1a1a1a]">
                  Panier
                </h2>
                {totalItems > 0 && (
                  <span className="rounded-full bg-[#c4956a] px-2.5 py-0.5 text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="h-12 w-12 text-[#c4956a]/30" />
                <p className="font-serif text-lg text-[#1a1a1a]/50">
                  Votre panier est vide
                </p>
                <button
                  onClick={onClose}
                  className="rounded-full bg-[#1a1a1a] px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#c4956a]"
                >
                  Continuer mes achats
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.name}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <div
                        className={`relative h-14 w-14 sm:h-20 sm:w-20 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${item.gradient}`}
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif text-sm text-[#1a1a1a]">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.name)}
                              className="shrink-0 text-[#2c2c2c]/30 hover:text-red-400 transition-colors"
                              aria-label={`Retirer ${item.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-[#2c2c2c]/50">
                            {item.category}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.name, item.quantity - 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c4956a]/20 text-[#c4956a] hover:bg-[#c4956a]/10 transition-colors"
                              aria-label="Diminuer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-[#1a1a1a]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.name, item.quantity + 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c4956a]/20 text-[#c4956a] hover:bg-[#c4956a]/10 transition-colors"
                              aria-label="Augmenter"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-medium text-[#c4956a]">
                            {(
                              parseInt(item.price.replace(/\s/g, ""), 10) *
                              item.quantity
                            ).toLocaleString("fr-MA")}{" "}
                            MAD
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#c4956a]/10 px-6 py-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#2c2c2c]/60">Sous-total</span>
                    <span className="font-medium text-[#1a1a1a]">
                      {totalPrice}
                    </span>
                  </div>
                  <a
                    href={getWhatsAppUrl(items, totalPrice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-medium text-white transition-all hover:bg-[#20BD5C] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Commander via WhatsApp
                  </a>
                  <button
                    onClick={clearCart}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-6 py-3 text-xs text-red-400 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Vider le panier
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
