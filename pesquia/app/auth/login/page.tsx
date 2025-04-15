

import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - PesquIA",
    description: "Pagina de login do sistema pesquIA",
  
  };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/10">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-primary">Login - pesquIA</h1>
        <LoginForm />
      </div>
    </div>
  );
}
