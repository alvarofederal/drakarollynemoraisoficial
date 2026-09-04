"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth"
import { loginSchema } from "@/lib/validators/auth"

export type LoginState = { erro?: string }

export async function loginAction(
  _anterior: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    senha: formData.get("senha"),
  })

  if (!parsed.success) {
    return { erro: parsed.error.issues[0]?.message ?? "Dados inválidos" }
  }

  const redirectTo = String(formData.get("redirect") || "/admin")

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      senha: parsed.data.senha,
      redirectTo: redirectTo.startsWith("/admin") ? redirectTo : "/admin",
    })
  } catch (erro) {
    // O signIn bem-sucedido lança NEXT_REDIRECT — que precisa subir.
    if (erro instanceof AuthError) {
      return { erro: "E-mail ou senha inválidos." }
    }
    throw erro
  }

  return {}
}
