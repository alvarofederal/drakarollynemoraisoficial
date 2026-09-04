# Banco de dados

MySQL via Prisma (`relationMode = "prisma"`).

## `users` — admin do painel

| Campo | Tipo | Nota |
|-------|------|------|
| id | String | cuid |
| nome | String | |
| email | String | único, usado no login |
| senha | String | hash bcrypt (12 rounds) |
| ativo | Boolean | inativo não consegue logar |
| ultimoAcesso | DateTime? | atualizado a cada login |

Criado por `npm run db:seed`, a partir de `ADMIN_EMAIL` / `ADMIN_SENHA`.

## `pedidos` — quem quer o livro

| Campo | Tipo | Nota |
|-------|------|------|
| nome, telefone | String | obrigatórios |
| email | String? | opcional |
| cep, logradouro, numero, complemento, bairro, cidade, uf | String? | endereço de entrega |
| quantidade | Int | padrão 1 |
| status | StatusPedido | AGUARDANDO · PAGO · ENVIADO · ENTREGUE · CANCELADO |
| observacao | Text? | |
| origem | String? | `?utm_source=` da URL de entrada |
| criadoEm | DateTime | ordenação do painel |

O telefone é gravado **só com dígitos** — o formulário remove a máscara antes
de enviar.
