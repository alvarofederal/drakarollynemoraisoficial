"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { auth, signOut } from "@/lib/auth"

const STATUS = [
  "AGUARDANDO",
  "PAGO",
  "ENVIADO",
  "ENTREGUE",
  "CANCELADO",
] as const

const atualizarSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUS),
})

export async function atualizarStatus(id: string, status: string) {
  const sessao = await auth()
  if (!sessao?.user) return { ok: false as const, erro: "Não autorizado" }

  const parsed = atualizarSchema.safeParse({ id, status })
  if (!parsed.success) return { ok: false as const, erro: "Status inválido" }

  await prisma.pedido.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  })

  revalidatePath("/admin")
  return { ok: true as const }
}

export async function excluirPedido(id: string) {
  const sessao = await auth()
  if (!sessao?.user) return { ok: false as const, erro: "Não autorizado" }

  if (!id) return { ok: false as const, erro: "Pedido inválido" }

  await prisma.pedido.delete({ where: { id } })

  revalidatePath("/admin")
  return { ok: true as const }
}

export async function sair() {
  await signOut({ redirectTo: "/login" })
}
