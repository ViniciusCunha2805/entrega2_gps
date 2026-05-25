# Planejamento da Sprint 01 (Duração: 14 dias)

### 1. Objetivo da Sprint
Estabelecer a fundação robusta do sistema de barbearia, entregando o fluxo completo de agendamento (com inteligência de precificação dinâmica por ociosidade), o controle de acesso por níveis (RBAC) e o módulo de inventário integrado com bloqueio de vendas automáticas.

### 2. Histórias Selecionadas do Backlog
* [US01] Autenticação e Controle de Acesso (RBAC)
* [US02] Cadastro de Serviços e Produtos (Módulo Admin)
* [US03] Motor de Disponibilidade e Agenda do Barbeiro
* [US04] Fluxo de Agendamento Passo a Passo com Desconto Dinâmico
* [US05] Controle de Estoque Atômico e Alertas

### 3. Justificativa das Escolhas
Selecionamos essas histórias porque elas compõem o núcleo de valor e os principais diferenciais do projeto. Focar na arquitetura de segurança (JWT/RBAC) e na lógica complexa (precificação dinâmica e atomicidade de estoque) logo no início mitiga riscos técnicos futuros e garante a consistência dos dados financeiros desde o dia um.

### 4. Divisão de Responsabilidades (Frentes de Trabalho)
Para garantir eficiência nos 14 dias de desenvolvimento, dividimos o time em papéis estratégicos:

* **Vinícius Cunha (Desenvolvimento Core & Deploy):**
    * Configuração do ambiente do projeto (NestJS, Docker para PostgreSQL e Prisma ORM).
    * Criação das entidades de banco de dados (User, Service, Product, Stock, Appointment).
    * Desenvolvimento do Backend (Engine de disponibilidade, Auth JWT/RBAC e interceptor de precificação dinâmica).
    * Deploy online da aplicação.
* **Douglas Bolis (Gestão Ágil, Planejamento & Métricas):**
    * Criação e manutenção do quadro Kanban no GitHub Projects.
    * Documentação dos artefatos de processo (`visao-produto.md`, `backlog.md`, `sprint.md`, `reunioes.md`, `metricas.md`).
    * Coleta de dados e gargalos ao fim da sprint.
* **Lucas Mariani (Qualidade, Testes & Apresentação):**
    * Criação dos cenários de teste unitários (validação da lógica de desconto de seg-qui e validação de erro de estoque zero HTTP 400/422).
    * Desenvolvimento do Frontend em React (Consumo assíncrono da API via React Query e estilização com Tailwind CSS).
    * Gravação do vídeo de demonstração do MVP (5 a 10 minutos) e fechamento do relatório final em PDF.