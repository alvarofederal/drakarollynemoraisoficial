"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { KeyRound, Loader2, LogIn, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction, type LoginState } from "../_actions/login"

export function LoginForm({ redirect }: { redirect: string }) {
  const [estado, formAction] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  )

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirect" value={redirect} />

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2 text-sm">
          <Mail className="size-4 text-brand" /> E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha" className="flex items-center gap-2 text-sm">
          <KeyRound className="size-4 text-brand" /> Senha
        </Label>
        <Input
          id="senha"
          name="senha"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      {estado.erro ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {estado.erro}
        </p>
      ) : null}

      <BotaoEntrar />
    </form>
  )
}

function BotaoEntrar() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full font-semibold">
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" /> Entrando…
        </>
      ) : (
        <>
          <LogIn className="mr-2 size-4" /> Entrar
        </>
      )}
    </Button>
  )
}
