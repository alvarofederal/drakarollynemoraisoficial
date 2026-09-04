"use client"

import { useState, useTransition } from "react"
import { BookOpen, Loader2, Truck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { criarPedido } from "../_actions/criar-pedido"

type Campos = Record<string, string>

const CAMPOS_VAZIOS = {
  nome: "",
  email: "",
  telefone: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
}

export function ComprarButton({
  className,
  size = "lg",
  children,
}: {
  className?: string
  size?: "default" | "sm" | "lg"
  children?: React.ReactNode
}) {
  const [aberto, setAberto] = useState(false)
  const [form, setForm] = useState(CAMPOS_VAZIOS)
  const [erros, setErros] = useState<Campos>({})
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [enviando, iniciarEnvio] = useTransition()

  function set(campo: keyof typeof CAMPOS_VAZIOS, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }))
    setErros((e) => ({ ...e, [campo]: "" }))
  }

  // Autopreenchimento de endereço pelo CEP (ViaCEP)
  async function buscarCep(cep: string) {
    const limpo = cep.replace(/\D/g, "")
    if (limpo.length !== 8) return

    setBuscandoCep(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`)
      const data = await res.json()
      if (data.erro) {
        setErros((e) => ({ ...e, cep: "CEP não encontrado" }))
        return
      }
      setForm((f) => ({
        ...f,
        logradouro: data.logradouro || f.logradouro,
        bairro: data.bairro || f.bairro,
        cidade: data.localidade || f.cidade,
        uf: data.uf || f.uf,
      }))
    } catch {
      // Sem conexão com o ViaCEP: o usuário preenche na mão.
    } finally {
      setBuscandoCep(false)
    }
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault()

    iniciarEnvio(async () => {
      const origem =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("utm_source") ?? ""
          : ""

      const resultado = await criarPedido({ ...form, quantidade: 1, origem })

      if (!resultado.ok) {
        setErros(resultado.campos ?? {})
        toast.error(resultado.erro)
        return
      }

      toast.success("Dados salvos! Levando você para o pagamento…")
      setForm(CAMPOS_VAZIOS)
      setAberto(false)
      window.location.href = resultado.checkoutUrl
    })
  }

  return (
    <>
      <Button
        size={size}
        onClick={() => setAberto(true)}
        className={cn(
          "rounded-full font-semibold shadow-lg shadow-brand/20 transition-transform hover:-translate-y-0.5",
          className
        )}
      >
        <BookOpen className="mr-2 size-5" />
        {children ?? "Comprar o livro"}
      </Button>

      <Dialog open={aberto} onOpenChange={setAberto}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Truck className="size-5 text-brand" />
              Endereço de entrega
            </DialogTitle>
            <DialogDescription>
              Preencha os dados para o envio. Em seguida você vai para o
              pagamento seguro pelo Stripe.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={enviar} className="grid gap-4 pt-2">
            <Campo
              id="nome"
              rotulo="Nome completo"
              valor={form.nome}
              erro={erros.nome}
              onChange={(v) => set("nome", v)}
              placeholder="Como está no seu documento"
              autoComplete="name"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                id="telefone"
                rotulo="WhatsApp"
                valor={form.telefone}
                erro={erros.telefone}
                onChange={(v) => set("telefone", v)}
                placeholder="(61) 99999-9999"
                inputMode="tel"
                autoComplete="tel"
              />
              <Campo
                id="email"
                rotulo="E-mail (opcional)"
                valor={form.email}
                erro={erros.email}
                onChange={(v) => set("email", v)}
                placeholder="voce@email.com"
                type="email"
                autoComplete="email"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
              <Campo
                id="cep"
                rotulo="CEP"
                valor={form.cep}
                erro={erros.cep}
                onChange={(v) => set("cep", v)}
                onBlur={() => buscarCep(form.cep)}
                placeholder="00000-000"
                inputMode="numeric"
                autoComplete="postal-code"
                sufixo={
                  buscandoCep ? (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  ) : null
                }
              />
              <Campo
                id="logradouro"
                rotulo="Rua / Avenida"
                valor={form.logradouro}
                erro={erros.logradouro}
                onChange={(v) => set("logradouro", v)}
                autoComplete="address-line1"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_2fr]">
              <Campo
                id="numero"
                rotulo="Número"
                valor={form.numero}
                erro={erros.numero}
                onChange={(v) => set("numero", v)}
              />
              <Campo
                id="complemento"
                rotulo="Compl."
                valor={form.complemento}
                erro={erros.complemento}
                onChange={(v) => set("complemento", v)}
                placeholder="Apto 101"
              />
              <Campo
                id="bairro"
                rotulo="Bairro"
                valor={form.bairro}
                erro={erros.bairro}
                onChange={(v) => set("bairro", v)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-[3fr_1fr]">
              <Campo
                id="cidade"
                rotulo="Cidade"
                valor={form.cidade}
                erro={erros.cidade}
                onChange={(v) => set("cidade", v)}
              />
              <Campo
                id="uf"
                rotulo="UF"
                valor={form.uf}
                erro={erros.uf}
                onChange={(v) => set("uf", v.toUpperCase().slice(0, 2))}
                placeholder="DF"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={enviando}
              className="mt-2 w-full rounded-full font-semibold"
            >
              {enviando ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Salvando…
                </>
              ) : (
                "Ir para o pagamento"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Pagamento processado com segurança pelo Stripe. Seus dados são
              usados apenas para o envio do livro.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

function Campo({
  id,
  rotulo,
  valor,
  erro,
  onChange,
  onBlur,
  sufixo,
  ...props
}: {
  id: string
  rotulo: string
  valor: string
  erro?: string
  onChange: (v: string) => void
  onBlur?: () => void
  sufixo?: React.ReactNode
} & Omit<React.ComponentProps<typeof Input>, "onChange" | "onBlur" | "id" | "value">) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {rotulo}
      </Label>
      <div className="relative">
        <Input
          id={id}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!erro}
          {...props}
        />
        {sufixo ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {sufixo}
          </span>
        ) : null}
      </div>
      {erro ? <p className="text-xs text-destructive">{erro}</p> : null}
    </div>
  )
}
