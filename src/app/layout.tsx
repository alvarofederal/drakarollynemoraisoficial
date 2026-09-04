// src/app/layout.tsx
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Toaster } from "sonner"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { site } from "@/config/site"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.autora.nome} — ${site.livro.titulo}`,
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

// Aplica o tema salvo antes da hidratação — evita flash.
// Padrão do site é claro; o escuro só entra se o usuário escolher.
const themeScript = `
(function(){
  try {
    if (localStorage.getItem('km-theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`.trim()

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // As variáveis das fontes ficam no <html> para que os tokens de
    // `:root` no globals.css consigam enxergá-las.
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors duration={3500} />
        <SpeedInsights />
      </body>
    </html>
  )
}
