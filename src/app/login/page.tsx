import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { auth } from "@/lib/auth"
import { site } from "@/config/site"
import { LoginForm } from "./_components/login-form"

export const metadata: Metadata = {
  title: "Acesso administrativo",
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const sessao = await auth()
  if (sessao?.user) redirect("/admin")

  const { redirect: destino } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-ink/5">
              <ShieldCheck className="size-6 text-ink" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Acesso administrativo
            </h1>
            <p className="mt-1 text-sm text-ash">
              Painel de pedidos de {site.autora.nome}
            </p>
          </div>

          <LoginForm redirect={destino ?? "/admin"} />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ash transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" /> Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  )
}
