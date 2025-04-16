import type { Metadata } from "next"
import { DashboardCards } from "@/components/dashboard/cards"
import { DashboardOverview } from "@/components/dashboard/overview"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { AiInsights } from "@/components/dashboard/ai-insights"
import { auth } from "@/lib/auth"


export const metadata: Metadata = {
  title: "Dashboard | pesquIA",
  description: "Visão geral do sistema pesquIA",
}

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo, {session?.user?.name || "undefined"}</p>
      </div>
      <DashboardCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardOverview />
        <AiInsights />
      </div>
      <RecentOrders />
    </div>
  )
}
