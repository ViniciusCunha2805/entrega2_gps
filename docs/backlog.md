# Product Backlog Priorizado - Sprint 01

Abaixo estão listadas as User Stories priorizadas para a fundação técnica do MVP do sistema de Barbearia.

### [US01] Autenticação e Controle de Acesso (RBAC)
* **História:** Como usuário do sistema (Admin, Barbeiro ou Cliente), desejo me autenticar via e-mail e senha para acessar as funcionalidades restritas ao meu perfil de acesso.
* **Critérios de Aceitação:**
    * O sistema deve gerar um token JWT válido no login.
    * Clientes não podem acessar endpoints ou telas de gerenciamento do Administrador.
* **Status:** Em Andamento

### [US02] Cadastro de Serviços e Produtos (Módulo Admin)
* **História:** Como Administrador, desejo cadastrar serviços (nome, preço base, duração) e produtos (nome, preço, descrição) para alimentar o catálogo disponível da barbearia.
* **Critérios de Aceitação:**
    * O preço base dos serviços deve aceitar valores decimais.
    * Cada produto cadastrado deve criar automaticamente uma entrada correspondente na tabela de estoque.
* **Status:** Pendente

### [US03] Motor de Disponibilidade e Agenda do Barbeiro
* **História:** Como Barbeiro, desejo visualizar minha agenda de atendimentos mapeada por dia/semana para me organizar para os atendimentos e evitar conflitos de horários.
* **Critérios de Aceitação:**
    * O sistema deve cruzar a grade de horários do barbeiro com agendamentos já existentes para impedir reservas duplicadas.
    * A listagem deve carregar os horários de forma assíncrona.
* **Status:** Pendente

### [US04] Fluxo de Agendamento Passo a Passo com Desconto Dinâmico
* **História:** Como Cliente, desejo selecionar um serviço, um barbeiro, uma data e um horário disponível para realizar o agendamento visualizando o resumo do valor com desconto aplicado se for um período ocioso.
* **Critérios de Aceitação:**
    * Se o agendamento for feito de Segunda a Quinta-feira, em horários anteriores às 12:00, o sistema deve aplicar automaticamente o interceptor de desconto por ociosidade.
    * O preço final calculado com desconto deve ser persistido de forma imutável no banco de dados para fins de auditoria financeira.
* **Status:** Pendente

### [US05] Controle de Estoque Atômico e Alertas
* **História:** Como Administrador, desejo acompanhar o estoque dos produtos e receber alertas visuais (itens em vermelho) quando um produto atingir o limite mínimo estipulado.
* **Critérios de Aceitação:**
    * Se a quantidade atual de um produto for menor ou igual ao limite mínimo, um alerta deve ser exibido no painel administrativo.
    * Caso um cliente tente agendar um serviço que inclua um produto com estoque zerado, a transação deve falhar e retornar erro de validação (Rollback atômico).
* **Status:** Pendente