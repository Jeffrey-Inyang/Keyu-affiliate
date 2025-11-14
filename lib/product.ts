export interface Product {
  id: string
  name: string
  description: string
  category: string | null
  image_url: string
  affiliate_url: string
  created_at: string
}

export type ProductCategory = "All" | "Tops" | "Bottoms" | "Outerwear" | "Footwear" | "Accessories"
