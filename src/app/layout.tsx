import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AYA — Artisanale & Élégance",
  description:
    "Découvrez l'univers d'Aya : vêtements faits main, accessoires perliers et boucles d'oreilles artisanales. L'élégance à l'état pur.",
  keywords: [
    "bijoux faits main",
    "accessoires perliers",
    "boucles d'oreilles artisanales",
    "vêtements femme",
    "mode artisanale",
    "Aya",
  ],
  openGraph: {
    title: "AYA — Artisanale & Élégance",
    description:
      "Découvrez l'univers d'Aya : vêtements faits main, accessoires perliers et boucles d'oreilles artisanales.",
    type: "website",
    locale: "fr_FR",
  },
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-dvh font-sans antialiased">{children}</body>
    </html>
  )
}
