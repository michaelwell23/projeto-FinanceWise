# Gestor de Contas e Despesas Automatizado

Um sistema que permite cadastrar contas mensais, calcular e alertar o usuário sobre vencimentos. O usuário pode configurar orçamentos mensais e receber avisos se o limite estiver próximo de ser excedido. Além disso, o sistema envia lembretes por SMS ou email quando uma conta está perto de vencer.

## Funcionalidades

### Autenticação de Usuário

- **Registro, login e logout**: Gerenciamento de sessão para usuários.
- **Recuperação de senha**: Caso o usuário esqueça sua senha, ele poderá solicitar uma recuperação.

### Gerenciamento de Contas

- **Adicionar uma conta**: Permite adicionar informações sobre contas mensais, como nome, valor, data de vencimento e categoria.
- **Editar e remover contas**: O usuário pode atualizar ou excluir contas.
- **Visualizar contas cadastradas**: Listagem de todas as contas registradas pelo usuário.
- **Alertas de vencimento**: Notificação sobre contas com vencimento próximo.

### Orçamento Mensal

- **Definir um limite de orçamento mensal**: O usuário pode estipular um valor máximo de despesas para o mês.
- **Monitoramento de saldo**: O sistema calcula e monitora o saldo restante do orçamento.
- **Alertas de orçamento excedido**: Notificação quando o orçamento mensal estiver próximo de ser ultrapassado.

### Lembretes

- **Lembretes de vencimento de contas**: Notificações por SMS ou email quando as contas estão próximas do vencimento.
- **Notificações de orçamento**: Avisos quando o orçamento mensal está perto de ser atingido.

### Relatórios

- **Resumo de despesas**: Relatórios com o total de despesas do mês, contas pagas e pendentes.
- **Gráficos de despesas por categoria**: Relatórios visuais que mostram onde o usuário está gastando mais.

## Tecnologias Utilizadas

- **Node.js**: Backend principal para gerenciar o sistema.
- **TypeORM**: ORM para gerenciamento do banco de dados.
- **Express.js**: Framework para rotas e middlewares.
- **JWT**: Autenticação segura para os usuários.
- **Twilio / Email API**: Envio de notificações por SMS ou email.

## Estrutura de Pastas (Arquitetura MVC)

```bash
/src
  /controllers      # Controladores para cada funcionalidade
    authController.ts         # Autenticação de usuário
    billsController.ts        # Gerenciamento de contas
    budgetController.ts       # Gerenciamento de orçamento
    notificationsController.ts # Gerenciamento de lembretes
    reportsController.ts      # Relatórios financeiros

  /models           # Modelos (entidades do banco de dados)
    User.ts         # Modelo de Usuário
    Bill.ts         # Modelo de Conta
    Budget.ts       # Modelo de Orçamento
    Notification.ts # Modelo de Lembrete

  /routes           # Definição das rotas da API
    authRoutes.ts          # Rotas de autenticação
    billsRoutes.ts         # Rotas de contas
    budgetRoutes.ts        # Rotas de orçamento
    notificationsRoutes.ts # Rotas de lembretes
    reportsRoutes.ts       # Rotas de relatórios

  /services         # Lógica de negócio
    billService.ts           # Serviços relacionados às contas
    budgetService.ts         # Serviços relacionados ao orçamento
    notificationService.ts   # Serviços de lembretes
    reportService.ts         # Serviços de relatórios
    authService.ts           # Serviços de autenticação

  /middlewares      # Middlewares para validação, autenticação, etc.
    authMiddleware.ts       # Verificar se o usuário está autenticado

  /config           # Configurações gerais
    db.ts           # Configuração do banco de dados
    email.ts        # Configuração de envio de emails
    sms.ts          # Configuração para envio de SMS

  /utils            # Utilitários e helpers
    notificationUtils.ts # Funções para gerenciamento de notificações

  app.ts            # Inicialização do servidor
  routes.ts         # Definição das rotas principais
```
