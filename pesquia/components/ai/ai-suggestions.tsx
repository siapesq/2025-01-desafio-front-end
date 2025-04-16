import { Lightbulb, ArrowRight, Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


//TODO: Implementar a conexão com a API do gemini
const suggestions = [
  {
    id: 1,
    title: "Otimização de Estoque",
    description:
      "Reduzir em 15% o estoque de iscas artificiais da marca XYZ e aumentar em 20% o estoque de varas de pesca premium.",
    impact: "Alto",
    status: "pending",
  },
  {
    id: 2,
    title: "Ajuste de Preços",
    description: "Aumentar em 5% o preço dos anzóis especiais, que têm alta demanda e baixa sensibilidade a preço.",
    impact: "Médio",
    status: "implemented",
  },
  {
    id: 3,
    title: "Promoção Sazonal",
    description: "Criar uma promoção especial para molinetes durante a temporada de pesca que se aproxima.",
    impact: "Alto",
    status: "pending",
  },
]

export function AiSuggestions() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Sugestões da IA
        </CardTitle>
        <CardDescription>Recomendações baseadas em análise de dados para melhorar seu negócio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{suggestion.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-medium">Impacto: {suggestion.impact}</span>
                  {suggestion.status === "implemented" ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-500">
                      <Check className="h-3 w-3" /> Implementado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
                      <X className="h-3 w-3" /> Pendente
                    </span>
                  )}
                </div>
              </div>
              {suggestion.status === "pending" && (
                <Button variant="outline" size="sm" className="shrink-0">
                  Implementar
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
