<h1>Desafio 1 - Ignite Nodejs</h1>
<h2>Sobre o desafio: </h2>
<p>Uma api para gerenciamento de tarefas(to-dos), </p>
<p>onde será possível o CRUD completo de usuarios e tarefas.</p>

<h3>Oque foi utilizado: </h3>
<ul>
  <li><strong>Express</strong> - Para o roteamento;</li>
  <li><strong>Jest</strong> - Para testes automatizados;</li>
  <li><strong>Insomnia</strong> - Para testar e utilizar as rotas.</li>
</ul>

<span>Link do desafio no notion</span> -> <a href="https://www.notion.so/Desafio-01-Conceitos-do-Node-js-59ccb235aecd43a6a06bf09a24e7ede8#dbed5b2fcb0a4b50a41f88b16954a360">Link</a>

<hr>

Para utilizar a API é bem simples
1. Tenha o node baixado em seu computador;
2. Dê um git clone nesse repositório;
3. Acesse a pasta do projeto com seu terminal;
4. Digite o comando `NPM INSTALL` ou `YARN`.

<hr>

### Criação de usuário [POST]

| Parâmetro | Descrição |
|---|---|
| `name` | Nome do usuário. |
| `username` | Apelido, ou nome de usuário para autenticação. |


+ Request (application/json)

    + Body

            {
                "name": "Wagner Oliveira",
                "username": "Wagner477",

            }

+ Response 200 (application/json)

    + Body

            {
              "id": "e78f8239-ef17-4e32-9b17-fa9e48e25bee",
              "name": "Wagner Oliveira",
              "username": "Wagner477",
              "todos": []
            }
            
            
