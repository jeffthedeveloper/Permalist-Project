# Permalist Project

`Permalist` é uma aplicação web de lista de tarefas (to-do list) desenvolvida como um projeto capstone. A aplicação permite que os usuários gerenciem suas tarefas, que são armazenadas persistentemente em um banco de dados PostgreSQL.

Este projeto utiliza um stack baseado em Node.js, com Express para o servidor, EJS para renderização de templates do lado do servidor e a biblioteca `pg` para comunicação com o banco de dados PostgreSQL.

## Funcionalidades

A aplicação implementa funcionalidades CRUD (Create, Read, Update, Delete) completas para o gerenciamento de tarefas, conforme definido em `index.js`:

  * **Adicionar Tarefas:** Criação de novos itens com título, tempo estimado, prioridade e categoria.
  * **Editar Tarefas:** Atualização dos detalhes de uma tarefa existente (título, tempo, prioridade, categoria).
  * **Marcar como Concluída:** Atualiza o status de uma tarefa para `concluída`.
  * **Excluir Tarefas:** Remoção permanente de uma tarefa do banco de dados.
  * **Visualizar e Filtrar:** A visualização principal exibe todas as tarefas, com a opção de filtrar por categoria ou ver todos os itens.

## Tecnologias Utilizadas

  * **Backend:** Node.js, Express.js
  * **Frontend:** EJS (Embedded JavaScript), HTML5, CSS3
  * **Banco de Dados:** PostgreSQL (com a biblioteca `pg`)
  * **Middleware:** body-parser

## Configuração do Banco de Dados

O arquivo `queries.sql` fornecido contém um schema inicial básico. No entanto, a lógica principal da aplicação em `index.js` espera uma estrutura de tabela mais completa para suportar todas as funcionalidades (como prioridade, categoria, etc.).

Para o funcionamento correto de todas as funcionalidades, utilize o seguinte comando SQL para criar sua tabela no banco de dados (ex: `permalist`):

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  estimated_time VARCHAR(50),
  priority VARCHAR(20),
  category VARCHAR(50),
  completed BOOLEAN DEFAULT false
);
```

## Como Executar o Projeto

1.  **Clone o Repositório:**

    ```bash
    git clone <url-do-repositorio>
    cd 8.6\ Permalist\ Project
    ```

2.  **Instale as Dependências:**

    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**

      * Certifique-se de que o PostgreSQL está em execução.
      * Crie um banco de dados (ex: `permalist`).
      * Execute o script SQL da seção "Configuração do Banco de Dados" acima para criar a tabela `items`.

4.  **Atualize as Credenciais do Banco:**

      * Abra o arquivo `index.js`.
      * Modifique o objeto de configuração `db` (linhas 8-14) com seu usuário, host, nome do banco, senha e porta do PostgreSQL:
        ```javascript
        const db = new pg.Client({
          user: "seu_usuario_postgres",
          host: "localhost",
          database: "permalist",
          password: "sua_senha_postgres",
          port: 5432,
        });
        ```

5.  **Inicie o Servidor:**
    O script `start` já está configurado no `package.json`.

    ```bash
    npm start
    ```

6.  **Acesse a Aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`.
