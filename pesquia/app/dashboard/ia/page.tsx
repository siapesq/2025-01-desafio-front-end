import type { Metadata } from "next"
import { AiDashboard } from "@/components/ai/ai-dashboard"
import { AiSuggestions } from "@/components/ai/ai-suggestions"
import { AiSettings } from "@/components/ai/ai-settings"

export const metadata: Metadata = {
  title: "Análise IA | pesquIA",
  description: "Análises e insights de IA do sistema pesquIA",
}

export default function AiPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Análise de IA</h1>
      <p className="text-muted-foreground">
        Insights e recomendações baseadas em inteligência artificial para otimizar seu negócio
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AiDashboard />
        <AiSuggestions />
        <AiSettings />
      </div>
    </div>
  )
}
