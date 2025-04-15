

import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
    title: "Login - PesquIA",
    description: "Pagina de login do sistema pesquIA",
  
  };

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Entrar na sua conta</h1>
              <p className="text-sm text-muted-foreground">Digite seu email e senha para acessar sua conta</p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/auth/register" className="underline underline-offset-4 hover:text-primary">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      )
    }
