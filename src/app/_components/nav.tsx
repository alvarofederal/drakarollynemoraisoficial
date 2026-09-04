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
    const onScroll = () => setRolou(window.scrollY > 32)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        rolou ? "bg-white/85 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-6 lg:px-8">
        <a
          href="#topo"
          className="font-display text-[20px] font-bold tracking-[-0.02em] text-ink"
        >
          {site.autora.nomeCurto}
          <sup className="ml-0.5 text-[9px] align-super">®</sup>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[17px] text-ink/70 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <ComprarButton size="sm">Comprar</ComprarButton>
      </nav>
    </header>
  )
}
