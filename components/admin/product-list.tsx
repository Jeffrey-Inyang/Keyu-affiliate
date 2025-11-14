"use client"

import type { Product } from "@/lib/types/product"

interface ProductListProps {
  products: Product[]
  onDelete: (id: string) => Promise<void>
  onEdit: (product: Product) => void
}

export function ProductList({ products, onDelete, onEdit }: ProductListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products yet. Create one to get started!</p>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition">
              <div className="flex gap-4">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  {product.category && (
                    <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded mt-2">{product.category}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
