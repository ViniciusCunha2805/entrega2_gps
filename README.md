<div align="center">

```
██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗ ██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗
██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝██████╔╝██████╔╝██║   ██║
██╔══██╗██╔══██║██╔══██╗██╔══██╗██╔══╝  ██╔══██╗██╔═══╝ ██╔══██╗██║   ██║
██████╔╝██║  ██║██║  ██║██████╔╝███████╗██║  ██║██║     ██║  ██║╚██████╔╝
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
```

**Sistema de Gestão para Barbearias — Mobile First**

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://deploy-entrega2gps.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-barberpro--app-blue?logo=docker&style=for-the-badge)](https://hub.docker.com/r/douglasblima/barberpro-app)

### 🔗 [**Acessar aplicação em produção →**](https://deploy-entrega2gps.vercel.app/)

</div>

---

## 📋 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura MVC](#-arquitetura-mvc)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar localmente](#-como-rodar-localmente)
- [Docker](#-docker)
- [Deploy](#-deploy)
- [Tecnologias](#-tecnologias)
- [Perfis de acesso](#-perfis-de-acesso)
- [Contribuindo](#-contribuindo)

---

## 💈 Sobre o projeto

O **BarberPro** é uma aplicação web mobile-first desenvolvida para digitalizar a gestão de barbearias. O sistema oferece dois perfis de acesso distintos — cliente e dono — com fluxos independentes, estado compartilhado em memória e interface inspirada em um app nativo.

A proposta do projeto é demonstrar uma arquitetura MVC adaptada ao React, separando responsabilidades em Model, Controller e View. O estado global é gerenciado com Context API e `useReducer`, sem backend real, o que torna a experiência ideal para fins didáticos e demonstração.

> Nota: os dados são mantidos em memória durante a sessão. Ao recarregar a página, o estado volta ao inicial.

---

## ✅ Funcionalidades

### 🔐 Autenticação

- Login com e-mail e senha, validado contra o estado em memória
- Cadastro de novos usuários com escolha de perfil (cliente ou dono)
- Acesso rápido por contas de demonstração
- Logout em todos os perfis

### 👤 Perfil Cliente

- Home com próximo agendamento em destaque
- Agendamento com serviço, data, horário e confirmação
- Catálogo de produtos atualizado em tempo real
- Notificações com contador e limpeza em massa
- Perfil com histórico, gastos e preferências

### 💈 Perfil Dono

- Dashboard com métricas reais de agendamentos
- Agenda com filtros por status
- CRUD de produtos
- Perfil da barbearia e configurações

### 🔄 Estado Global Compartilhado

- Um agendamento feito pelo cliente aparece na agenda do dono
- Um produto removido pelo dono some do catálogo do cliente
- Métricas e notificações refletem as ações realizadas em tempo real

---

## 🏗️ Arquitetura MVC

O projeto segue o padrão MVC adaptado ao ecossistema React:

```text
Usuário → action → Controller (reducer) → Model (estado) → View (componentes)
```

Os principais pontos são:

- Model: estado inicial e dados seed em [src/models/initialState.js](src/models/initialState.js)
- Controller: lógica de negócio em [src/controllers/appReducer.js](src/controllers/appReducer.js)
- View: telas e componentes em [src/views](src/views) e [src/components](src/components)
- Context: integração entre estado e interface em [src/context/AppContext.jsx](src/context/AppContext.jsx)

---

## 📁 Estrutura de pastas

```text
barberpro/
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile
├── .dockerignore
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── components/
    ├── context/
    ├── controllers/
    ├── models/
    └── views/
```

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js 18 ou superior
- npm
- Git

Verifique com:

```bash
node --version
npm --version
git --version
```

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/ViniciusCunha2805/entrega2_gps.git
cd entrega2_gps
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 4. Acesse no navegador

```text
http://localhost:5173
```

### Scripts disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Inicia o servidor com hot reload |
| `npm run build` | Gera a versão otimizada em `dist/` |
| `npm run preview` | Serve o build de produção localmente |

---

## 🐳 Docker

O projeto já conta com um [Dockerfile](Dockerfile) e um [.dockerignore](.dockerignore) prontos para uso.

### Construir a imagem localmente

```bash
docker build -t barberpro-app .
```

### Rodar localmente a imagem construída

```bash
docker run -p 8080:80 barberpro-app
```

A aplicação ficará disponível em:

```text
http://localhost:8080
```

### Usar a imagem publicada no Docker Hub

Você também pode baixar e executar a imagem já publicada em:

[https://hub.docker.com/r/douglasblima/barberpro-app](https://hub.docker.com/r/douglasblima/barberpro-app)

```bash
docker pull douglasblima/barberpro-app:latest
docker run -d --name barberpro -p 8080:80 douglasblima/barberpro-app:latest
```

Acesse:

```text
http://localhost:8080
```

---

## ☁️ Deploy

A aplicação está publicada na Vercel e pode ser acessada em:

[https://deploy-entrega2gps.vercel.app/](https://deploy-entrega2gps.vercel.app/)

Para fazer um deploy próprio na Vercel:

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Conecte o repositório GitHub
3. Use:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|-----------|-----|
| React | Interface da aplicação |
| Vite | Build e servidor de desenvolvimento |
| Context API | Gerenciamento de estado global |
| `useReducer` | Lógica de transição de estado |
| CSS puro | Estilização |
| Google Fonts | Tipografia |

---

## 🔑 Perfis de acesso

### Contas de teste disponíveis

| Perfil | E-mail | Senha | Acesso |
|--------|--------|-------|--------|
| Cliente | `joao@email.com` | `123456` | Home, agendamento, produtos, notificações e perfil |
| Dono | `carlos@barberpro.com` | `admin123` | Dashboard, agenda, produtos e perfil |

Também é possível criar uma nova conta no formulário de cadastro. As contas criadas ficam apenas na sessão atual da aplicação.

---

## 🤝 Contribuindo

Contribuições são bem-vindas. Para colaborar:

1. Faça um fork do repositório
2. Crie uma branch com uma descrição clara
3. Faça commits objetivamente
4. Abra um Pull Request

---

<div align="center">

Feito com ✂️ e ☕

**[Acessar BarberPro →](https://deploy-entrega2gps.vercel.app/)**

</div>
