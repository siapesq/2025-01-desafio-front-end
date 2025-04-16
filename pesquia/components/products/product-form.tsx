"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulando envio de dados
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/produtos")
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Produto</CardTitle>
        <CardDescription>Preencha os dados do novo produto que será adicionado ao catálogo</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input id="name" placeholder="Ex: Vara de Pesca Profissional" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">Código (SKU)</Label>
              <Input id="sku" placeholder="Ex: PROD-001" required />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="varas">Varas de Pesca</SelectItem>
                  <SelectItem value="molinetes">Molinetes</SelectItem>
                  <SelectItem value="anzois">Anzóis</SelectItem>
                  <SelectItem value="linhas">Linhas</SelectItem>
                  <SelectItem value="iscas">Iscas Artificiais</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input id="price" type="number" step="0.01" min="0" placeholder="0,00" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Quantidade em Estoque</Label>
              <Input id="stock" type="number" min="0" placeholder="0" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" placeholder="Descreva as características do produto..." rows={5} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input id="brand" placeholder="Ex: FishPro" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor</Label>
              <Input id="supplier" placeholder="Ex: Distribuidora de Pesca Ltda" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.push("/dashboard/produtos")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Produto"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
