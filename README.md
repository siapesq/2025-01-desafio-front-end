# PesquIA - Desafio SIAPESQ

## 📖 Sobre o Projeto
O **pesquIA** é um sistema ERP focado no segmento de pescaria, permitindo o gerenciamento de produtos e operações de compra e venda.


## 🛠️ Stack Tecnológica Principal

Este projeto foi desenvolvido utilizando tecnologias modernas para criar uma aplicação web robusta e escalável:

- **Next.js**: Framework React para renderização híbrida e otimização de performance
- **shadcn/UI**: Biblioteca de componentes reutilizáveis e personalizáveis
- **Auth.js**: Sistema completo de autenticação e gerenciamento de sessões
- **TypeScript**: Tipagem estática para desenvolvimento mais seguro
- **Prisma**: ORM para interação com banco de dados

### Stack do Projeto

Este projeto é uma aplicação web que utiliza **Next.js**, um framework React focado em renderização do lado servidor e funcionalidades modernas de desenvolvimento web.

As tecnologias utilizadas são:

| **Tecnologia**        | **Versão**       |
|-----------------------|------------------|
| **Runtime**           |                  |
| Node.js               | v18.x.x          |
| **Framework**         |                  |
| Next.js               | v15.x.x          |
| **Banco de Dados**    |                  |
| prisma                | v5.x.x           |
| **Devtime**           |                  |
| npm                   | v9.x.x           |

## 🚀 Características Principais
##  Arquitetura e Padrões
 - Arquitetura Moderna: Utiliza App Router do Next.js 15
 - Server Components: Maximiza performance com React Server Components
 - API Routes: Sistema de rotas API integrado
 - TypeScript: Tipo seguro em toda a base de código
 - React Hook Form: Gerenciamento avançado de formulários
 - Zod: Validação de dados type-safe

 ### 🏗 Arquitetura do Projeto
```

    └── pesquia/
        ├── {} components.json
        ├── 🛠️ eslint.config.mjs
        ├── 🛠️ next.config.ts
        ├── {} package-lock.json
        ├── {} package.json
        ├── 🛠️ postcss.config.mjs
        ├── 🛠️ tailwind.config.js
        ├── {} tsconfig.json
        ├── .env-sample
        ├── 📁app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── 📁api/
        │   │   └── 📁auth/
        │   │       └── [...nextauth]/
        │   │           └── route.ts
        │   └── 📁auth/
        │       ├── cadastro/
        │       │   └── ⚛ page.tsx
        │       └── login/
        │           └── ⚛ page.tsx
        ├── 📁components/
        │   ├── auth/
        │   │   └── ⚛ login-form.tsx
        |   |   └── ⚛ register-form.tsx
        │   └── ui/
        │       ├── ⚛ button.tsx
        ├── 📁lib/
        │   ├── 🇹 auth.ts
        │   ├── 🇹 gemini.ts
        │   ├── 🇹 getQueryClient.ts
        │   └── 🇹 utils.ts
        ├── 📁prisma/
        │   ├── schema.prisma
        │   └── migrations/
        ├── 📁providers/
        │   └── providers.tsx
        └── 📁schemas/
            └── 🇹 login-schema.ts
            └── 🇹 register-schema.ts
```

## Autenticação e Segurança
 - Auth.js: Sistema de autenticação


## ⚙️ Instalação e Configuração

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/repositorio-sample.git
   cd repositorio-sample
   cd pesquia
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env` na raiz do projeto com suas credenciais use o arquivo `env-example`

4. Inicie o ambiente de desenvolvimento:
```bash
# Gera o cliente do Prisma e apliqua as migrations
npx prisma generate && npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

   > O servidor será iniciado em modo de desenvolvimento com hot-reload

5. Visualize o Homepage:
   ```
   http://localhost:3000/
   ```
   > A página principal da landing page será carregada


## 💻 Funcionalidades Principais

[landing Page](http://localhost:3000/)
[login Page](http://localhost:3000/auth/login)
[Cadastro Page](http://localhost:3000/auth/register)
[Home Page](http://localhost:3000/dashboard)
[Crud Products](http://localhost:3000/dashboard/produtos)



## 📝 CHECKLIST:

[Checklist](/docs/SIAPESQ/CHECKPOINT.MD)

## 📝 DESAFIO:

[Desafio](/docs/SIAPESQ/DESAFIO.MD)

## 📝 Documentação:

[Documentação_do_Projeto](/docs/PesquIA/DOCS.MD)

## 📝 Autor

- **jvras**

## 📜 Licença

Este projeto ainda não possui licença definida.

## 📖 Documentação principais consultadas:

[Next.js 15](https://nextjs.org/docs/getting-started)

[Next.js caching](https://nextjs.org/docs/app/building-your-application/caching)

[Tanstack](https://tanstack.com/)

[React-hook-forms](https://react-hook-form.com/)

[zod](https://zod.dev/)


