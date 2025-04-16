import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductList } from "@/components/products/product-list"
import { ProductFilters } from "@/components/products/product-filters"

export const metadata: Metadata = {
  title: "Produtos | pesquIA",
  description: "Gerenciamento de produtos do sistema pesquIA",
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Link href="/dashboard/produtos/novo">
          <Button>Adicionar Produto</Button>
        </Link>
      </div>
      <ProductFilters />
      <ProductList />
    </div>
  )
}
