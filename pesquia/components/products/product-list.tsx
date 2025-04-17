"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";
import { Edit, MoreHorizontal, Trash, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
};

const statusMap = {
  "in-stock": { label: "Em estoque", variant: "default" },
  "low-stock": { label: "Estoque baixo", variant: "warning" },
  "out-of-stock": { label: "Sem estoque", variant: "destructive" },
  "em-analise": { label: "Em análise", variant: "secondary" },
} as const;

export function ProductList() {
  const queryClient = useQueryClient();

  const { data: resp, isLoading, isError, error } = useQuery<{
    products: Product[];
  }>({
    queryKey: ["products"],
    queryFn: () => fetcher("/api/product"),
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetcher<void>(`/api/product/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Produto excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      toast.error(`Erro ao excluir: ${err.message}`);
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selId, setSelId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelId(id);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selId) deleteMutation.mutate(selId);
    setDialogOpen(false);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="animate-spin mr-2 h-5 w-5" />
      <span>Carregando produtos…</span>
    </div>
  );
  if (isError) return (
    <div className="flex items-center justify-center text-destructive py-8">
      <AlertCircle className="mr-2 h-5 w-5" />
      <span>Erro: {(error as Error).message}</span>
    </div>
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Produtos</CardTitle>
        <CardDescription>Gerencie seu catálogo</CardDescription>
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
            {resp!.products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(p.price)}
                </TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                <Badge
                  variant={(statusMap[p.status] || statusMap["em-analise"]).variant as any}
                >
                  {(statusMap[p.status] || statusMap["em-analise"]).label}
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
                        {/* <Link href={`/dashboard/produtos/${p.id}`}>
                          Editar
                        </Link> */}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(p.id)}>
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar exclusão</DialogTitle>
              <DialogDescription>
                Essa ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Excluindo…" : "Excluir"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
