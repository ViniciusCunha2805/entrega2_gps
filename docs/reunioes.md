# Registro das Cerimônias Scrum (Alinhamentos do Time)

### Reunião 01: Alinhamento de Escopo e Arquitetura do MVP
* **Data:** 18/05/2026 (Início da Semana 1)
* **Frequência:** Reunião Semanal de Planejamento (Sprint Planning).
* **Principais Decisões:** Definido que focaríamos em um escopo robusto utilizando a stack NestJS + React. Decidimos que a persistência do preço no momento do agendamento é obrigatória para evitar que alterações futuras de preços quebrem o histórico financeiro do banco.
* **Impedimentos Encontrados:** Nenhum.
* **Dificuldades Enfrentadas:** Modelar o relacionamento N:N entre os agendamentos e os produtos consumidos sem gerar redundâncias no banco de dados.

### Reunião 02: Ponto de Controle Intermediário e Lógica de Negócio
* **Data:** 22/05/2026 (Meio da Sprint)
* **Frequência:** Alinhamento rápido de progresso.
* **Principais Decisões:** Ajustado o interceptor do backend focado na inteligência de receita. Ficou determinado que o desconto de ociosidade será disparado estritamente se o "Dia da Semana" for entre Segunda e Quinta-feira E o "Horário" for menor que 12:00.
* **Impedimentos Encontrados:** O time notou que se a transação do banco salvasse o agendamento mas falhasse no estoque, haveria inconsistência.
* **Mudanças Realizadas:** Vinícius alterou o endpoint para aplicar o conceito de Atomicidade (Rollback caso o saldo do estoque chegue a zero), garantindo que a transação falhe por completo se não houver produto.