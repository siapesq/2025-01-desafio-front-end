"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, Settings, Brain, Users, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Fish } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Produtos",
    href: "/dashboard/produtos",
    icon: Package,
  },
  // TODO: em construção
  // {
  //   title: "Pedidos",
  //   href: "/dashboard/pedidos",
  //   icon: ShoppingCart,
  // },
  // {
  //   title: "Relatórios",
  //   href: "/dashboard/relatorios",
  //   icon: TrendingUp,
  // },
  {
    title: "Análise IA",
    href: "/dashboard/ia",
    icon: Brain,
  },
    // TODO: em construção
  // {
  //   title: "Usuários",
  //   href: "/dashboard/usuarios",
  //   icon: Users,
  // },
  // {
  //   title: "Configurações",
  //   href: "/dashboard/configuracoes",
  //   icon: Settings,
  // },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <nav className="flex flex-col gap-2 p-4">
      {sidebarItems.map((item) => (
        <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              pathname === item.href && "bg-accent/20 text-accent-foreground hover:bg-accent/30",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Button>
        </Link>
      ))}
    </nav>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center border-b px-4">
              <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <Fish className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">pesquIA</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r bg-background">
        <SidebarContent />
      </aside>
    </>
  )
}
