"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types/product"
import { ProductForm } from "@/components/admin/product-form"
import { ProductList } from "@/components/admin/product-list"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAuthed, setIsAuthed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("keyu_admin_token") : null

      if (token === "authenticated") {
        setIsAuthed(true)
        fetchProducts()
      } else {
        router.push("/admin/login")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (data) setProducts(data)
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (!error) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleSave = async (productData: Omit<Product, "id" | "created_at">) => {
    try {
      if (editingProduct) {
        console.log("[v0] Updating product:", editingProduct.id)
        const { error } = await supabase.from("products").update(productData).eq("id", editingProduct.id)

        if (error) {
          console.error("[v0] Update error:", error)
          alert(`Error updating product: ${error.message}`)
          return
        }
        fetchProducts()
        setEditingProduct(null)
      } else {
        console.log("[v0] Inserting new product:", productData)
        const { error, data } = await supabase.from("products").insert([productData])

        if (error) {
          console.error("[v0] Insert error:", error)
          alert(`Error adding product: ${error.message}`)
          return
        }
        console.log("[v0] Insert successful:", data)
        fetchProducts()
      }
    } catch (err) {
      console.error("[v0] Exception:", err)
      alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }

  if (!isAuthed || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Keyu products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductForm
            onSave={handleSave}
            initialData={editingProduct || undefined}
            onCancel={() => setEditingProduct(null)}
          />
          <ProductList products={products} onDelete={handleDelete} onEdit={setEditingProduct} />
        </div>
      </div>
    </div>
  )
}
