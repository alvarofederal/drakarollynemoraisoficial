# Arquitetura

```
src/
├── app/
│   ├── page.tsx              # landing (cada seção é uma função no arquivo)
│   ├── layout.tsx            # fontes, metadata, Toaster
│   ├── globals.css           # tokens da identidade visual + utilitários
│   ├── _components/          # nav, botão comprar (modal de endereço)
│   ├── _actions/             # criarPedido
│   ├── login/                # página + form + action de login
│   ├── admin/                # layout protegido, página, componentes, actions
│   └── api/
│       ├── auth/[...nextauth]/
│       └── upload/           # upload para o Cloudinary
├── components/ui/            # shadcn/ui
├── config/site.ts            # TODO o conteúdo editável do site
└── lib/                      # auth, prisma, utils, validators
```

## Padrões

- Server Component é o padrão; `"use client"` só com hook, evento ou formulário.
- Mutations por Server Action, sempre validadas com Zod.
- Conteúdo textual e URLs de imagem vivem em `src/config/site.ts`.
- Cor nunca é fixa em componente — sempre um token (`text-brand`, `bg-card`).
