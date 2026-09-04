// src/config/site.ts
// ─────────────────────────────────────────────────────────────
// Único lugar para editar textos, links e imagens do site.
// Ao subir as fotos para o Cloudinary, troque apenas as URLs em
// `imagens` — nenhum componente precisa ser alterado.
// ─────────────────────────────────────────────────────────────

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://drakarollynemorais.com.br",

  autora: {
    nome: "Dra. Karollyne Morais",
    nomeCurto: "Karollyne Morais",
    titulo: "Médica ortopedista, pesquisadora e escritora",
    bio: `Meu nome é Karollyne Morais e eu sou Médica. Mas não é só isso. Sou Médica Residente do Programa de Ortopedia e Traumatologia da Secretaria de Saúde do DF. Me formei pela Escola Superior de Ciências da Saúde — ESCS, a escola pública do DF. Também sou Mestre e Doutora em Ciências da Saúde pela Universidade de Brasília, onde dediquei mais de 6 anos à linha de pesquisa de "Farmacologia, Toxicologia e Produtos Naturais".

Acima de tudo, sou esposa e mãe. Esposa privilegiada por ter alguém com quem posso sempre contar, e mãe de 3 crianças lindas e barulhentas. Também sou católica, e a minha fé permeia todos os aspectos da minha vida.

Nas (raras) horas vagas, eu escrevo. Escrevo sobre os pequenos detalhes do cotidiano médico. Aquela medicina que não se encontra nos livros e só pode ser encontrada no toque, no olhar, na empatia.`,
  },

  livro: {
    titulo: "Diário do Internato",
    subtitulo: "A medicina que não está nos livros",
    // TODO: confirmar sinopse e preço com a autora
    sinopse:
      "Relatos do cotidiano médico — o toque, o olhar, a empatia. A medicina vivida entre plantões, corredores e encontros que ficam.",
    preco: null as number | null, // ex.: 69.9 — exibido apenas quando definido
  },

  // Link de pagamento do Stripe (botão "Comprar")
  checkoutUrl: "https://buy.stripe.com/5kQ8wI8Pd4vQ08q0rCcbC00",

  // ── Imagens ──
  // Provisórias (Hostinger Horizons). Substituir pelas URLs do Cloudinary.
  imagens: {
    autoraJaleco:
      "https://storage.googleapis.com/hostinger-horizons-assets-prod/a80c4da1-59a9-4903-b92e-b1e126260c05/6d199acf85c751e8f4fa4c0a9ee7bdba.jpg",
    autoraComLivro:
      "https://storage.googleapis.com/hostinger-horizons-assets-prod/a80c4da1-59a9-4903-b92e-b1e126260c05/2f60fe742b94e0f219a4b121663c42e5.jpg",
    capaLivro:
      "https://storage.googleapis.com/hostinger-horizons-assets-prod/a80c4da1-59a9-4903-b92e-b1e126260c05/cb64c372b791f06e0467c5376639e8fd.jpg",
  },

  contato: {
    instagram: "https://www.instagram.com/drakarollynemorais",
    instagramHandle: "@drakarollynemorais",
  },
} as const
