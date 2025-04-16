import { Brain, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function AiDashboard() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Dashboard de IA
        </CardTitle>
        <CardDescription>Visão geral das análises e insights gerados pela IA</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Eficiência Operacional</span>
              </div>
              <span className="text-sm font-bold">78%</span>
            </div>
            <Progress value={78} className="h-2" />
            <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Alertas Ativos</span>
              </div>
              <span className="text-sm font-bold">3</span>
            </div>
            <Progress value={30} className="h-2 bg-muted" />
            <p className="text-xs text-muted-foreground">-2 em relação ao mês anterior</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Sugestões Implementadas</span>
              </div>
              <span className="text-sm font-bold">12</span>
            </div>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-muted-foreground">+4 em relação ao mês anterior</p>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Resumo da Análise</h3>
          <p className="text-sm text-muted-foreground">
            A IA analisou 1.245 transações nos últimos 30 dias e identificou 3 áreas críticas que precisam de atenção.
            As vendas de produtos da categoria "Varas de Pesca" aumentaram 28%, enquanto as vendas de "Iscas
            Artificiais" diminuíram 12%. Recomendamos revisar a estratégia de preços para iscas artificiais e aumentar o
            estoque de varas de pesca para atender à demanda crescente.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
