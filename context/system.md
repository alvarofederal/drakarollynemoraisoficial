# Visão geral

**Produto:** site de página única para venda do livro *Diário do Internato*,
de Dra. Karollyne Morais.

**Objetivo:** converter visitante em comprador. Tudo na página existe para
levar ao botão Comprar.

## Atores

| Ator | O que faz |
|------|-----------|
| Visitante | Lê sobre o livro e a autora, preenche o endereço e paga |
| Autora (admin) | Acessa `/admin`, vê os pedidos, acompanha status e envia os livros |

## Integrações

| Serviço | Uso |
|---------|-----|
| Stripe | Link de pagamento (Payment Link) — sem SDK, sem webhook |
| Cloudinary | Hospedagem das imagens |
| ViaCEP | Autopreenchimento do endereço a partir do CEP |
| MySQL | Pedidos e usuário admin |
| Vercel | Deploy |
