// src/lib/validators/auth.ts
import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo")
    .toLowerCase()
    .trim(),
  senha: z.string().min(1, "Informe a senha"),
})

export type LoginInput = z.infer<typeof loginSchema>
