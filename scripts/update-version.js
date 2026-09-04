// scripts/update-version.js
// Grava public/version.json com a versão do build.
// Roda antes do `next build` — por isso NUNCA pode derrubar o build:
// em servidor de deploy pode não haver git, e a pasta public/ pode nem
// existir (o Git não versiona diretório vazio).
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const DESTINO = path.join(process.cwd(), "public", "version.json")

function daGit() {
  const git = (cmd) => execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()

  const commitCount = git("git rev-list --count HEAD")
  const commitHash = git("git rev-parse --short HEAD")
  const branch = git("git rev-parse --abbrev-ref HEAD")

  return {
    version: commitCount,
    hash: commitHash,
    branch,
    buildDate: new Date().toISOString(),
    fullVersion: `${commitCount}.${commitHash}`,
  }
}

function padrao() {
  return {
    version: "0",
    hash: "dev",
    branch: "local",
    buildDate: new Date().toISOString(),
    fullVersion: "0.dev",
  }
}

let versao
try {
  versao = daGit()
} catch {
  console.log("⚠️  Sem informação do git — usando versão padrão")
  versao = padrao()
}

try {
  fs.mkdirSync(path.dirname(DESTINO), { recursive: true })
  fs.writeFileSync(DESTINO, JSON.stringify(versao, null, 2))
  console.log("✅ Versão:", versao.fullVersion)
} catch (erro) {
  // Não é motivo para interromper o deploy.
  console.log("⚠️  Não foi possível gravar version.json:", erro.message)
}
