"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { site } from "@/config/site"
import { ComprarButton } from "./comprar-button"

const LINKS = [
  { href: "#livro", label: "O livro" },
  { href: "#autora", label: "A autora" },
  { href: "#contato", label: "Contato" },
]

export function Nav() {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        rolou
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#topo"
          className="font-display text-base font-semibold tracking-tight sm:text-lg"
        >
          {site.autora.nome}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </div>

        <ComprarButton size="sm" className="shadow-none">
          Comprar
        </ComprarButton>
      </nav>
    </header>
  )
}
