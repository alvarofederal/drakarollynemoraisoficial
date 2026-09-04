// src/app/layout.tsx
import type { Metadata } from "next"
import { Inter, Inter_Tight } from "next/font/google"
import { Toaster } from "sonner"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { site } from "@/config/site"
import "./globals.css"

// A referência usa HelveticaNowDisplay (licença Monotype, não pode ser
// embutida). Inter Tight é o substituto livre mais próximo: mesma grotesca
// neutra, desenhada para títulos grandes com tracking apertado.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.livro.titulo} — ${site.autora.nome}`,
    template: `%s | ${site.autora.nome}`,
  },
  description: site.livro.sinopse,
  keywords: [
    "Karollyne Morais",
    site.livro.titulo,
    "livro de medicina",
    "internato médico",
    "ortopedia",
    "literatura médica",
  ],
  authors: [{ name: site.autora.nome, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.autora.nome,
    title: `${site.livro.titulo} — ${site.autora.nome}`,
    description: site.livro.sinopse,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.livro.titulo} — ${site.autora.nome}`,
    description: site.livro.sinopse,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Toaster position="top-center" duration={3500} />
        <SpeedInsights />
      </body>
    </html>
  )
}
