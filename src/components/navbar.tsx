"use client"

import { useEffect, useState, useCallback } from "react"
import { Menu, X, ShoppingBag, Heart } from "lucide-react"
import { useCart, useFavorites } from "@/lib/store"
import CartDrawer from "@/components/cart-drawer"
import FavoritesDrawer from "@/components/favorites-drawer"

const links = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/#avis", label: "Avis" },
  { href: "/#contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
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
            href="/"
            className={`font-serif text-xl tracking-wide transition-colors ${
              scrolled ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            AYA
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#c4956a] ${
                  scrolled ? "text-[#2c2c2c]/60" : "text-white/70"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFavOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
              aria-label={`${favorites.length} favoris`}
            >
              <Heart className="h-4 w-4 text-red-400" />
              <span
                className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-[10px] font-bold text-white transition-transform duration-200 ${
                  favorites.length > 0 ? "scale-100" : "scale-0"
                }`}
              >
                {favorites.length}
              </span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="h-4 w-4 text-[#c4956a]" />
              <span
                className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white transition-transform duration-200 ${
                  totalItems > 0 ? "scale-100" : "scale-0"
                } ${lastAdded ? "bg-green-500" : "bg-[#c4956a]"}`}
              >
                {totalItems}
              </span>
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

        <div
          className={`absolute top-full left-0 right-0 border-t border-[#c4956a]/10 bg-[#faf7f2]/95 backdrop-blur-xl md:hidden transition-all duration-300 ease-out ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
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
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favOpen} onClose={() => setFavOpen(false)} />
    </>
  )
}
