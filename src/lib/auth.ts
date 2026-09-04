// src/lib/auth.ts
// Autenticação simples: apenas e-mail + senha para o painel administrativo.
// Sessão em JWT — não precisa de tabelas Account/Session no banco.
import NextAuth, { type DefaultSession, type User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "./prisma"

export const runtime = "nodejs"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 horas
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase().trim()
        const senha = String(credentials?.senha ?? "")

        if (!email || !senha) return null

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.ativo) return null

        const senhaValida = await bcrypt.compare(senha, user.senha)
        if (!senhaValida) return null

        await prisma.user.update({
          where: { id: user.id },
          data: { ultimoAcesso: new Date() },
        })

        return {
          id: user.id,
          name: user.nome,
          email: user.email,
        } as User
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id
      return session
    },
  },
})
