"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

export const WHATSAPP_NUMBER = "212600000000"

export interface CartItem {
  name: string
  category: string
  price: string
  gradient: string
  quantity: number
  image?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (name: string) => void
  updateQuantity: (name: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: string
  lastAdded: string | null
}

const CartContext = createContext<CartContextType | null>(null)

const CART_KEY = "aya-cart"

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [lastAdded, setLastAdded] = useState<string | null>(null)

  useEffect(() => {
    setItems(loadCart())
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    }
  }, [items, loaded])

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name)
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setLastAdded(item.name)
    setTimeout(() => setLastAdded(null), 1200)
  }, [])

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name))
  }, [])

  const updateQuantity = useCallback((name: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.name !== name))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, quantity } : i)),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  const totalPrice = items.reduce((sum, i) => {
    const price = parseInt(i.price.replace(/\s/g, ""), 10)
    return sum + price * i.quantity
  }, 0)
  const formattedTotal = totalPrice.toLocaleString("fr-MA") + " MAD"

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice: formattedTotal,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

function buildWhatsAppMessage(
  items: CartItem[],
  total: string,
): string {
  const lines = items.map(
    (i) => `• ${i.name} x${i.quantity} — ${(
      parseInt(i.price.replace(/\s/g, ""), 10) * i.quantity
    ).toLocaleString("fr-MA")} MAD`,
  )
  return encodeURIComponent(
    [
      "🛒 *Commande AYA* 🛒\n",
      "📦 *Articles :*",
      ...lines,
      "",
      `💰 *Total : ${total}*`,
      "",
      "Merci de me contacter pour finaliser ma commande 😊",
    ].join("\n"),
  )
}

export function getWhatsAppUrl(
  items: CartItem[],
  total: string,
): string {
  const msg = buildWhatsAppMessage(items, total)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

export function getSingleProductWhatsAppUrl(
  name: string,
  price: string,
): string {
  const msg = encodeURIComponent(
    `Bonjour Aya ! Je suis intéressé(e) par :\n\n*${name}* — ${price}\n\nPouvez-vous me donner plus de détails ? 😊`,
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (name: string) => void
  isFavorite: (name: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

const FAV_KEY = "aya-favorites"

function loadFavorites(): string[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(FAV_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setFavorites(loadFavorites())
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
    }
  }, [favorites, loaded])

  const toggleFavorite = useCallback((name: string) => {
    setFavorites((prev) =>
      prev.includes(name)
        ? prev.filter((f) => f !== name)
        : [...prev, name],
    )
  }, [])

  const isFavorite = useCallback(
    (name: string) => favorites.includes(name),
    [favorites],
  )

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider")
  return ctx
}
