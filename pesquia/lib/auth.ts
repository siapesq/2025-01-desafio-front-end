import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        //TODO: implementar Hash da senha e comparar com a do banco de dados
        if (user && user.password === credentials.password) {
          return user;
        }
        return null;
      },
    }),
    //TODO: implementar o google provedor de autenticação (Google)
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);