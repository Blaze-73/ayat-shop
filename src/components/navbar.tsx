"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, Heart } from "lucide-react"
import { useCart, useFavorites } from "@/lib/store"
import CartDrawer from "@/components/cart-drawer"
import { easeOut } from "@/lib/eases"

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#boutique", label: "Boutique" },
  { href: "#categories", label: "Univers" },
  { href: "#creations", label: "Créations" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems, lastAdded } = useCart()
  const { favorites } = useFavorites()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    },
    [],
  )

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#faf7f2]/80 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        }`}
        onKeyDown={handleKeyDown}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#accueil"
            className="font-serif text-xl tracking-wide text-[#1a1a1a]"
          >
            AYA
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.15em] text-[#2c2c2c]/60 transition-colors hover:text-[#c4956a]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {favorites.length > 0 && (
              <a
                href="#boutique"
                className="relative hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
                aria-label={`${favorites.length} favoris`}
              >
                <Heart className="h-4 w-4 text-[#c4956a]" />
              </a>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="h-4 w-4 text-[#c4956a]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                      lastAdded ? "bg-green-500" : "bg-[#c4956a]"
                    }`}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setOpen(!open)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setOpen(!open)
                }
              }}
              className="relative z-50 flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="absolute top-full left-0 right-0 border-t border-[#c4956a]/10 bg-[#faf7f2]/95 backdrop-blur-xl md:hidden"
              role="navigation"
              aria-label="Menu mobile"
            >
              <nav className="flex flex-col px-6 py-6 gap-3">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm uppercase tracking-[0.15em] text-[#2c2c2c]/60 transition-colors hover:text-[#c4956a]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
