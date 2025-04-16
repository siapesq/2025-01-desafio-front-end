import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductForm } from "@/components/products/product-form"

export const metadata: Metadata = {
  title: "Novo Produto | pesquIA",
  description: "Adicionar novo produto ao sistema pesquIA",
}

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/produtos">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Novo Produto</h1>
      </div>
      <ProductForm />
    </div>
  )
}
