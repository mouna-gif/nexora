import type { Product } from "../types"

export const products: Product[] = [
  {
    id: "1",
    name: "Calacatta Gold Satiné",
    sku: "CAR-6042",
    brand: "Marazzi",
    category: "Carrelage",
    price: 89.9,
    unit: "m²",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=85",
    description:
      "Un grès cérame effet marbre aux veinures dorées délicates, conçu pour apporter une élégance intemporelle à chaque espace.",
    dimensions: "60 × 60 cm",
    inStock: true,
    badge: "BEST-SELLER",
  },
  {
    id: "2",
    name: "Vasque Luna Blanc Mat",
    sku: "SAN-2189",
    brand: "Roca",
    category: "Sanitaire",
    price: 459,
    unit: "pièce",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=85",
    description:
      "Vasque à poser aux lignes douces et contemporaines, en céramique blanche finition mate.",
    dimensions: "50 × 38 cm",
    inStock: true,
    badge: "NOUVEAU",
  },
  {
    id: "3",
    name: "Mitigeur Essence",
    sku: "ROB-1048",
    brand: "Grohe",
    category: "Robinetterie",
    price: 329,
    unit: "pièce",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=85",
    description:
      "Mitigeur lavabo en laiton chromé avec cartouche céramique et économie d’eau.",
    dimensions: "Taille M",
    inStock: true,
  },
  {
    id: "4",
    name: "Travertin Sable Naturel",
    sku: "CAR-7701",
    brand: "Atlas Concorde",
    category: "Carrelage",
    price: 74.5,
    unit: "m²",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85",
    description:
      "Carrelage texturé à l’aspect pierre naturelle, doux et chaleureux.",
    dimensions: "60 × 120 cm",
    inStock: false,
    badge: "-20%",
  },
  {
    id: "5",
    name: "Colonne de douche Euphoria",
    sku: "DOU-3310",
    brand: "Grohe",
    category: "Sanitaire",
    price: 1199,
    unit: "pièce",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=700&q=85",
    description:
      "Colonne thermostatique complète, pluie enveloppante et douchette à main.",
    dimensions: "Ø 260 mm",
    inStock: true,
  },
  {
    id: "6",
    name: "Baignoire Îlot Noma",
    sku: "BAI-9024",
    brand: "Geberit",
    category: "Sanitaire",
    price: 4890,
    unit: "pièce",
    image:
      "https://images.unsplash.com/photo-1615541993128-9605374adf46?auto=format&fit=crop&w=700&q=85",
    description:
      "Baignoire îlot au dessin sculptural, toucher velours et confort profond.",
    dimensions: "170 × 80 cm",
    inStock: true,
    badge: "EXCLUSIVITÉ",
  },
]

export const orders = [
  {
    id: "NEX-1048",
    status: "En préparation",
    statusKey: "preparing",
    progress: 3,
    items: 3,
    date: "14 juin",
    total: 1289.7,
    images: products.slice(0, 3).map((p) => p.image),
  },
  {
    id: "NEX-0982",
    status: "En livraison",
    statusKey: "delivery",
    progress: 4,
    items: 2,
    date: "Aujourd’hui",
    total: 878,
    images: products.slice(2, 4).map((p) => p.image),
  },
]

export const stockAlerts = products.slice(0, 5).map((p, i) => ({
  name: p.name,
  sku: p.sku,
  image: p.image,
  physical: [12, 48, 9, 96, 21][i],
  reserved: [6, 14, 7, 28, 8][i],
  available: [6, 34, 2, 68, 13][i],
  level: [14, 68, 8, 88, 36][i],
}))
