"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    name: "Jan",
    vendas: 4000,
    compras: 2400,
  },
  {
    name: "Fev",
    vendas: 3000,
    compras: 1398,
  },
  {
    name: "Mar",
    vendas: 2000,
    compras: 9800,
  },
  {
    name: "Abr",
    vendas: 2780,
    compras: 3908,
  },
  {
    name: "Mai",
    vendas: 1890,
    compras: 4800,
  },
  {
    name: "Jun",
    vendas: 2390,
    compras: 3800,
  },
  {
    name: "Jul",
    vendas: 3490,
    compras: 4300,
  },
]

export function DashboardOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
        <CardDescription>Comparativo de vendas e compras nos últimos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$${value}`}
            />
            <Tooltip />
            <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="compras" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
