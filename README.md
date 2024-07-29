# Plataforma de Networking Profissional Baseada em Habilidades

## Sobre a Aplicação

A Plataforma de Networking Profissional Baseada em Habilidades é uma aplicação projetada para conectar profissionais que desejam aprender ou ensinar habilidades específicas. Através desta plataforma, os usuários podem criar perfis, listar suas habilidades e buscar outras pessoas com interesses semelhantes para trocar conhecimento e experiências. O objetivo é promover o networking e a colaboração entre profissionais de diferentes áreas, contribuindo para o crescimento pessoal e profissional de cada usuário.

## Intenção do Projeto

A intenção deste projeto é abordar a crescente demanda por aprendizado colaborativo e troca de habilidades no ambiente profissional. Em um mundo em constante evolução, a habilidade de aprender e ensinar é fundamental para o desenvolvimento de carreiras e a adaptação a novas tendências. Esta plataforma não apenas facilita a conexão entre profissionais, mas também incentiva um ambiente de apoio mútuo, onde cada um pode contribuir para o crescimento do outro.

### Principais Funcionalidades

- **Cadastro de Usuários:** Os usuários podem se registrar com informações básicas e habilidades que desejam aprender ou ensinar.
- **Autenticação Segura:** A plataforma garante a segurança dos dados do usuário com autenticação via JWT e criptografia de senhas.
- **Gerenciamento de Perfis:** Usuários podem editar seus perfis e gerenciar suas habilidades.
- **Busca de Usuários:** Funcionalidade de busca que permite encontrar outros usuários com base em habilidades específicas.
- **Conexões e Mensagens:** Sistema para enviar convites de conexão e mensagens diretas entre usuários.

## Tecnologias Utilizadas

- **Backend:**
  - Node.js com Express para gerenciamento de perfis e conexões.
  - Go para lógica de correspondência baseada em habilidades.
  - TypeORM para interação com o banco de dados PostgreSQL.
  - Bcrypt para criptografia de senhas.

- **Banco de Dados:**
  - PostgreSQL, gerenciado via Docker Compose.

## Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
