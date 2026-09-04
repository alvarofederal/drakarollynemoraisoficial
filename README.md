# Dra. Karollyne Morais — site do livro *Diário do Internato*

Landing page de venda do livro, com painel administrativo para acompanhar os
pedidos e os endereços de entrega.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui ·
Prisma + MySQL · NextAuth v5 · Cloudinary · Vercel

## Como rodar

```bash
cp .env.example .env
npx auth secret
npm install
npm run db:push
npm run db:seed
npm run dev
```

O site sobe em http://localhost:3000.

## Rotas

- `/` — landing page
- `/login` — acesso ao painel
- `/admin` — pedidos e endereços de entrega

## Onde editar

| O quê | Onde |
|-------|------|
| Textos, fotos, link do Stripe, contatos | `src/config/site.ts` |
| Identidade visual (cores) | bloco `MARCA` em `src/app/globals.css` |
| Seções da landing | `src/app/page.tsx` |

## Scripts

| Comando | Faz |
|---------|-----|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (roda `prisma generate` + `db push`) |
| `npm run db:push` | Sincroniza o schema com o banco |
| `npm run db:studio` | Abre o Prisma Studio |
| `npm run db:seed` | Cria/atualiza o usuário admin |
| `npm test` | Testes (Vitest) |
