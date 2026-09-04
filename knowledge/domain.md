# Domínio

## Vocabulário

| Termo | Significa |
|-------|-----------|
| Pedido | Alguém que preencheu o endereço no site querendo o livro |
| AGUARDANDO | Preencheu os dados, pagamento ainda não confirmado |
| PAGO | Pagamento confirmado (conferido manualmente no painel do Stripe) |
| ENVIADO / ENTREGUE | Livro despachado / recebido |

## Regras

1. O pedido nasce **AGUARDANDO** — o site não sabe se o pagamento saiu.
   A confirmação é manual, olhando o painel do Stripe.
2. O endereço é estruturado (CEP, logradouro, número…) para virar etiqueta de
   envio direto pelo botão "Copiar endereço" do painel.
3. O visitante não precisa de conta. Só a autora tem login.
