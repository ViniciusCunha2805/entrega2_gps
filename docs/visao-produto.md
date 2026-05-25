# Visão do Produto - Projeto Barbearia

### O Problema
As barbearias enfrentam dois grandes gargalos financeiros: a ociosidade da mão de obra em dias de menor movimento (como segundas e terças-feiras) e o prejuízo oculto por falta de controle rigoroso de estoque de produtos consumidos ou vendidos durante o atendimento. Além disso, o esquecimento por parte dos clientes ("no-show") gera perda direta de receita.

### Público-Alvo
* **Administradores/Donos de Barbearia:** Buscam otimizar o faturamento e controlar o estoque.
* **Barbeiros/Profissionais:** Precisam gerenciar suas agendas diárias e comissões de forma clara.
* **Clientes Finais:** Buscam praticidade para agendar horários e oportunidade de obter descontos.

### Proposta de Valor
Uma plataforma de gestão de barbearias de alto nível que maximiza o lucro do estabelecimento através de uma engine de precificação dinâmica (descontos automáticos em horários ociosos) e garante a consistência operacional integrando o agendamento diretamente ao controle de inventário em tempo real.

### Funcionalidades Principais (MVP)
1.  Autenticação segura via JWT com controle de acesso baseado em funções (RBAC) para Admin, Barbeiro e Cliente.
2.  Agendamento de serviços online integrado à escolha do profissional e horário.
3.  Engine de Precificação Dinâmica por ociosidade (descontos automáticos de segunda a quinta pela manhã).
4.  Módulo de Inventário e Estoque com bloqueio de vendas atômico e alertas de limite mínimo.

### Diferencial Competitivo
Diferente de agendas comuns de mercado que funcionam como meros blocos de notas digitais, o sistema atua na Gestão de Receita (Revenue Management). Ele protege o fluxo de caixa aplicando imutabilidade financeira (salvando o preço exato cobrado no ato do agendamento) e previne falhas operacionais travando serviços que dependam de produtos zerados no estoque.