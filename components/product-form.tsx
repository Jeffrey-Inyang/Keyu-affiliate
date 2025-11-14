"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/types/product"

interface ProductFormProps {
  onSave: (data: Omit<Product, "id" | "created_at">) => Promise<void>
  initialData?: Product
  onCancel?: () => void
}

const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"]

export function ProductForm({ onSave, initialData, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image_url: "",
    affiliate_url: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category || "",
        image_url: initialData.image_url,
        affiliate_url: initialData.affiliate_url,
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSave({
        ...formData,
        updated_at: new Date().toISOString(),
      } as any)
      if (!initialData) {
        setFormData({
          name: "",
          description: "",
          category: "",
          image_url: "",
          affiliate_url: "",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">{initialData ? "Edit Product" : "Add New Product"}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., Premium Wool Jacket"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Brief product description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category (Optional)</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">None</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL *</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="https://example.com/image.jpg"
          />
          {formData.image_url && (
            <img
              src={formData.image_url || "/placeholder.svg"}
              alt="Preview"
              className="mt-3 h-40 object-cover rounded-lg"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Affiliate URL *</label>
          <input
            type="url"
            name="affiliate_url"
            value={formData.affiliate_url}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="https://example.com/product"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 font-medium"
          >
            {isLoading ? "Saving..." : initialData ? "Update" : "Add Product"}
          </button>
          {initialData && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
