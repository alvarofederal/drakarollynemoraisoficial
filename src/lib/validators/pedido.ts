// src/lib/validators/pedido.ts
import { z } from "zod"

const soDigitos = (v: string) => v.replace(/\D/g, "")

export const pedidoSchema = z.object({
  nome: z
    .string()
    .min(3, "Informe seu nome completo")
    .max(120, "Nome muito longo")
    .trim(),
  email: z
    .string()
    .email("E-mail inválido")
    .max(255)
    .toLowerCase()
    .trim()
    .optional()
    .or(z.literal("")),
  telefone: z
    .string()
    .transform(soDigitos)
    .refine((v) => v.length >= 10 && v.length <= 11, "Telefone inválido — use DDD + número"),
  cep: z
    .string()
    .transform(soDigitos)
    .refine((v) => v.length === 8, "CEP inválido"),
  logradouro: z.string().min(3, "Informe a rua").max(160).trim(),
  numero: z.string().min(1, "Informe o número").max(20).trim(),
  complemento: z.string().max(80).trim().optional().or(z.literal("")),
  bairro: z.string().min(2, "Informe o bairro").max(120).trim(),
  cidade: z.string().min(2, "Informe a cidade").max(120).trim(),
  uf: z
    .string()
    .length(2, "UF deve ter 2 letras")
    .toUpperCase()
    .trim(),
  quantidade: z.coerce.number().int().min(1).max(20).default(1),
  observacao: z.string().max(500).trim().optional().or(z.literal("")),
  origem: z.string().max(120).trim().optional().or(z.literal("")),
})

export type PedidoInput = z.infer<typeof pedidoSchema>
