import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      //TODO: implementar o retorno do role do usuário no futuro
      // role: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    //TODO: implementar o retorno do role do usuário no futuro
    // role: string
  }
}
