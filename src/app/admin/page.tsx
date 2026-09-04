import prisma from "@/lib/prisma"
import { TabelaPedidos, type PedidoLinha } from "./_components/tabela-pedidos"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const pedidos = await prisma.pedido.findMany({
    orderBy: { criadoEm: "desc" },
  })

  const total = pedidos.length
  const aguardando = pedidos.filter((p) => p.status === "AGUARDANDO").length
  const pagos = pedidos.filter((p) => p.status === "PAGO").length
  const enviados = pedidos.filter(
    (p) => p.status === "ENVIADO" || p.status === "ENTREGUE"
  ).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pedidos</h1>
        <p className="mt-1 text-sm text-ash">
          Todo mundo que preencheu o endereço no site para receber o livro.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metrica rotulo="Total" valor={total} />
        <Metrica rotulo="Aguardando pagamento" valor={aguardando} />
        <Metrica rotulo="Pagos" valor={pagos} />
        <Metrica rotulo="Enviados / entregues" valor={enviados} />
      </div>

      <TabelaPedidos pedidos={pedidos as PedidoLinha[]} />
    </div>
  )
}

function Metrica({ rotulo, valor }: { rotulo: string; valor: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-[11px] font-medium uppercase tracking-wider text-ash">
        {rotulo}
      </p>
      <p className="mt-1.5 font-display text-3xl font-semibold">{valor}</p>
    </div>
  )
}
