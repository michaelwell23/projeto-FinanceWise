<h1 align="center">
  <img alt="mindBalance" title="mindBalance" src="./.github/logo.png" width="400px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/usuario/mindBalance?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/usuario/mindBalance/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/usuario/mindBalance?style=social">
  </a>
</p>

<p align="center">
  <a href="#como-instalar">Como instalar?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#documentação-das-rotas">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

Backend da aplicação **mindBalance**, desenvolvido em **Node.js** com **Express**, estruturado em uma API RESTful.

---

### Ferramentas utilizadas na aplicação:

- [TypeORM](https://typeorm.io/) - ORM para interação com o banco de dados.
- [Yup](https://github.com/jquense/yup) - Validação de dados de entrada.
- [JWT](https://www.npmjs.com/package/jsonwebtoken) - Gerenciamento de autenticação por token.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografia de senhas.
- [DotEnv](https://github.com/motdotla/dotenv) - Configuração de variáveis de ambiente.
- [Nodemailer](https://nodemailer.com/) - Envio de emails para notificações e comunicações.

### Banco de dados da aplicação:

- PostgreSQL

### Ferramentas para o ambiente de desenvolvimento:

- [Docker](https://www.docker.com/) - Gerenciamento de containers.
- [ESLint](https://eslint.org/) - Padronização e detecção de erros no código.
- [Prettier](https://prettier.io/) - Formatação consistente do código.
- [Insomnia](https://insomnia.rest/) - Teste e depuração das rotas da API.

---

## Como instalar?

Antes de tudo, instale o [Node.js](https://nodejs.org/en/) e o [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/).

1. Clone o repositório e entre na pasta `server`:

```bash
$ git clone https://github.com/usuario/mindBalance.git
$ cd mindBalance/server
```

2. Instale as dependências do projeto:

```bash
$ yarn install
```

3. Configure as variáveis de ambiente, criando um arquivo `.env` baseado no modelo `.env.example`.

4. Rode as migrações do banco de dados:

```bash
$ yarn typeorm migration:run
```

5. Inicie a aplicação:

```bash
$ yarn dev
```

6. Utilize o [Insomnia](https://insomnia.rest/) ou outra ferramenta de sua preferência para testar as rotas da API.

---

## Documentação das rotas

### Autenticação

- `POST /auth/register` - Registro de um novo usuário.
- `POST /auth/login` - Login e geração de token JWT.

### Emoções e Sugestões

- `POST /emotions` - Registra uma emoção enviada pelo usuário.
- `GET /emotions` - Lista todas as emoções registradas pelo usuário.
- `POST /suggestions` - Gera uma sugestão com base na emoção registrada.
- `GET /suggestions` - Lista todas as sugestões geradas para o usuário.

### Gerenciamento de Emoções

- `DELETE /emotions/:id` - Remove uma emoção registrada.
- `PUT /emotions/:id` - Atualiza uma emoção existente.

---

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/usuario/mindBalance/blob/master/LICENSE) para mais detalhes.

---

Feito com :purple_heart: por [Seu Nome](https://github.com/seuusuario)
