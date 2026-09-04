import type { NextConfig } from "next"
import path from "path"

// Em git worktree, node_modules fica na raiz do projeto (3 níveis acima de .claude/worktrees/<name>)
const projectRoot =
  __dirname.includes(".claude") && __dirname.includes("worktrees")
    ? path.resolve(__dirname, "../../..")
    : __dirname

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  output: "standalone",

  // ✅ Headers de segurança HTTP (OWASP A05)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // va.vercel-scripts.com = Vercel Speed Insights
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              // Imagens: próprias + Cloudinary + (provisório) Hostinger Horizons
              "img-src 'self' data: blob: https://res.cloudinary.com https://storage.googleapis.com",
              // ViaCEP (autopreenchimento de endereço) + Cloudinary (upload)
              "connect-src 'self' https://viacep.com.br https://api.cloudinary.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              "base-uri 'self'",
              // O botão Comprar leva ao Stripe por navegação (não é submit de form)
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ]
  },

  turbopack: {
    root: projectRoot,
  },

  images: {
    qualities: [50, 75, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      // Provisório — remover depois de migrar as fotos para o Cloudinary
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/hostinger-horizons-assets-prod/**",
      },
    ],
  },
}

export default nextConfig
