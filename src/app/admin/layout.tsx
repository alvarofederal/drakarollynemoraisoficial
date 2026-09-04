import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowUpRight, LogOut } from "lucide-react"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { sair } from "./_actions/pedidos"

export const metadata: Metadata = {
  title: "Painel de pedidos",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessao = await auth()
  if (!sessao?.user) redirect("/login")

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold">
              Painel de pedidos
            </p>
            <p className="truncate text-xs text-ash">
              {sessao.user.name ?? sessao.user.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" target="_blank">
                Ver site <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>

            <form action={sair}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut className="mr-1.5 size-4" /> Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">{children}</main>
    </div>
  )
}
