import { Settings, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AiSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configurações de IA
        </CardTitle>
        <CardDescription>Personalize como a IA analisa e apresenta os dados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-notifications">Notificações de IA</Label>
            <Switch id="ai-notifications" defaultChecked />
          </div>
          <p className="text-xs text-muted-foreground">
            Receba alertas quando a IA identificar oportunidades ou problemas
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-auto-implement">Implementação Automática</Label>
            <Switch id="ai-auto-implement" />
          </div>
          <p className="text-xs text-muted-foreground">
            Permitir que a IA implemente automaticamente sugestões de baixo impacto
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ai-frequency">Frequência de Análise</Label>
          <Select defaultValue="daily">
            <SelectTrigger id="ai-frequency">
              <SelectValue placeholder="Selecione a frequência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">A cada hora</SelectItem>
              <SelectItem value="daily">Diariamente</SelectItem>
              <SelectItem value="weekly">Semanalmente</SelectItem>
              <SelectItem value="monthly">Mensalmente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ai-focus">Foco da Análise</Label>
          <Select defaultValue="all">
            <SelectTrigger id="ai-focus">
              <SelectValue placeholder="Selecione o foco" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os aspectos</SelectItem>
              <SelectItem value="sales">Vendas</SelectItem>
              <SelectItem value="inventory">Estoque</SelectItem>
              <SelectItem value="pricing">Preços</SelectItem>
              <SelectItem value="customers">Clientes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </CardFooter>
    </Card>
  )
}
