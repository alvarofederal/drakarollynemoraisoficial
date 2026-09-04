# Convenções

## Sempre
- Validar entrada com Zod nas Server Actions
- Conferir `await auth()` em qualquer action de `/admin`
- Usar `next/image` (hosts liberados em `next.config.ts` **e** no CSP)
- Textos em português do Brasil, tom acolhedor — a voz é da autora

## Nunca
- Inventar fatos sobre o livro ou a autora (prêmios, elogios, depoimentos,
  número de páginas). Se não foi confirmado pela autora, não entra na página.
- Escrever cor fixa em componente (`text-blue-600`) — usar token
- Alterar `prisma/schema.prisma` sem avisar: o build roda `db push`
- Commitar `.env`

## Checklist antes de terminar
- [ ] `npm run build` passa
- [ ] Landing conferida em 375px, 768px e 1440px
- [ ] Botão Comprar leva ao link correto do Stripe
- [ ] Pedido de teste aparece em `/admin`
