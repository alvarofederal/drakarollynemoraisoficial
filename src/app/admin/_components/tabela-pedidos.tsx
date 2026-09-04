"use client"

import { useState, useTransition } from "react"
import { Copy, Loader2, MessageCircle, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { atualizarStatus, excluirPedido } from "../_actions/pedidos"

export type PedidoLinha = {
  id: string
  nome: string
  email: string | null
  telefone: string
  cep: string | null
  logradouro: string | null
  numero: string | null
  complemento: string | null
  bairro: string | null
  cidade: string | null
  uf: string | null
  quantidade: number
  status: string
  observacao: string | null
  origem: string | null
  criadoEm: Date
}

const STATUS_OPCOES = [
  { valor: "AGUARDANDO", rotulo: "Aguardando" },
  { valor: "PAGO", rotulo: "Pago" },
  { valor: "ENVIADO", rotulo: "Enviado" },
  { valor: "ENTREGUE", rotulo: "Entregue" },
  { valor: "CANCELADO", rotulo: "Cancelado" },
]

const STATUS_COR: Record<string, string> = {
  AGUARDANDO: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  PAGO: "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  ENVIADO: "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-400",
  ENTREGUE: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  CANCELADO: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400",
}

function enderecoCompleto(p: PedidoLinha) {
  const linha1 = [p.logradouro, p.numero].filter(Boolean).join(", ")
  const linha2 = [p.complemento, p.bairro].filter(Boolean).join(" — ")
  const linha3 = [p.cidade, p.uf].filter(Boolean).join(" - ")
  const cep = p.cep ? `CEP ${formatarCep(p.cep)}` : ""
  return [linha1, linha2, linha3, cep].filter(Boolean).join("\n")
}

function formatarCep(cep: string) {
  return cep.length === 8 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep
}

function formatarTelefone(tel: string) {
  if (tel.length === 11) return `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7)}`
  if (tel.length === 10) return `(${tel.slice(0, 2)}) ${tel.slice(2, 6)}-${tel.slice(6)}`
  return tel
}

export function TabelaPedidos({ pedidos }: { pedidos: PedidoLinha[] }) {
  const [filtro, setFiltro] = useState("")
  const [statusFiltro, setStatusFiltro] = useState("TODOS")

  const visiveis = pedidos.filter((p) => {
    const casaStatus = statusFiltro === "TODOS" || p.status === statusFiltro
    const texto = filtro.trim().toLowerCase()
    const casaTexto =
      !texto ||
      p.nome.toLowerCase().includes(texto) ||
      (p.cidade ?? "").toLowerCase().includes(texto) ||
      (p.email ?? "").toLowerCase().includes(texto) ||
      p.telefone.includes(texto.replace(/\D/g, ""))
    return casaStatus && casaTexto
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Buscar por nome, cidade, e-mail ou telefone…"
          className="h-10 w-full rounded-lg border border-input bg-background px-3.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 sm:max-w-sm"
        />

        <Select value={statusFiltro} onValueChange={setStatusFiltro}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos os status</SelectItem>
            {STATUS_OPCOES.map((s) => (
              <SelectItem key={s.valor} value={s.valor}>
                {s.rotulo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-sm text-ink-soft sm:ml-auto">
          {visiveis.length} de {pedidos.length}
        </p>
      </div>

      {visiveis.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <p className="font-medium">Nenhum pedido por aqui</p>
          <p className="mt-1 text-sm text-ink-soft">
            Os pedidos feitos no site aparecem nesta lista.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {visiveis.map((p) => (
            <CartaoPedido key={p.id} pedido={p} />
          ))}
        </div>
      )}
    </div>
  )
}

function CartaoPedido({ pedido }: { pedido: PedidoLinha }) {
  const [salvando, iniciar] = useTransition()
  const [excluindo, iniciarExclusao] = useTransition()

  const endereco = enderecoCompleto(pedido)

  function mudarStatus(novo: string) {
    iniciar(async () => {
      const r = await atualizarStatus(pedido.id, novo)
      if (!r.ok) toast.error(r.erro)
      else toast.success("Status atualizado")
    })
  }

  function excluir() {
    iniciarExclusao(async () => {
      const r = await excluirPedido(pedido.id)
      if (!r.ok) toast.error(r.erro)
      else toast.success("Pedido excluído")
    })
  }

  async function copiarEndereco() {
    const texto = `${pedido.nome}\n${formatarTelefone(pedido.telefone)}\n${endereco}`
    await navigator.clipboard.writeText(texto)
    toast.success("Endereço copiado")
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{pedido.nome}</h3>
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                STATUS_COR[pedido.status] ?? ""
              }`}
            >
              {STATUS_OPCOES.find((s) => s.valor === pedido.status)?.rotulo ??
                pedido.status}
            </span>
            {pedido.quantidade > 1 ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-ink-soft">
                {pedido.quantidade} exemplares
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-xs text-ink-soft">
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
              timeZone: "America/Sao_Paulo",
            }).format(pedido.criadoEm)}
            {pedido.origem ? ` · via ${pedido.origem}` : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={pedido.status}
            onValueChange={mudarStatus}
            disabled={salvando}
          >
            <SelectTrigger className="h-9 w-36">
              {salvando ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <SelectValue />
              )}
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPCOES.map((s) => (
                <SelectItem key={s.valor} value={s.valor}>
                  {s.rotulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Excluir pedido de ${pedido.nome}`}
              >
                {excluindo ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir este pedido?</AlertDialogTitle>
                <AlertDialogDescription>
                  O pedido de <strong>{pedido.nome}</strong> será removido
                  permanentemente. Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={excluir}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="mt-4 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
            Contato
          </p>
          <p className="mt-1 text-sm">{formatarTelefone(pedido.telefone)}</p>
          {pedido.email ? (
            <p className="text-sm text-ink-soft">{pedido.email}</p>
          ) : null}
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
            Entrega
          </p>
          <p className="mt-1 whitespace-pre-line text-sm">{endereco}</p>
        </div>
      </div>

      {pedido.observacao ? (
        <p className="mt-3 rounded-lg bg-muted px-3 py-2 text-sm text-ink-soft">
          {pedido.observacao}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={copiarEndereco}>
          <Copy className="mr-1.5 size-3.5" /> Copiar endereço
        </Button>
        <Button asChild variant="outline" size="sm">
          <a
            href={`https://wa.me/55${pedido.telefone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-1.5 size-3.5" /> WhatsApp
          </a>
        </Button>
      </div>
    </article>
  )
}
