import Image from "next/image"
import Link from "next/link"
import { site } from "@/config/site"
import { Nav } from "./_components/nav"
import { ComprarButton } from "./_components/comprar-button"

export default function Home() {
  return (
    <div id="topo" className="bg-white">
      <Nav />

      <main>
        <Hero />
        <OQueVoceLeva />
        <SobreOLivro />
        <AAutora />
        <CartaoDestaque />
      </main>

      <Rodape />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   HERO — céu, nuvens e o livro flutuando
   ══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="sky relative min-h-[100svh] overflow-hidden">
      {/* Banco de nuvens em deriva lenta */}
      <div className="cloud-layer" aria-hidden>
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
        <div className="cloud cloud-c" />
        <div className="cloud-floor" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col px-6 pb-8 pt-24 sm:pt-28 lg:px-8 lg:pb-10 lg:pt-32">
        {/* Título em escala arquitetônica + assinatura da autora */}
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:gap-10">
          <h1 className="t-hero max-w-[11ch] text-ink">
            Diário do Internato<span className="text-clay">.</span>
          </h1>

          <div className="lg:pt-4">
            <p className="t-subheading max-w-xs text-ink">
              A medicina que só se aprende no toque, no olhar, na empatia.
            </p>
            <p className="mt-4 t-caption text-ink/60">
              {site.autora.nome}
              <br />
              {site.autora.titulo}
            </p>
          </div>
        </div>

        {/* O livro é o herói da composição */}
        <div className="relative flex flex-1 items-center justify-center py-6 lg:py-4">
          <div className="floating relative w-[11.5rem] sm:w-[15rem] lg:w-[19rem]">
            <div className="relative aspect-[2/3]">
              <Image
                src={site.imagens.capaLivro}
                alt={`Capa do livro ${site.livro.titulo}, de ${site.autora.nome}`}
                fill
                priority
                sizes="(max-width: 640px) 11.5rem, (max-width: 1024px) 15rem, 19rem"
                className="book-shadow object-contain"
              />
            </div>
          </div>
        </div>

        {/* Rodapé do hero: legenda à esquerda, ações à direita */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="t-caption max-w-xs text-ink">
            Relatos do cotidiano médico. Entrega para todo o Brasil.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <ComprarButton />
            {/* No celular a altura é preciosa — o CTA principal basta */}
            <a
              href="#livro"
              className="hidden rounded-full border border-ink/25 px-6 py-3.5 text-[17px] font-bold tracking-tight text-ink transition-colors hover:bg-ink/5 sm:inline-flex"
            >
              Conhecer o livro
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   BLOCOS DE FEATURE — gravidade à direita, fios de 1px
   ══════════════════════════════════════════════════════════ */
function OQueVoceLeva() {
  const blocos = [
    {
      titulo: "Escrito por quem viveu",
      texto:
        "Relatos do cotidiano médico registrados de dentro do hospital, entre plantões e corredores.",
    },
    {
      titulo: "O lado humano da medicina",
      texto:
        "O medo antes do primeiro procedimento, o silêncio depois de uma notícia difícil, a alegria miúda de quem melhora.",
    },
    {
      titulo: "Entrega para todo o Brasil",
      texto:
        "Você informa o endereço no site e o exemplar segue para a sua casa.",
    },
    {
      titulo: "Pagamento seguro",
      texto:
        "Checkout processado pelo Stripe. Seus dados servem apenas para o envio.",
    },
  ]

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-[80px]">
      <div className="grid lg:grid-cols-2 lg:gap-20">
        <div aria-hidden className="hidden lg:block" />

        <div>
          <h2 className="t-heading-lg max-w-md text-ink">
            Um livro sobre o que não cabe no prontuário<span className="text-clay">.</span>
          </h2>

          <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {blocos.map((b) => (
              <div key={b.titulo} className="hairline pt-5">
                <h3 className="t-subheading text-ink">{b.titulo}</h3>
                <p className="mt-3 t-body text-ash">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   O LIVRO — foto da autora com o exemplar
   ══════════════════════════════════════════════════════════ */
function SobreOLivro() {
  return (
    <section id="livro" className="scroll-mt-24 pb-20 lg:pb-[80px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* 2:3 é a proporção original da foto — evita cortar o livro */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#f4f3f2]">
            <Image
              src={site.imagens.autoraComLivro}
              alt={`${site.autora.nome} segurando o livro ${site.livro.titulo}`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="t-display max-w-[13ch] text-ink">
              A medicina que não está nos livros
              <span className="text-clay">.</span>
            </h2>

            <div className="mt-8 space-y-6 t-body text-ash">
              <p>
                Entre plantões, corredores e prontuários existe uma medicina que
                nenhum compêndio ensina — a que acontece no instante em que uma
                mão encontra a outra.
              </p>
              <p>
                {site.livro.titulo} reúne os pequenos detalhes desse cotidiano.
                Um convite a enxergar a formação médica pelo lado humano, escrito
                por quem atravessou cada plantão.
              </p>
            </div>

            <blockquote className="hairline mt-10 pt-6 t-subheading max-w-md text-ink">
              “Escrevo sobre os pequenos detalhes do cotidiano médico. Que bom
              que você está aqui. Vamos juntos?”
            </blockquote>

            <div className="mt-10">
              <ComprarButton>Quero meu exemplar</ComprarButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   A AUTORA — faixa escura de contraste
   ══════════════════════════════════════════════════════════ */
function AAutora() {
  const paragrafos = site.autora.bio.split("\n\n")

  return (
    <section id="autora" className="scroll-mt-24 bg-hull py-20 lg:py-[80px]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="relative aspect-[2/3] w-full max-w-sm overflow-hidden bg-deck">
            <Image
              src={site.imagens.autoraJaleco}
              alt={`${site.autora.nome}, ${site.autora.titulo}`}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>

          <div className="text-white">
            <h2 className="t-heading-lg">
              {site.autora.nome}
              <span className="text-clay">.</span>
            </h2>
            <p className="mt-3 t-body text-white/55">{site.autora.titulo}</p>

            <div className="mt-10 space-y-6 t-body text-white/85">
              {paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   CARTÃO DESTAQUE — o único bloco terracota da página
   ══════════════════════════════════════════════════════════ */
function CartaoDestaque() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-[80px]">
      <div className="grid bg-clay lg:grid-cols-[1.15fr_0.85fr]">
        <div className="px-8 py-14 sm:px-[59px] sm:py-[53px]">
          <h2 className="t-display max-w-lg text-white">
            Leve o Diário do Internato para casa.
          </h2>
          <p className="mt-6 max-w-md t-body text-white/85">
            Você preenche o endereço de entrega, finaliza o pagamento em poucos
            minutos e o exemplar sai para a sua casa.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ComprarButton tone="white" />
            <span className="t-caption text-white/75">
              Pagamento seguro pelo Stripe
            </span>
          </div>
        </div>

        <div className="relative flex items-end justify-center px-8 pb-0 pt-4 sm:px-12 lg:pt-14">
          <div className="relative aspect-[2/3] w-[11rem] translate-y-[1px] sm:w-[13rem]">
            <Image
              src={site.imagens.capaLivro}
              alt={`Capa do livro ${site.livro.titulo}`}
              fill
              sizes="13rem"
              className="book-shadow object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   RODAPÉ TERMINAL
   ══════════════════════════════════════════════════════════ */
function Rodape() {
  const canais = [
    {
      rotulo: "E-mail",
      valor: site.contato.email,
      href: `mailto:${site.contato.email}`,
    },
    {
      rotulo: "WhatsApp",
      valor: site.contato.telefone,
      href: `https://wa.me/${site.contato.whatsapp}`,
    },
    {
      rotulo: "Instagram",
      valor: site.contato.instagramHandle,
      href: site.contato.instagram,
    },
  ]

  return (
    <footer id="contato" className="scroll-mt-24 bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-[80px]">
        <p className="t-display max-w-xl">
          Vamos conversar<span className="text-clay">.</span>
        </p>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {canais.map((c) => (
            <a
              key={c.rotulo}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hairline-inverse group pt-5"
            >
              <p className="text-[13px] uppercase tracking-[0.1em] text-white/45">
                {c.rotulo}
              </p>
              <p className="mt-2 break-words text-[20px] transition-colors group-hover:text-white/60">
                {c.valor}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-caption text-white/45">
            © {new Date().getFullYear()} {site.autora.nome}. Todos os direitos
            reservados.
          </p>
          <Link
            href="/login"
            className="t-caption text-white/35 transition-colors hover:text-white/70"
          >
            Acesso administrativo
          </Link>
        </div>
      </div>
    </footer>
  )
}
