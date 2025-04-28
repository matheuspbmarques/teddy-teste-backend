# Teddy Teste Backend

Este é um teste técnico para desenvolvedor bakc-end, com o objetivo de criar um encurtador de URL que poderá ser utilizado com ou sem autenticação, aonde o usuário com autenticação poderá lista, atulizar e excluir a URL encurtada.

A ideia nesse projeto é trabalhar com a maioria das ferramentas disponibilidades pelo NestJS e seus padrões, garantindo um projeto fácil de ler e entender cada camada da aplicação.

## Necessário:
- [Docker](https://www.docker.com/)

## Configuração

Dentro do projeto você tem um arquivo `.env.example` no qual você deve renomear para `.env`. Apenas com essa alteração você já pode iniciar o projeto.

## Iniciar o projeto

Para iniciar o projeto, você deverar ter o [Docker](https://www.docker.com/) instalado em sua máquina para poder rodar os seguintes comandos:

```bash
docker compose up -d
```

O comando irá iniciar um container de banco de dados Postgres e o projeto back-end.

Após a finalização dos processos, o container de bakc-end e banco de dados estarão rodando, e você poderar testar tudo acessando http://localhost:3000/api

## Melhorias

- **Testes Unitários**: para garantir que cada funcionalidade do sistema esteja funcionando devidamente;
- **Testes E2E**: para garantir que todas as rotas estão funcionando de acordo de ponta a ponta.
- **Logs**: para ajudar a encontrar possíveis erros no sistema de uma forma mais rápida.