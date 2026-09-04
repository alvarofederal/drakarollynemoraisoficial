import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  Instagram,
  Mail,
  Phone,
  Quote,
  ShieldCheck,
  ShieldEllipsis,
  Stethoscope,
  Truck,
} from "lucide-react"
import { site } from "@/config/site"
import { Nav } from "./_components/nav"
import { ComprarButton } from "./_components/comprar-button"

export default function Home() {
  return (
    <div id="topo" className="min-h-screen bg-background">
      <Nav />

      <main>
        <Hero />
        <Garantias />
        <SobreOLivro />
        <SobreAAutora />
        <ChamadaFinal />
        <Contato />
      </main>

      <Rodape />
    </div>
  )
}

/* ══════════════════════════════════════════════
   HERO — a capa do livro é a protagonista
   ══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Halo suave atrás do livro */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-10 size-[42rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--accent-warm) 28%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brand-strong">
            <BookOpen className="size-3.5" />
            Primeira obra
          </span>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {site.livro.titulo}
          </h1>

          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl">
            {site.livro.sinopse}
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ComprarButton className="w-full sm:w-auto" />
            <p className="text-sm text-ink-soft">
              Entrega para todo o Brasil
            </p>
          </div>

          <p className="mt-8 border-l-2 border-accent-warm/60 pl-4 text-sm italic leading-relaxed text-ink-soft">
            “Aquela medicina que não se encontra nos livros e só pode ser
            encontrada no toque, no olhar, na empatia.”
            <span className="mt-1 block not-italic font-medium text-ink">
              — {site.autora.nome}
            </span>
          </p>
        </div>

        {/* Capa do livro */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className="floating relative w-[16rem] sm:w-[20rem] lg:w-[23rem]">
            <div className="relative aspect-[2/3]">
              <Image
                src={site.imagens.capaLivro}
                alt={`Capa do livro ${site.livro.titulo}, de ${site.autora.nome}`}
                fill
                priority
                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 20rem, 23rem"
                className="book-shadow rounded-sm object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   FAIXA DE GARANTIAS
   ══════════════════════════════════════════════ */
function Garantias() {
  const itens = [
    { icone: Truck, titulo: "Envio para todo o Brasil", texto: "Você informa o endereço e nós cuidamos do resto." },
    { icone: ShieldCheck, titulo: "Pagamento seguro", texto: "Checkout processado pelo Stripe." },
    { icone: Stethoscope, titulo: "Escrito por quem viveu", texto: "Relatos reais do cotidiano médico." },
  ]

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
        {itens.map(({ icone: Icone, titulo, texto }) => (
          <div key={titulo} className="flex items-start gap-3.5">
            <Icone className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <p className="text-sm font-semibold">{titulo}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{texto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   O LIVRO
   ══════════════════════════════════════════════ */
function SobreOLivro() {
  return (
    <section id="livro" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          {/* 2:3 é a proporção original da foto — evita cortar o livro */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-muted shadow-xl">
            <Image
              src={site.imagens.autoraComLivro}
              alt={`${site.autora.nome} segurando o livro ${site.livro.titulo}`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
            Sobre o livro
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.livro.subtitulo}
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            <p>
              Entre plantões, corredores e prontuários existe uma medicina que
              nenhum compêndio ensina — a que acontece no instante em que uma
              mão encontra a outra.
            </p>
            <p>
              {site.livro.titulo} reúne os pequenos detalhes do cotidiano
              médico: o medo antes do primeiro procedimento, o silêncio depois
              de uma notícia difícil, a alegria miúda de um paciente que
              melhora. Um convite a enxergar a formação médica pelo lado
              humano.
            </p>
          </div>

          <figure className="mt-8 rounded-xl border border-border bg-card p-6">
            <Quote className="size-6 text-accent-warm" />
            <blockquote className="mt-3 text-pretty text-base italic leading-relaxed">
              Escrevo sobre os pequenos detalhes do cotidiano médico. Que bom
              que você está aqui! Vamos juntos?
            </blockquote>
            <figcaption className="mt-3 text-sm font-medium text-ink-soft">
              {site.autora.nome}
            </figcaption>
          </figure>

          <div className="mt-8">
            <ComprarButton>Quero meu exemplar</ComprarButton>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   A AUTORA
   ══════════════════════════════════════════════ */
function SobreAAutora() {
  const paragrafos = site.autora.bio.split("\n\n")

  return (
    <section
      id="autora"
      className="scroll-mt-20 border-y border-border bg-muted/40 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-sm lg:sticky lg:top-24">
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-background shadow-xl">
            <Image
              src={site.imagens.autoraJaleco}
              alt={`${site.autora.nome}, ${site.autora.titulo}`}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand">
            A autora
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.autora.nome}
          </h2>
          <p className="mt-2 text-lg text-ink-soft">{site.autora.titulo}</p>

          <div className="mt-7 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            {paragrafos.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CHAMADA FINAL
   ══════════════════════════════════════════════ */
function ChamadaFinal() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, color-mix(in oklch, var(--brand) 20%, transparent) 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <div className="mx-auto mb-8 w-32">
              <div className="relative aspect-[2/3]">
                <Image
                  src={site.imagens.capaLivro}
                  alt={`Capa do livro ${site.livro.titulo}`}
                  fill
                  sizes="8rem"
                  className="book-shadow rounded-sm object-contain"
                />
              </div>
            </div>

            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Leve {site.livro.titulo} para casa
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-lg text-ink-soft">
              Preencha o endereço de entrega e finalize o pagamento em poucos
              minutos.
            </p>

            <div className="mt-9 flex justify-center">
              <ComprarButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CONTATO
   ══════════════════════════════════════════════ */
function Contato() {
  const canais = [
    {
      icone: Mail,
      rotulo: "E-mail",
      valor: site.contato.email,
      href: `mailto:${site.contato.email}`,
    },
    {
      icone: Phone,
      rotulo: "WhatsApp",
      valor: site.contato.telefone,
      href: `https://wa.me/${site.contato.whatsapp}`,
    },
    {
      icone: Instagram,
      rotulo: "Instagram",
      valor: site.contato.instagramHandle,
      href: site.contato.instagram,
    },
  ]

  return (
    <section
      id="contato"
      className="scroll-mt-20 border-t border-border bg-muted/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Vamos conversar
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty text-ink-soft">
          Dúvidas sobre o livro, pedidos em quantidade ou convites — é só
          chamar.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {canais.map(({ icone: Icone, rotulo, valor, href }) => (
            <a
              key={rotulo}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
            >
              <Icone className="mx-auto size-6 text-brand" />
              <p className="mt-3 text-sm font-semibold">{rotulo}</p>
              <p className="mt-1 break-words text-sm text-ink-soft group-hover:text-brand">
                {valor}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   RODAPÉ
   ══════════════════════════════════════════════ */
function Rodape() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <p className="text-sm text-ink-soft">
          © {new Date().getFullYear()} {site.autora.nome}. Todos os direitos
          reservados.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-ink-soft/70 transition-colors hover:text-brand"
        >
          <ShieldEllipsis className="size-3.5" />
          Acesso administrativo
        </Link>
      </div>
    </footer>
  )
}
