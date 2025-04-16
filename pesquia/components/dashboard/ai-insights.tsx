import { Brain, Lightbulb, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AiInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Insights da IA
        </CardTitle>
        <CardDescription>Análises e recomendações baseadas em dados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <TrendingUp className="mt-1 h-5 w-5 text-primary" />
          <div>
            <h4 className="font-semibold">Oportunidade de Crescimento</h4>
            <p className="text-sm text-muted-foreground">
              Os produtos da categoria "Varas de Pesca" tiveram um aumento de 28% nas vendas no último trimestre.
              Considere aumentar o estoque e investir em marketing para esta categoria.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <Lightbulb className="mt-1 h-5 w-5 text-amber-500" />
          <div>
            <h4 className="font-semibold">Alerta de Estoque</h4>
            <p className="text-sm text-muted-foreground">
              5 produtos populares estão com estoque abaixo do nível crítico. Recomendamos fazer pedidos de reposição
              imediatamente para evitar perda de vendas.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <Brain className="mt-1 h-5 w-5 text-blue-500" />
          <div>
            <h4 className="font-semibold">Otimização de Preços</h4>
            <p className="text-sm text-muted-foreground">
              Análise de mercado sugere que os preços dos "Anzóis Especiais" podem ser aumentados em 5-10% sem impacto
              significativo nas vendas, potencialmente aumentando a margem de lucro.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
