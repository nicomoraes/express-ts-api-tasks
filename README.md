
# Express API | Node.js + TypeScript

API simples que possibilita a criação e autenticação  de usuário e CRUD de tarefas.



## Documentação da API

A seguir estão os endpoints disponíveis na API:

## Tarefas

### Criar uma tarefa

-   **Rota:** `POST tasks/create`
-   **Descrição:** Cria uma nova tarefa.
-   **Parâmetros do corpo (body parameters):**
    -   `userId`: ID do usuário associado à tarefa.
    -   Outros campos necessários para criar a tarefa.
-   **Cabeçalhos obrigatórios:**
    -   `Authorization`: Token JWT válido.
-   **Resposta de sucesso:**
    -   Código: 201 (Created)
    -   Corpo: Objeto contendo os dados da tarefa criada.

### Obter uma tarefa

-   **Rota:** `GET tasks/get/:id`
-   **Descrição:** Obtém os detalhes de uma tarefa pelo ID.
-   **Parâmetros da URL (URL parameters):**
    -   `id`: ID da tarefa.
-   **Cabeçalhos obrigatórios:**
    -   `Authorization`: Token JWT válido.
-   **Resposta de sucesso:**
    -   Código: 200 (OK)
    -   Corpo: Objeto contendo os detalhes da tarefa.

### Obter todas as tarefas

-   **Rota:** `GET tasks/getAll`
-   **Descrição:** Obtém todas as tarefas associadas a um usuário.
-   **Parâmetros do corpo (body parameters):**
    -   `userId`: ID do usuário.
-   **Cabeçalhos obrigatórios:**
    -   `Authorization`: Token JWT válido.
-   **Resposta de sucesso:**
    -   Código: 200 (OK)
    -   Corpo: Array contendo as tarefas encontradas.

### Atualizar uma tarefa

-   **Rota:** `PATCH tasks/update/:id`
-   **Descrição:** Atualiza os dados de uma tarefa pelo ID.
-   **Parâmetros da URL (URL parameters):**
    -   `id`: ID da tarefa.
-   **Parâmetros do corpo (body parameters):**
    -   Campos opcionais que podem ser atualizados na tarefa.
-   **Cabeçalhos obrigatórios:**
    -   `Authorization`: Token JWT válido.
-   **Resposta de sucesso:**
    -   Código: 200 (OK)
    -   Corpo: Objeto contendo os dados atualizados da tarefa.

### Remover uma tarefa

-   **Rota:** `DELETE tasks/remove/:id`
-   **Descrição:** Remove uma tarefa pelo ID.
-   **Parâmetros da URL (URL parameters):**
    -   `id`: ID da tarefa.
-   **Cabeçalhos obrigatórios:**
    -   `Authorization`: Token JWT válido.

---
## Usuários

### Criar usuário

Cria um novo usuário.

-   **Rota:** `POST /create`
-   **Parâmetros do corpo (body parameters):**
    -   `username`: Nome de usuário.
    -   `password`: Senha do usuário.
-   **Resposta de sucesso:**
    -   Código: 201 (Created)
    -   Corpo: "Usuário criado com sucesso!"
-   **Possíveis erros:**
    -   Código: 409 (Conflict)
        -   Descrição: O usuário já existe.

### Login do usuário

Realiza o login do usuário.

-   **Rota:** `POST /login`
-   **Parâmetros do corpo (body parameters):**
    -   `username`: Nome de usuário.
    -   `password`: Senha do usuário.
-   **Resposta de sucesso:**
    -   Código: 200 (OK)
    -   Corpo: Objeto contendo o token de autenticação e o token de atualização.
        
        -   Exemplo de corpo:

        ```json
        {
          "token": "token_de_autenticação",
          "refreshToken": "token_de_atualização"
        } 
        ```
        
-   **Possíveis erros:**
    -   Código: 404 (Not Found)
        -   Descrição: O usuário não existe.
    -   Código: 401 (Unauthorized)
        -   Descrição: Nome de usuário ou senha incorreta.## Dependências

O projeto depende das seguintes bibliotecas:

-   `@prisma/client`: Cliente do Prisma para interagir com o banco de dados.
-   `bcrypt`: Biblioteca para hash de senhas.
-   `cors`: Middleware para habilitar o CORS (Cross-Origin Resource Sharing).
-   `dayjs`: Biblioteca para manipulação de datas.
-   `dotenv`: Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.
-   `express`: Framework web para o Node.js.
-   `express-async-errors`: Middleware para lidar com erros assíncronos no Express.
-   `jsonwebtoken`: Biblioteca para geração e validação de tokens JWT.
-   `zod`: Biblioteca para validação de dados.

### Dependências de desenvolvimento (Principais)

-   `prisma`: Ferramenta de linha de comando para o Prisma.
-   `tsconfig-paths`: Plugin para resolver caminhos de importação com aliases definidos no `tsconfig.json`.
-   `tsup`: Empacotador TypeScript para criar o pacote final do projeto.
-   `tsx`: Script auxiliar para execução do TypeScript.
-   `typescript`: Linguagem de programação TypeScript.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT`

`JWT_PRIVATE_KEY`

`ACCESS_TOKEN_EXPIRES_IN`

`REFRESH_TOKEN_EXPIRES_IN`

`DATABASE_URL`


## Rodando localmente

Certifique-se de ter o Node.js e o TypeScript instalados em sua máquina.

1.  Clone este repositório: `git clone https://github.com/nicomoraes/express-ts-api-tasks.git`
2.  Acesse o diretório do projeto: `cd express-ts-api-tasks`
3.  Instale as dependências: `npm install`
4.  Compile o código TypeScript: `npm run build`
5.  Inicie o servidor: `npm start`
6.  Acesse a API em: `http://localhost:8000`