# Métricas Simples do Projeto - Sprint 01

Este documento apresenta os indicadores de desempenho, progresso e gargalos observados pelo time durante a execução da primeira Sprint do projeto da Barbearia.

### 📊 1. Resumo de Atividades (Burndown Simplificado)
* [cite_start]**Total de User Stories Planejadas:** 5 histórias[cite: 158].
* **Total de User Stories Concluídas:** 3 histórias (Previsão até o fim da sprint).
* **Total de User Stories Pendentes/Em Revisão:** 2 histórias.
* **Quantidade de Tarefas Técnicas Totais (Subtarefas):** 12 tarefas.
  * Concluídas: 8 tarefas.
  * Em andamento / Teste: 4 tarefas.

### ⏱️ 2. Tempo Médio de Conclusão (Lead Time Estimado)
* **Configuração de Ambiente e Banco de Dados (Vinícius):** 3 dias.
* **Desenvolvimento de Endpoints de Autenticação e RBAC (Vinícius):** 2 dias.
* **Criação da Interface de Agendamento (Lucas):** 4 dias.
* **Tempo Médio Geral por História de Usuário:** Aproximadamente 3 a 4 dias do início do desenvolvimento até o envio para a branch de teste.

### 🚗 3. Principais Gargalos Encontrados
> **Nota de Edição (Douglas):** Modifique este ponto caso o grupo tenha enfrentado outros problemas técnicos reais.
* [cite_start]**Gargalo Técnico na Engine de Estoque:** A implementação da atomicidade da transação no backend (garantir o Rollback e travar o agendamento se o produto estivesse zerado no estoque) exigiu mais tempo de pesquisa no Prisma ORM do que o planejado originalmente, gerando um atraso de 2 dias no início da integração com o frontend[cite: 178, 206, 232].
* [cite_start]**Ajuste de Comunicação Assíncrona:** A sincronização dos estados de erro do backend (como tratar o erro HTTP 400/422 de horário ocupado ou produto indisponível) no React Query gerou refatoração nas telas criadas pelo Lucas[cite: 162, 220, 242].

### ⚡ 4. Velocidade da Sprint (Simplificada)
A velocidade do grupo para esta Sprint 01 foi calculada com base na entrega das fundações do software.
* [cite_start]**Entregas de Valor Realizadas:** Setup completo da infraestrutura modular [cite: 161][cite_start], banco de dados PostgreSQL rodando com Prisma [cite: 163, 178][cite_start], fluxo de autenticação JWT seguro [cite: 164, 179] [cite_start]e telas base do fluxo passo a passo do cliente[cite: 208].
* [cite_start]**Capacidade de Entrega Estabilizada:** O time demonstrou capacidade de absorver e finalizar a arquitetura base do backend e as telas principais do frontend dentro do ciclo de 14 dias [cite: 158][cite_start], deixando refinamentos de segurança e testes automatizados de ociosidade para a abertura do próximo ciclo[cite: 173, 241, 243].