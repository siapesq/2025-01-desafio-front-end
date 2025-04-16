"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// TODO: Implementar a busca dos produtos no banco de dados
const products = [
  {
    id: "PROD-001",
    name: "Vara de Pesca Profissional",
    category: "Varas",
    price: 299.99,
    stock: 45,
    status: "in-stock",
  },
  {
    id: "PROD-002",
    name: "Molinete Ultra Light",
    category: "Molinetes",
    price: 189.9,
    stock: 32,
    status: "in-stock",
  },
  {
    id: "PROD-003",
    name: "Kit Anzóis Especiais",
    category: "Anzóis",
    price: 49.9,
    stock: 120,
    status: "in-stock",
  },
  {
    id: "PROD-004",
    name: "Linha Multifilamento 0.30mm",
    category: "Linhas",
    price: 79.9,
    stock: 8,
    status: "low-stock",
  },
  {
    id: "PROD-005",
    name: "Isca Artificial Lambari",
    category: "Iscas",
    price: 35.5,
    stock: 0,
    status: "out-of-stock",
  },
]

const statusMap = {
  "in-stock": { label: "Em estoque", variant: "default" },
  "low-stock": { label: "Estoque baixo", variant: "warning" },
  "out-of-stock": { label: "Sem estoque", variant: "destructive" },
} as const

export function ProductList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setSelectedProduct(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Aqui implementaria a lógica de exclusão
    console.log(`Produto ${selectedProduct} excluído`)
    setDeleteDialogOpen(false)
    setSelectedProduct(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Produtos</CardTitle>
        <CardDescription>Gerencie seu catálogo de produtos de pesca</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[product.status as keyof typeof statusMap].variant as any}>
                    {statusMap[product.status as keyof typeof statusMap].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/produtos/${product.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(product.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
