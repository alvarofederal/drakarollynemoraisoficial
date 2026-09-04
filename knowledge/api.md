# API e Server Actions

## Server Actions

| Action | Arquivo | Auth | Faz |
|--------|---------|------|-----|
| `criarPedido` | `src/app/_actions/criar-pedido.ts` | pública | Valida com Zod, grava o pedido, devolve a URL do Stripe |
| `loginAction` | `src/app/login/_actions/login.ts` | pública | `signIn("credentials")` |
| `atualizarStatus` | `src/app/admin/_actions/pedidos.ts` | sessão | Muda o status do pedido |
| `excluirPedido` | `src/app/admin/_actions/pedidos.ts` | sessão | Remove o pedido |
| `sair` | `src/app/admin/_actions/pedidos.ts` | sessão | `signOut` |

## Rotas HTTP

| Rota | Método | Auth | Faz |
|------|--------|------|-----|
| `/api/auth/[...nextauth]` | GET/POST | — | Handlers do NextAuth |
| `/api/upload` | POST | sessão | Envia imagem (JPG/PNG/WEBP, até 5 MB) ao Cloudinary |

## Externo

- **ViaCEP** — `GET https://viacep.com.br/ws/{cep}/json/`, chamado do cliente
  quando o campo CEP perde o foco. Falha em silêncio: o usuário preenche à mão.
- **Stripe Payment Link** — `site.checkoutUrl`. É só uma navegação; não há
  SDK nem webhook no projeto.
