# **Documentação do Projeto Backend - Bloom**

## 1. **Introdução**

### 1.1. **Descrição do Projeto**

Bloom é uma rede social projetada para ajudar usuários a melhorar seu foco e produtividade. Este projeto representa o backend da aplicação, responsável por gerenciar autenticação, conexões ao banco de dados e funcionalidades relacionadas ao sistema de usuários e postagens.

### 1.2. **Objetivo**

Fornecer uma API segura e escalável para sustentar as operações da rede social, incluindo:

- Cadastro e autenticação de usuários.
- Publicação e gerenciamento de postagens relacionadas à produtividade.
- Ferramentas para monitorar e melhorar o foco.

### 1.3. **Tecnologias Utilizadas**

- **Linguagem:** TypeScript
- **Framework:** Express.js
- **Banco de Dados:** MongoDB
- **Autenticação:** JWT (JSON Web Token)
- **Outras Dependências:** Mongoose, dotenv

---

## 2. **Configuração do Ambiente**

### 2.1. **Requisitos**

- **Node.js** (v16 ou superior)
- **NPM** ou **Yarn**
- **MongoDB** (v4 ou superior)

### 2.2. **Instalação**

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd bloom-backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### 2.3. **Configuração de Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
BD_CONEXAO=<STRING_DE_CONEXAO_DO_MONGO>
SEGREDO=<SEGREDO_DO_JWT>
```

### 2.4. **Execução**

Para rodar o servidor:

```bash
npm start
```

Para rodar no modo de desenvolvimento:

```bash
npm run dev
```

---

## 3. **Arquitetura**

### 3.1. **Estrutura de Pastas**

```bash
src/
├── bd/
├── controladores/
├── middleware/
├── modelos/
├── rotas/
├── utils/
└── types/
```

### 3.2. **Fluxo de Dados**

1. O backend conecta-se ao banco de dados MongoDB utilizando Mongoose.
2. Middleware de autenticação com `verificaToken.ts` protege rotas.
3. Funções assíncronas são centralizadas com `tryCatch.ts` para tratamento de erros.

---

## 4. **Endpoints da API**

### 4.1. **Usuários**

- **`POST /novousuario/post`**  
  Cria um novo usuário.  
  **Body:**
  ```json
  {
    "nome": "string",
    "email": "string",
    "senha": "string"
  }
  ```
- **`POST /autenticacao/usuarios`**  
  Realiza login e retorna o token JWT.

- **`PATCH /usuarios/update`**  
  Atualiza informações do usuário autenticado.

- **`DELETE /usuarios/delete`**  
  Deleta o usuário autenticado.

- **`GET /usuarios/getUsuario`**  
  Retorna informações do usuário autenticado.

- **`PATCH /usuarios/addAmigo`**  
  Adiciona um amigo à lista de amigos do usuário.

- **`PATCH /usuarios/removeAmigo`**  
  Remove um amigo da lista de amigos do usuário.

- **`PATCH /usuarios/addTarefaGrupo`**  
  Adiciona uma tarefa em grupo à lista do usuário.

- **`PATCH /usuarios/removeTarefaGrupo`**  
  Remove uma tarefa em grupo da lista do usuário.

---

### 4.2. **Tarefas**

- **`POST /tarefas/post`**  
  Cria uma nova tarefa.

- **`PATCH /tarefas/update/:id`**  
  Atualiza informações de uma tarefa existente.

- **`DELETE /tarefas/delete/:id`**  
  Deleta uma tarefa.

- **`GET /tarefas/getTasks`**  
  Retorna todas as tarefas do usuário autenticado.

- **`PATCH /tarefas/updateStatus/:id`**  
  Atualiza o status de uma tarefa para "em andamento".

- **`GET /tarefas/getTarefasGrupo`**  
  Retorna as tarefas em grupo associadas ao usuário.

---

### 4.3. **Notificações**

- **`POST /notificacoes/post`**  
  Cria uma nova notificação.

- **`DELETE /notificacoes/delete/:id`**  
  Deleta uma notificação.

- **`GET /notificacoes/getNotifications`**  
  Retorna todas as notificações do usuário autenticado.

- **`PATCH /notificacoes/updateStatus/:id`**  
  Atualiza o status de uma notificação.

---

## 5. **Modelos de Dados**

### 5.1. **Usuário**

```typescript
{
  "nome": "string",
  "email": "string",
  "senha": "string",
  "experiencia": "number",
  "amigos": [
    {
      "usuario_id": "ObjectId",
      "nome": "string"
    }
  ],
  "tarefasEmGrupo": [
    {
      "tarefa_id": "ObjectId"
    }
  ]
}
```

### 5.2. **Tarefa**

```typescript
{
  "titulo": "string",
  "descricao": "string",
  "prazo": "Date",
  "usuario_id": "ObjectId",
  "em_andamento": "boolean",
  "membros": [
    {
      "usuario_id": "ObjectId",
      "nome_usuario": "string",
      "tempo_foco": "number"
    }
  ]
}
```

### 5.3. **Notificação**

```typescript
{
  "titulo": "string",
  "mensagem": "string",
  "usuario_id": "ObjectId",
  "lido": "boolean"
}
```

---