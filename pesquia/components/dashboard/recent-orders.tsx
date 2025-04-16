import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

//TODO: IMPLEMENTAR A BUSCA DOS PEDIDOS NO BANCO DE DADOS
const orders = [
  {
    id: "ORD-001",
    customer: "João Silva",
    status: "completed",
    date: new Date("2023-07-15"),
    total: 1250.99,
  },
  {
    id: "ORD-002",
    customer: "Maria Oliveira",
    status: "processing",
    date: new Date("2023-07-14"),
    total: 890.5,
  },
  {
    id: "ORD-003",
    customer: "Pedro Santos",
    status: "pending",
    date: new Date("2023-07-13"),
    total: 450.25,
  },
  {
    id: "ORD-004",
    customer: "Ana Costa",
    status: "completed",
    date: new Date("2023-07-12"),
    total: 1875.0,
  },
  {
    id: "ORD-005",
    customer: "Carlos Ferreira",
    status: "cancelled",
    date: new Date("2023-07-11"),
    total: 320.75,
  },
]

const statusMap = {
  completed: { label: "Concluído", variant: "default" },
  processing: { label: "Processando", variant: "secondary" },
  pending: { label: "Pendente", variant: "warning" },
  cancelled: { label: "Cancelado", variant: "destructive" },
} as const

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
        <CardDescription>Últimos 5 pedidos realizados no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[order.status as keyof typeof statusMap].variant as any}>
                    {statusMap[order.status as keyof typeof statusMap].label}
                  </Badge>
                </TableCell>
                <TableCell>{format(order.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
