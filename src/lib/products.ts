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
}

export const products: Product[] = [
  // Vêtements (8)
  {
    name: "Robe d'Été Fleurie",
    category: "Vêtements",
    price: "4 500 DZD",
    gradient: "from-[#2c2c2c] to-[#1a1a1a]",
    description:
      "Une robe légère et fluide, parfaite pour les journées ensoleillées. Tissu en coton bio, coupe évasée et motifs floraux délicats faits main.",
    isNew: true,
  },
  {
    name: "Ensemble Saharienne",
    category: "Vêtements",
    price: "6 200 DZD",
    gradient: "from-[#a0765a] to-[#8b5e3c]",
    description:
      "Ensemble deux pièces inspiré des tenues sahariennes. Veste brodée et pantalon large assorti, confectionnés dans un lin premium.",
  },
  {
    name: "Robe de Cérémonie",
    category: "Vêtements",
    price: "8 500 DZD",
    gradient: "from-[#5c3a2e] to-[#3a2218]",
    description:
      "Robe longue de cérémonie en satin de soie. Corsage ajusté, jupe volumineuse avec des perles brodées à la main.",
    isNew: true,
  },
  {
    name: "Kimono Brodé",
    category: "Vêtements",
    price: "5 500 DZD",
    gradient: "from-[#c4956a] to-[#8b5e3c]",
    description:
      "Kimono long en soie légère avec broderies florales faites main. Parfait pour une touche d'élégance orientale.",
  },
  {
    name: "Jupe Plissée Main",
    category: "Vêtements",
    price: "3 200 DZD",
    gradient: "from-[#8b5e3c] to-[#6b4226]",
    description:
      "Jupe plissée confectionnée à la main en tissu léger. Taille élastiquée, parfaite pour toutes les morphologies.",
  },
  {
    name: "Blouse en Soie",
    category: "Vêtements",
    price: "4 800 DZD",
    gradient: "from-[#d4a574] to-[#c4956a]",
    description:
      "Blouse en soie naturelle avec manches bouffantes. Boutons en nacre, coupe cintrée élégante.",
  },
  {
    name: "Caftan Moderne",
    category: "Vêtements",
    price: "7 200 DZD",
    gradient: "from-[#3a2218] to-[#1a0f0a]",
    description:
      "Caftan revisité avec une touche moderne. Broderies dorées faites main, tissu en velours premium.",
  },
  {
    name: "Chemisier Brodé",
    category: "Vêtements",
    price: "3 900 DZD",
    gradient: "from-[#e8d5c4] to-[#d4a574]",
    textDark: true,
    description:
      "Chemisier en coton léger avec broderies délicates au col et aux poignets. Parfait pour le quotidien.",
  },

  // Accessoires (6)
  {
    name: "Sac Perlier Nubia",
    category: "Accessoires",
    price: "3 800 DZD",
    gradient: "from-[#c4956a] to-[#a0765a]",
    description:
      "Sac à main perlier orné de perles fines tissées à la main. Anse en cuir véritable, doublure en satin.",
    isNew: true,
  },
  {
    name: "Collier de Perles Fines",
    category: "Accessoires",
    price: "2 800 DZD",
    gradient: "from-[#e8d5c4] to-[#d4a574]",
    textDark: true,
    description:
      "Collier de perles fines d'eau douce montées à la main. Fermoir en argent massif. Longueur ajustable.",
  },
  {
    name: "Ceinture Perlée",
    category: "Accessoires",
    price: "2 200 DZD",
    gradient: "from-[#f0e6d8] to-[#e8d5c4]",
    textDark: true,
    description:
      "Ceinture tressée ornée de perles de verre et de nacre. Boucle en laiton doré.",
  },
  {
    name: "Broche Fleurie",
    category: "Accessoires",
    price: "1 800 DZD",
    gradient: "from-[#8b5e3c] to-[#c4956a]",
    description:
      "Broche artisanale en forme de fleur. Perles et fils métalliques entrelacés à la main. Pièce unique.",
  },
  {
    name: "Bague en Argent",
    category: "Accessoires",
    price: "2 500 DZD",
    gradient: "from-[#2c2c2c] to-[#4a4a4a]",
    description:
      "Bague en argent massif 925 avec motif gravé main. Taille ajustable, finition polie.",
  },
  {
    name: "Éventail Brodé",
    category: "Accessoires",
    price: "1 500 DZD",
    gradient: "from-[#a0765a] to-[#c4956a]",
    description:
      "Éventail en bois et soie avec broderies faites main. Accessoire d'appoint élégant pour toutes vos tenues.",
    isNew: true,
  },

  // Boucles d'Oreilles (6)
  {
    name: "Créoles Dorées",
    category: "Boucles d'Oreilles",
    price: "1 500 DZD",
    gradient: "from-[#d4a574] to-[#c4956a]",
    description:
      "Boucles d'oreilles créoles en métal doré à l'or fin. Motifs gravés main, fermeture sécurisée. Légères et élégantes.",
  },
  {
    name: "Boucles d'Oreilles Pendantes",
    category: "Boucles d'Oreilles",
    price: "1 200 DZD",
    gradient: "from-[#8b5e3c] to-[#5c3a2e]",
    description:
      "Boucles d'oreilles pendantes en perles et fils métalliques. Design asymétrique unique, chaque paire est une pièce originale.",
    isNew: true,
  },
  {
    name: "Puces de Perles",
    category: "Boucles d'Oreilles",
    price: "900 DZD",
    gradient: "from-[#e8d5c4] to-[#f0e6d8]",
    textDark: true,
    description:
      "Puces d'oreilles en perles fines montées sur tige en argent. Discrètes et élégantes, pour toutes les occasions.",
  },
  {
    name: "Boucles Filigrane",
    category: "Boucles d'Oreilles",
    price: "2 000 DZD",
    gradient: "from-[#c4956a] to-[#8b5e3c]",
    description:
      "Boucles d'oreilles en filigrane d'argent et dorure. Travail délicat de dentelle métallique fait main.",
  },
  {
    name: "Pendantes Nacré",
    category: "Boucles d'Oreilles",
    price: "1 800 DZD",
    gradient: "from-[#f0e6d8] to-[#d4a574]",
    textDark: true,
    description:
      "Boucles d'oreilles pendantes en nacre naturelle montée en argent. Reflets irisés uniques.",
  },
  {
    name: "Créoles Perlées",
    category: "Boucles d'Oreilles",
    price: "1 600 DZD",
    gradient: "from-[#5c3a2e] to-[#8b5e3c]",
    description:
      "Créoles en laiton doré ornées de perles fines. Un intemporel revisité avec élégance.",
  },
]

export const featuredProducts = products.filter((p) => p.isNew ?? false).slice(0, 6)
