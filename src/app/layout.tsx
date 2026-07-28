import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import Providers from "@/context/providers"
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

const fontDisplay = "swap"

export const metadata: Metadata = {
  title: "AYA — Boutique de vêtements & accessoires à Asilah",
  description:
    "Une sélection soignée de robes, accessoires perliers et boucles d'oreilles. Boutique artisanale à Asilah, Maroc.",
  keywords: [
    "vêtements femme",
    "accessoires mode",
    "boucles d'oreilles",
    "boutique Asilah",
    "mode Maroc",
    "Aya",
  ],
  openGraph: {
    title: "AYA — Vêtements & Accessoires | Asilah",
    description:
      "Une sélection soignée de robes, accessoires perliers et boucles d'oreilles, dénichée pour vous à Asilah.",
    type: "website",
    locale: "fr_FR",
    siteName: "AYA",
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "Cache-Control": "public, max-age=31536000, immutable",
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
      <body className="min-h-dvh font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
