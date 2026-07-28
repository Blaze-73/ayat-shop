"use client"

import { type ReactNode } from "react"
import { CartProvider, FavoritesProvider } from "@/lib/store"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </CartProvider>
  )
}
