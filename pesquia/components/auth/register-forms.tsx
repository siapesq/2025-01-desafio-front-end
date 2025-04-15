"use client"

import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { formSchema, FormValues } from "@/schemas/register-schema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { signIn } from "next-auth/react"



export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<FormValues>({
      resolver: zodResolver(formSchema) as any,
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isBusinessOwner: false,
        companyName: "",
        cnpj: "",
        companyAddress: "",
        companyCep: "",
      },
    })

  const isBusinessOwner = useWatch({
    control: form.control,
    name: "isBusinessOwner",
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await signIn("credentials", {
        action: "register",
        name: data.name,
        email: data.email,
        password: data.password,
        isBusinessOwner: data.isBusinessOwner,
        companyName: data.isBusinessOwner ? data.companyName : undefined,
        cnpj: data.isBusinessOwner ? data.cnpj : undefined,
        companyAddress: data.isBusinessOwner ? data.companyAddress : undefined,
        redirect: false,
      })

      if (response?.error) {
        setError(response.error)
        toast.error("Falha no cadastro", {
          description: response.error || "Ocorreu um erro durante o cadastro. Tente novamente.",
        })
      } else {
        toast.success("Cadastro realizado com sucesso!", {
          description: "Você será redirecionado para o dashboard.",
        })

        // Redirecionamento após registro bem-sucedido
        // O Auth.js deve redirecionar automaticamente para a callbackUrl,
        router.push(response?.url || "/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Register error:", error)
      setError(error instanceof Error ? error.message : "Ocorreu um erro inesperado")
      toast.error("Erro ao criar conta", {
        description: "Ocorreu um erro inesperado durante o cadastro. Tente novamente mais tarde.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro no cadastro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informações Pessoais</h3>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isBusinessOwner"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Cadastrar como dono de empresa</FormLabel>
                  <FormDescription>Marque esta opção se você deseja cadastrar uma empresa.</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {isBusinessOwner && (
          <div className="space-y-4">
            <Separator />
            <h3 className="text-lg font-medium">Informações da Empresa</h3>

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Empresa LTDA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: implementar o usewatch e o usequery com a api de cnpj */}
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="00.000.000/0001-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* TODO: implementar o usewatch e o usequery com a api de cep */}
            <FormField
              control={form.control}
              name="companyCep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP da empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço da empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua Exemplo, 123 - Cidade/UF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </Form>
  )
}
