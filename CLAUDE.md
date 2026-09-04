# Dra. Karollyne Morais — Guia para Claude Code

> Carregado automaticamente em toda sessão. Leia antes de alterar o projeto.

---

## O que é este projeto?

Landing page de venda do livro **_Diário do Internato_**, de **Dra. Karollyne Morais**
(médica residente em Ortopedia e Traumatologia — SES/DF, Mestre e Doutora em
Ciências da Saúde pela UnB).

O objetivo é único e direto: **a pessoa entra, se encanta e compra o livro.**

Stack: Next.js 16 (App Router) + TypeScript + Tailwind 4 + shadcn/ui +
MySQL (Prisma) + NextAuth v5 + Cloudinary + Vercel.

**Versão:** 0.1.0 · **Status:** em construção

---

## Fluxo de compra

1. Visitante clica em **Comprar** na landing.
2. Abre um modal com os dados de entrega (nome, WhatsApp, CEP → ViaCEP
   autopreenche o endereço).
3. Server Action `criarPedido` grava o pedido no MySQL com status `AGUARDANDO`.
4. O navegador é redirecionado para o **link de pagamento do Stripe**
   (`site.checkoutUrl`).
5. A autora acompanha os pedidos em `/admin` e move o status conforme envia.

> Não há SDK do Stripe nem webhook — apenas o Payment Link. Se um dia for
> preciso confirmar pagamento automaticamente, aí sim entram `stripe` +
> `/api/webhook`.

---

## Mapa de rotas

| Rota | Acesso | Descrição |
|------|--------|-----------|
| `/` | Público | Landing page — hero com a capa, sobre o livro, sobre a autora, CTA, contato |
| `/login` | Público | Login do painel (e-mail + senha) |
| `/admin` | Protegido | Painel de pedidos: métricas, busca, filtro por status, copiar endereço, WhatsApp, excluir |
| `/api/auth/[...nextauth]` | — | Handlers do NextAuth |
| `/api/upload` | Sessão | Upload de imagem para o Cloudinary |

`middleware.ts` protege apenas `/admin/*` (checagem de cookie). A validação
real da sessão acontece em `src/app/admin/layout.tsx`.

---

## Onde mexer em quê

| Quero mudar… | Arquivo |
|--------------|---------|
| Textos, fotos, link do Stripe, contatos | `src/config/site.ts` |
| Cores / identidade visual | bloco `MARCA` em `src/app/globals.css` |
| Seções da landing | `src/app/page.tsx` (cada seção é uma função no próprio arquivo) |
| Formulário de compra | `src/app/_components/comprar-button.tsx` |
| Campos do pedido | `prisma/schema.prisma` + `src/lib/validators/pedido.ts` |
| Painel de pedidos | `src/app/admin/` |

---

## Regras críticas

1. **Toda a identidade visual sai dos tokens** `--brand*`, `--surface`, `--ink*`
   em `globals.css`. Nunca escreva cor fixa (`text-blue-600`) em componente —
   use `text-brand`, `bg-card`, `text-ink-soft`.
2. **Conteúdo não fica hardcoded em JSX** quando puder morar em
   `src/config/site.ts`.
3. **Não inventar fatos sobre o livro ou a autora** (prêmios, número de
   páginas, elogios, depoimentos). Se não foi confirmado, não vai para a página.
4. `prisma db push --accept-data-loss` roda no build — **não alterar o schema
   sem avisar**, pode apagar dados.
5. Toda Server Action valida entrada com **Zod** antes de tocar no banco.
6. Toda Server Action de `/admin` confere `await auth()` antes de executar.
7. Imagens sempre por `next/image`; hosts liberados em `next.config.ts` e no CSP.

---

## Padrões

```typescript
import prisma from "@/lib/prisma"   // acesso ao banco
import { auth } from "@/lib/auth"   // sessão
import { cn } from "@/lib/utils"    // classnames
import { site } from "@/config/site" // conteúdo do site
```

Server Component é o padrão. `"use client"` só com hook, evento ou formulário.

---

## Setup local

```bash
cp .env.example .env     # preencher DATABASE_URL, AUTH_SECRET, CLOUDINARY_*
npx auth secret          # gera AUTH_SECRET
npm install
npm run db:push          # cria as tabelas
npm run db:seed          # cria o usuário admin (ADMIN_EMAIL / ADMIN_SENHA)
npm run dev
```

---

## Pendências

Ver `development/features.md`.

*Criado em: 2026-09-03*
