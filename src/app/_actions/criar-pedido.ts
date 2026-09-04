"use server"

import prisma from "@/lib/prisma"
import { pedidoSchema } from "@/lib/validators/pedido"
import { site } from "@/config/site"

export type CriarPedidoResult =
  | { ok: true; checkoutUrl: string }
  | { ok: false; erro: string; campos?: Record<string, string> }

export async function criarPedido(
  dados: unknown
): Promise<CriarPedidoResult> {
  const parsed = pedidoSchema.safeParse(dados)

  if (!parsed.success) {
    const campos: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const campo = issue.path[0]
      if (typeof campo === "string" && !campos[campo]) {
        campos[campo] = issue.message
      }
    }
    return { ok: false, erro: "Confira os dados informados.", campos }
  }

  const d = parsed.data

  try {
    await prisma.pedido.create({
      data: {
        nome: d.nome,
        email: d.email || null,
        telefone: d.telefone,
        cep: d.cep,
        logradouro: d.logradouro,
        numero: d.numero,
        complemento: d.complemento || null,
        bairro: d.bairro,
        cidade: d.cidade,
        uf: d.uf,
        quantidade: d.quantidade,
        observacao: d.observacao || null,
        origem: d.origem || null,
      },
    })
  } catch (e) {
    console.error("Erro ao salvar pedido:", e)
    return {
      ok: false,
      erro: "Não conseguimos salvar seus dados agora. Tente novamente em instantes.",
    }
  }

  return { ok: true, checkoutUrl: site.checkoutUrl }
}
