// prisma/seed.ts — cria (ou atualiza) o usuário administrador.
// Uso: npm run db:seed
import { config } from "dotenv"
import bcrypt from "bcryptjs"
import { PrismaClient } from "../src/generated/prisma"

config()
config({ path: ".env.local", override: true })

const prisma = new PrismaClient()

async function main() {
  const nome = process.env.ADMIN_NOME?.trim()
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const senha = process.env.ADMIN_SENHA

  if (!email || !senha) {
    throw new Error("Defina ADMIN_EMAIL e ADMIN_SENHA no .env antes de rodar o seed.")
  }
  if (senha.length < 8) {
    throw new Error("ADMIN_SENHA deve ter no mínimo 8 caracteres.")
  }

  const hash = await bcrypt.hash(senha, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: { senha: hash, ativo: true, nome: nome || "Administrador" },
    create: { email, senha: hash, nome: nome || "Administrador" },
  })

  console.log(`✅ Admin pronto: ${user.email}`)
}

main()
  .catch((e) => {
    console.error("❌", e.message)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
