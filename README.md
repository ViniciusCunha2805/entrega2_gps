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
[![License](https://img.shields.io/badge/Licença-MIT-gold?style=for-the-badge)](LICENSE)

### 🔗 [**Acessar aplicação em produção →**](https://deploy-entrega2gps.vercel.app/)

</div>

---

## 📋 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura MVC](#-arquitetura-mvc)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar localmente](#-como-rodar-localmente)
- [Deploy](#-deploy)
- [Tecnologias](#-tecnologias)
- [Perfis de acesso](#-perfis-de-acesso)
- [Fluxo de dados](#-fluxo-de-dados)
- [Decisões de projeto](#-decisões-de-projeto)
- [Contribuindo](#-contribuindo)

---

## 💈 Sobre o projeto

O **BarberPro** é uma aplicação web *mobile-first* desenvolvida para digitalizar a gestão de barbearias. O sistema oferece dois perfis de acesso distintos — **cliente** e **dono** — com fluxos independentes, estado compartilhado em memória e interface fiel ao design de um aplicativo nativo.

O projeto foi construído como **exercício completo de arquitetura MVC em React**, separando de forma explícita as responsabilidades de Model (dados), Controller (lógica de negócio via Reducer) e View (componentes), com estado global gerenciado por Context API + `useReducer`.

> **Nota:** os dados são mantidos em memória (RAM). Ao reiniciar a aplicação, o estado retorna ao inicial — comportamento intencional para fins didáticos.

---

## 🖥️ Demonstração

| Tela | Cliente | Dono |
|------|---------|------|
| Login / Cadastro | ✅ | ✅ |
| Home com próximo agendamento | ✅ | — |
| Agendamento com calendário | ✅ | — |
| Catálogo de produtos | ✅ | ✅ (CRUD) |
| Notificações com badge | ✅ | — |
| Perfil com histórico e stats | ✅ | ✅ |
| Dashboard com métricas reais | — | ✅ |
| Agenda com filtros de status | — | ✅ |

**🔗 Acesse agora:** [https://deploy-entrega2gps.vercel.app/](https://deploy-entrega2gps.vercel.app/)<br>

**🔗 Video demonstrativo:** [https://youtu.be/K1NcUt4PWaI)
---

## ✅ Funcionalidades

### 🔐 Autenticação

- Login com e-mail e senha (validação real contra estado em memória)
- Cadastro de novos usuários com escolha de perfil (cliente ou dono)
- Acesso rápido via botões de teste para demonstração
- Logout disponível em todos os perfis de acesso

### 👤 Perfil Cliente

- **Home:** card de boas-vindas com próximo agendamento confirmado em destaque
- **Agendamento:**
  - Seleção de serviço com preço e duração (4 opções)
  - Calendário navegável com bloqueio de datas passadas
  - Indicador visual de dias com agendamento existente
  - Grade de horários com bloqueio automático de horários já ocupados
  - Confirmação grava no estado global e gera notificação automática
- **Produtos:** catálogo completo atualizado em tempo real com as edições do dono
- **Notificações:** feed com badge de não lidas, limpeza em massa
- **Perfil:** total gasto calculado dinamicamente, histórico completo com status, toggles de preferência

### 💈 Perfil Dono

- **Dashboard:**
  - Métricas calculadas dos dados reais: total de cortes, receita, pendentes, concluídos e cancelados
  - Gráfico de barras de atividade semanal
  - Lista de próximos agendamentos confirmados
- **Agenda:**
  - Listagem de todos os agendamentos do sistema
  - Filtros por status: Todos / Pendentes / Concluídos / Cancelados
  - Ações por card: **Concluir** (muda status para `completed`) e **Cancelar** (muda para `cancelled`)
- **Produtos:**
  - Formulário de cadastro com emoji/ícone, nome, descrição e preço
  - Exclusão individual
  - Alterações refletem imediatamente na visão do cliente
- **Perfil:** dados da barbearia, horários de funcionamento, toggles de configuração

### 🔄 Estado Global Compartilhado

- Um agendamento feito pelo cliente aparece imediatamente na agenda do dono
- Um produto removido pelo dono desaparece do catálogo do cliente
- Métricas do dashboard refletem ações de concluir/cancelar em tempo real

---

## 🏗️ Arquitetura MVC

O projeto segue o padrão **MVC (Model-View-Controller)** adaptado para o ecossistema React:

```
┌─────────────────────────────────────────────────────────┐
│                        USER ACTION                       │
│              (clique, formulário, navegação)             │
└─────────────────────────┬───────────────────────────────┘
                          │ dispatch(action)
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     CONTROLLER                           │
│              src/controllers/appReducer.js               │
│                                                          │
│  LOGIN · LOGOUT · REGISTER · BOOK · CANCEL_APPT         │
│  COMPLETE_APPT · ADD_PRODUCT · REMOVE_PRODUCT           │
│  READ_ALL_NOTIFS · TOAST · CLEAR_TOAST                   │
└─────────────────────────┬───────────────────────────────┘
                          │ novo estado (imutável)
                          ▼
┌─────────────────────────────────────────────────────────┐
│                       MODEL                              │
│              src/models/initialState.js                  │
│                                                          │
│  users · currentUser · appointments · products          │
│  notifications · nextId · toast                         │
└─────────────────────────┬───────────────────────────────┘
                          │ via Context API
                          ▼
┌─────────────────────────────────────────────────────────┐
│                        VIEW                              │
│                    src/views/ + src/components/          │
│                                                          │
│  LoginScreen · RegisterScreen                           │
│  ClientApp → CHome · CBooking · CProducts               │
│              CNotifications · CProfile                  │
│  OwnerApp  → ODash · OAgenda · OProducts · OProfile     │
│  Components: Toast · ApptCard · Toggle · StatusPill     │
└─────────────────────────────────────────────────────────┘
```

### Princípios aplicados

| Princípio | Aplicação no projeto |
|-----------|---------------------|
| **Separação de responsabilidades** | Model, Controller e View em pastas e arquivos independentes |
| **Imutabilidade** | O reducer nunca muta o estado; sempre retorna um novo objeto |
| **Unidirecionalidade** | Dados fluem sempre de cima para baixo via Context |
| **Componentes reutilizáveis** | `ApptCard`, `StatusPill`, `Toggle` e `Toast` são usados por múltiplas views |
| **Single source of truth** | Um único estado global em memória para toda a aplicação |

---

## 📁 Estrutura de pastas

```
barberpro/
│
├── index.html                  # Entry point HTML (Vite)
├── package.json                # Dependências e scripts
├── vite.config.js              # Configuração do bundler
│
└── src/
    │
    ├── main.jsx                # Montagem do React + AppProvider
    ├── App.jsx                 # Roteador raiz (login / cliente / dono)
    ├── index.css               # Todos os estilos globais da aplicação
    │
    ├── models/
    │   └── initialState.js     # ★ MODEL: estado inicial, constantes e dados seed
    │
    ├── controllers/
    │   └── appReducer.js       # ★ CONTROLLER: lógica de negócio (todas as actions)
    │
    ├── context/
    │   └── AppContext.jsx      # Provider + hook useApp (ponte MVC ↔ React)
    │
    ├── components/             # Componentes reutilizáveis (sem lógica de domínio)
    │   ├── ApptCard.jsx        # Card de agendamento com ações
    │   ├── StatusPill.jsx      # Badge de status (confirmed/completed/cancelled)
    │   ├── Toast.jsx           # Notificação flutuante global
    │   └── Toggle.jsx          # Switch on/off
    │
    └── views/                  # ★ VIEW: telas organizadas por perfil
        │
        ├── auth/
        │   ├── LoginScreen.jsx
        │   └── RegisterScreen.jsx
        │
        ├── client/
        │   ├── ClientApp.jsx       # Shell: navegação inferior + TopBar do cliente
        │   ├── CHome.jsx           # Tela inicial com próximo agendamento
        │   ├── CBooking.jsx        # Calendário + seleção de serviço e horário
        │   ├── CProducts.jsx       # Catálogo de produtos (somente leitura)
        │   ├── CNotifications.jsx  # Feed de notificações com badge
        │   └── CProfile.jsx        # Perfil, stats, histórico e preferências
        │
        └── owner/
            ├── OwnerApp.jsx        # Shell: navegação inferior do dono
            ├── ODash.jsx           # Dashboard com métricas e gráfico
            ├── OAgenda.jsx         # Agenda completa com filtros
            ├── OProducts.jsx       # CRUD de produtos
            └── OProfile.jsx        # Perfil, horários e configurações
```

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- **[Node.js](https://nodejs.org/)** versão 18 ou superior
  - Para verificar: `node --version`
- **npm** (já vem junto com o Node.js)
  - Para verificar: `npm --version`
- **Git** (para clonar o repositório)
  - Para verificar: `git --version`

> **Dica:** Se não tiver o Node.js, acesse [nodejs.org](https://nodejs.org), baixe a versão **LTS** e instale normalmente. O npm vem incluído.

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/barberpro.git
```

### 2. Acesse a pasta do projeto

```bash
cd barberpro
```

### 3. Instale as dependências

```bash
npm install
```

> Isso baixa o React, o Vite e os demais pacotes listados no `package.json`. Pode levar alguns segundos na primeira vez.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Acesse no navegador

Abra o Chrome e acesse:

```
http://localhost:5173
```

O servidor recarrega automaticamente ao salvar qualquer arquivo — não é necessário reiniciar.

---

### Scripts disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build` | Gera a versão otimizada de produção na pasta `dist/` |
| `npm run preview` | Serve localmente o build de produção para testar antes do deploy |

---

## ☁️ Deploy

A aplicação está publicada na **Vercel** e pode ser acessada diretamente pelo link:

### 🔗 [https://deploy-entrega2gps.vercel.app/](https://deploy-entrega2gps.vercel.app/)

### Como fazer seu próprio deploy na Vercel

1. Crie uma conta gratuita em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Na tela de configuração, use as definições abaixo:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

4. Clique em **Deploy** — a Vercel detecta o Vite automaticamente e publica em segundos.

> Qualquer `git push` na branch principal dispara um novo deploy automático.

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| [React](https://react.dev/) | 18.x | Biblioteca de UI |
| [Vite](https://vitejs.dev/) | 5.x | Bundler e servidor de dev |
| [React DOM](https://react.dev/) | 18.x | Renderização no navegador |
| Context API | — | Gerenciamento de estado global |
| `useReducer` | — | Padrão Flux / Controller |
| CSS Puro | — | Estilização sem dependências externas |
| Google Fonts | — | Bebas Neue + DM Sans |

> O projeto **não usa** bibliotecas de estado externas (Redux, Zustand), CSS-in-JS (Styled Components, Emotion) nem roteadores (React Router). A arquitetura é intencional: demonstrar que Context API + `useReducer` atendem aplicações de complexidade média com código limpo e previsível.

---

## 🔑 Perfis de acesso

### Contas de teste disponíveis na tela de login

| Perfil | E-mail | Senha | Acesso |
|--------|--------|-------|--------|
| 👤 Cliente | `joao@email.com` | `123456` | Home, Agendamento, Produtos, Notificações, Perfil |
| 💈 Dono | `carlos@barberpro.com` | `admin123` | Dashboard, Agenda, Produtos (CRUD), Perfil |

### Criar nova conta

É possível criar novos usuários diretamente pelo formulário de cadastro:

1. Na tela de login, clique em **"Criar conta"**
2. Preencha nome, telefone, e-mail e senha (mínimo 6 caracteres)
3. Escolha o tipo de conta: **Cliente** ou **Dono de Barbearia**
4. A conta é criada imediatamente no estado em memória

> **Atenção:** contas criadas são perdidas ao recarregar a página — o estado vive apenas na sessão atual.

---

## 🔄 Fluxo de dados

### Exemplo: cliente realiza um agendamento

```
CBooking.jsx
  └─ usuário seleciona serviço, data e horário
  └─ clica em "Confirmar Agendamento"
  └─ dispatch({ type: 'BOOK', service, price, date, time, ... })
         │
         ▼
appReducer.js  (case 'BOOK')
  └─ cria objeto appointment  → adiciona em state.appointments[]
  └─ cria objeto notification → adiciona em state.notifications[]
  └─ define toast de confirmação
         │
         ▼
AppContext.jsx  (estado atualizado)
  └─ todos os componentes re-renderizam com novo estado
         │
         ┌──────────────────────────────────────┐
         ▼                                      ▼
  CHome.jsx                              ODash.jsx / OAgenda.jsx
  (mostra novo agendamento              (mostra novo pendente
   no card "próximo")                   no dashboard e agenda)
```

### Mapa completo de actions do reducer

| Action | Disparada por | Efeito no estado |
|--------|--------------|-----------------|
| `LOGIN` | LoginScreen | Define `currentUser` |
| `LOGOUT` | CProfile / OProfile | Limpa `currentUser` |
| `REGISTER` | RegisterScreen | Adiciona usuário em `users` |
| `BOOK` | CBooking | Adiciona em `appointments` + `notifications` |
| `CANCEL_APPT` | ApptCard | Status do agendamento → `cancelled` |
| `COMPLETE_APPT` | ApptCard (dono) | Status do agendamento → `completed` |
| `ADD_PRODUCT` | OProducts | Adiciona em `products` |
| `REMOVE_PRODUCT` | OProducts | Remove de `products` |
| `READ_ALL_NOTIFS` | CNotifications | Marca todas as notificações como lidas |
| `TOAST` | qualquer view | Define mensagem de toast |
| `CLEAR_TOAST` | Toast.jsx | Limpa toast após 2,4s |

---

## 💡 Decisões de projeto

### Por que `useReducer` em vez de `useState` espalhado?

Com múltiplas entidades relacionadas (usuários, agendamentos, produtos, notificações), `useState` individual geraria dependências cruzadas difíceis de rastrear. O `useReducer` centraliza toda a lógica de transição de estado em um único arquivo, tornando o comportamento do sistema auditável e testável de forma isolada.

### Por que CSS puro em vez de Tailwind ou Styled Components?

A aplicação exige uma identidade visual muito específica (dark tactical, variáveis CSS customizadas, pseudo-elementos). CSS puro com variáveis `:root` oferece controle total sem camadas de abstração, e o arquivo `index.css` funciona como um design system leve mas completo.

### Por que não usar React Router?

O roteamento desta aplicação é baseado em **estado** (qual tab está ativo, qual perfil está logado), não em URL. Usar React Router adicionaria complexidade desnecessária sem ganho real para o escopo do projeto. O `App.jsx` age como roteador raiz com lógica de apenas 15 linhas.

### Por que dados em memória?

A escolha é intencional e documentada. O objetivo do projeto é demonstrar a arquitetura MVC e o fluxo de estado — não infraestrutura de backend. A adição de persistência (localStorage, Supabase, Firebase) é uma evolução natural e independente da estrutura atual.

---

## 🤝 Contribuindo

Contribuições são bem-vindas. Para propor melhorias:

1. Faça um fork do repositório
2. Crie uma branch descritiva: `git checkout -b feature/persistencia-localstorage`
3. Faça seus commits com mensagens claras: `git commit -m "feat: adiciona persistência via localStorage"`
4. Envie para sua branch: `git push origin feature/persistencia-localstorage`
5. Abra um Pull Request descrevendo o que foi feito e por quê

### Ideias de evolução

- [ ] Persistência com `localStorage` para sobreviver ao reload
- [ ] Integração com Supabase para banco de dados real
- [ ] Autenticação com JWT ou OAuth
- [ ] Painel de relatórios com gráficos avançados (Recharts)
- [ ] Sistema de avaliações pós-atendimento
- [ ] Notificações push via Service Worker
- [ ] Modo multi-barbearia (uma conta dono, várias unidades)

---

<div align="center">

Feito com ✂️ e ☕

**[Acessar BarberPro →](https://deploy-entrega2gps.vercel.app/)**

</div>
