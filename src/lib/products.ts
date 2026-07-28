import c1 from "@/images/clothes/womens-black-and-white-dress-with-high-heels-shoes.webp"
import c2 from "@/images/clothes/floral-blouse-with-jeans-photo.webp"
import c3 from "@/images/clothes/01408615-02-1_front.webp"
import c4 from "@/images/clothes/01361486-01-1_styledfront.webp"

import a1 from "@/images/accessories/shopdressup_gold_statement_earrings-2_f3337c0b-2519-4699-8b8b-d32d75c4e7f5.webp"
import a2 from "@/images/accessories/71aZNuQZwSL.webp"
import a3 from "@/images/accessories/61kYg4sX5+L.webp"
import a4 from "@/images/accessories/61kfRVhy4HL.webp"

import b1 from "@/images/boucles/71EawIrRV-L.webp"
import b2 from "@/images/boucles/7156Z-pcAeL.webp"
import b3 from "@/images/boucles/61Y3uR6NaeL.webp"
import b4 from "@/images/boucles/61pQTds-XJL.webp"

const clothesImgs = [c1, c2, c3, c4]
const accImgs = [a1, a2, a3, a4]
const bouclesImgs = [b1, b2, b3, b4]

const imgMap: Record<string, string[]> = {
  "Vêtements": clothesImgs.map((i) => i.src),
  "Accessoires": accImgs.map((i) => i.src),
  "Boucles d'Oreilles": bouclesImgs.map((i) => i.src),
}

const catIdx: Record<string, number> = {}

function pickImg(category: string): string {
  const images = imgMap[category]
  if (!images) return ""
  if (!(category in catIdx)) catIdx[category] = 0
  const idx = catIdx[category]
  catIdx[category] = (idx + 1) % images.length
  return images[idx]
}

export const CATEGORIES = [
  "Tous",
  "Vêtements",
  "Accessoires",
  "Boucles d'Oreilles",
  "Nouveautés",
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Product {
  name: string
  category: string
  price: string
  gradient: string
  textDark?: boolean
  description: string
  isNew?: boolean
  image?: string
}

const productData: Omit<Product, "image">[] = [
  // Vêtements (8)
  {
    name: "Robe d'Été Fleurie",
    category: "Vêtements",
    price: "450 MAD",
    gradient: "from-[#2c2c2c] to-[#1a1a1a]",
    description:
      "Une robe légère et fluide, parfaite pour les journées ensoleillées. Tissu en coton bio, coupe évasée et motifs floraux délicats faits main.",
    isNew: true,
  },
  {
    name: "Ensemble Saharienne",
    category: "Vêtements",
    price: "620 MAD",
    gradient: "from-[#a0765a] to-[#8b5e3c]",
    description:
      "Ensemble deux pièces inspiré des tenues sahariennes. Veste brodée et pantalon large assorti, confectionnés dans un lin premium.",
  },
  {
    name: "Robe de Cérémonie",
    category: "Vêtements",
    price: "850 MAD",
    gradient: "from-[#5c3a2e] to-[#3a2218]",
    description:
      "Robe longue de cérémonie en satin de soie. Corsage ajusté, jupe volumineuse avec des perles brodées à la main.",
    isNew: true,
  },
  {
    name: "Kimono Brodé",
    category: "Vêtements",
    price: "550 MAD",
    gradient: "from-[#c4956a] to-[#8b5e3c]",
    description:
      "Kimono long en soie légère avec broderies florales faites main. Parfait pour une touche d'élégance orientale.",
  },
  {
    name: "Jupe Plissée Main",
    category: "Vêtements",
    price: "320 MAD",
    gradient: "from-[#8b5e3c] to-[#6b4226]",
    description:
      "Jupe plissée confectionnée à la main en tissu léger. Taille élastiquée, parfaite pour toutes les morphologies.",
  },
  {
    name: "Blouse en Soie",
    category: "Vêtements",
    price: "480 MAD",
    gradient: "from-[#d4a574] to-[#c4956a]",
    description:
      "Blouse en soie naturelle avec manches bouffantes. Boutons en nacre, coupe cintrée élégante.",
  },
  {
    name: "Caftan Moderne",
    category: "Vêtements",
    price: "720 MAD",
    gradient: "from-[#3a2218] to-[#1a0f0a]",
    description:
      "Caftan revisité avec une touche moderne. Broderies dorées faites main, tissu en velours premium.",
  },
  {
    name: "Chemisier Brodé",
    category: "Vêtements",
    price: "390 MAD",
    gradient: "from-[#e8d5c4] to-[#d4a574]",
    textDark: true,
    description:
      "Chemisier en coton léger avec broderies délicates au col et aux poignets. Parfait pour le quotidien.",
  },

  // Accessoires (6)
  {
    name: "Sac Perlier Nubia",
    category: "Accessoires",
    price: "380 MAD",
    gradient: "from-[#c4956a] to-[#a0765a]",
    description:
      "Sac à main perlier orné de perles fines tissées à la main. Anse en cuir véritable, doublure en satin.",
    isNew: true,
  },
  {
    name: "Collier de Perles Fines",
    category: "Accessoires",
    price: "280 MAD",
    gradient: "from-[#e8d5c4] to-[#d4a574]",
    textDark: true,
    description:
      "Collier de perles fines d'eau douce montées à la main. Fermoir en argent massif. Longueur ajustable.",
  },
  {
    name: "Ceinture Perlée",
    category: "Accessoires",
    price: "220 MAD",
    gradient: "from-[#f0e6d8] to-[#e8d5c4]",
    textDark: true,
    description:
      "Ceinture tressée ornée de perles de verre et de nacre. Boucle en laiton doré.",
  },
  {
    name: "Broche Fleurie",
    category: "Accessoires",
    price: "180 MAD",
    gradient: "from-[#8b5e3c] to-[#c4956a]",
    description:
      "Broche artisanale en forme de fleur. Perles et fils métalliques entrelacés à la main. Pièce unique.",
  },
  {
    name: "Bague en Argent",
    category: "Accessoires",
    price: "250 MAD",
    gradient: "from-[#2c2c2c] to-[#4a4a4a]",
    description:
      "Bague en argent massif 925 avec motif gravé main. Taille ajustable, finition polie.",
  },
  {
    name: "Éventail Brodé",
    category: "Accessoires",
    price: "150 MAD",
    gradient: "from-[#a0765a] to-[#c4956a]",
    description:
      "Éventail en bois et soie avec broderies faites main. Accessoire d'appoint élégant pour toutes vos tenues.",
    isNew: true,
  },

  // Boucles d'Oreilles (6)
  {
    name: "Créoles Dorées",
    category: "Boucles d'Oreilles",
    price: "150 MAD",
    gradient: "from-[#d4a574] to-[#c4956a]",
    description:
      "Boucles d'oreilles créoles en métal doré à l'or fin. Motifs gravés main, fermeture sécurisée. Légères et élégantes.",
  },
  {
    name: "Boucles d'Oreilles Pendantes",
    category: "Boucles d'Oreilles",
    price: "120 MAD",
    gradient: "from-[#8b5e3c] to-[#5c3a2e]",
    description:
      "Boucles d'oreilles pendantes en perles et fils métalliques. Design asymétrique unique, chaque paire est une pièce originale.",
    isNew: true,
  },
  {
    name: "Puces de Perles",
    category: "Boucles d'Oreilles",
    price: "90 MAD",
    gradient: "from-[#e8d5c4] to-[#f0e6d8]",
    textDark: true,
    description:
      "Puces d'oreilles en perles fines montées sur tige en argent. Discrètes et élégantes, pour toutes les occasions.",
  },
  {
    name: "Boucles Filigrane",
    category: "Boucles d'Oreilles",
    price: "200 MAD",
    gradient: "from-[#c4956a] to-[#8b5e3c]",
    description:
      "Boucles d'oreilles en filigrane d'argent et dorure. Travail délicat de dentelle métallique fait main.",
  },
  {
    name: "Pendantes Nacré",
    category: "Boucles d'Oreilles",
    price: "180 MAD",
    gradient: "from-[#f0e6d8] to-[#d4a574]",
    textDark: true,
    description:
      "Boucles d'oreilles pendantes en nacre naturelle montée en argent. Reflets irisés uniques.",
  },
  {
    name: "Créoles Perlées",
    category: "Boucles d'Oreilles",
    price: "160 MAD",
    gradient: "from-[#5c3a2e] to-[#8b5e3c]",
    description:
      "Créoles en laiton doré ornées de perles fines. Un intemporel revisité avec élégance.",
  },
]

export const products: Product[] = productData.map((p) => ({
  ...p,
  image: pickImg(p.category),
}))

export const featuredProducts = products.filter((p) => p.isNew ?? false).slice(0, 6)
