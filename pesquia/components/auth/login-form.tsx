"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginFormInputs, loginSchema } from "@/schemas/login-schema"
import { signIn } from "next-auth/react"


export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormInputs) {
    setIsLoading(true)

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      
      if (response?.error) {
        toast.error("Falha na autenticação", {
          description: "Email ou senha incorretos. Tente novamente.",
        })
      } else {
        toast.success("Login realizado com sucesso!", {
          description: "Você será redirecionado para o dashboard.",
        })

        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      toast.error("Erro ao fazer login", {
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
      })
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
        {/* TODO: add page.tsx num futuro... */}
        {/* <div className="text-center">
          <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
            Esqueceu sua senha?
          </Link>
        </div> */}
      </form>
    </Form>
  )
}
