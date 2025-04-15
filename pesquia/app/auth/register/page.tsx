import { RegisterForm } from "@/components/auth/register-forms"
import type { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
  title: "Cadastro",
  description: "Crie sua conta",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Criar uma conta</h1>
          <p className="text-sm text-muted-foreground">Preencha os campos abaixo para criar sua conta</p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
