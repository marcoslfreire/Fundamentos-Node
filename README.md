# Fundamentos-Node
# Documentação da API

## Descrição
Esta API é responsável por gerenciar um banco de dados simples de usuários. Ela permite a criação, leitura, atualização e exclusão (CRUD) de registros de usuários. Os dados de cada usuário incluem um identificador único (UUID), nome e e-mail.

A estrutura utiliza o módulo `crypto` do Node.js para gerar IDs únicos e depende de uma implementação personalizada da classe `Database` para armazenar e manipular os dados.

---

## Endpoints

### 1. Listar usuários
**Rota:** `GET /users`

**Descrição:** Retorna uma lista de usuários cadastrados. Suporta a filtragem por nome ou e-mail.

**Query Parameters:**
- `search` (opcional): String para filtrar usuários por nome ou e-mail.

**Exemplo de Requisição:**
```http
GET /users?search=joao
```

**Resposta (200):**
```json
[
  {
    "id": "abc123",
    "name": "João Silva",
    "email": "joao@exemplo.com"
  }
]
```

---

### 2. Criar usuário
**Rota:** `POST /users`

**Descrição:** Cria um novo usuário no banco de dados.

**Body (JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com"
}
```

**Resposta (201):**
```json
{
  "id": "abc123",
  "name": "João Silva",
  "email": "joao@exemplo.com"
}
```

---

### 3. Atualizar usuário
**Rota:** `PUT /users/:id`

**Descrição:** Atualiza as informações de um usuário com base no `id`.

**URL Parameters:**
- `id`: ID do usuário que será atualizado.

**Body (JSON):**
```json
{
  "name": "João Atualizado",
  "email": "joao.atualizado@exemplo.com"
}
```

**Resposta (204):** Sem conteúdo.

---

### 4. Excluir usuário
**Rota:** `DELETE /users/:id`

**Descrição:** Remove um usuário do banco de dados com base no `id`.

**URL Parameters:**
- `id`: ID do usuário que será excluído.

**Resposta (204):** Sem conteúdo.

---

## Notas Adicionais

### Banco de Dados
A API utiliza uma classe `Database` personalizada para as operações de manipulação de dados. As tabelas são referenciadas por nome, como `users`.

### Erros
O código atual não implementa tratamento de erros explícitos. Por exemplo, não há validações para:
- Usuários com o mesmo e-mail.
- IDs inexistentes para atualizações ou exclusões.
- Falta de campos obrigatórios no corpo da requisição.

### Melhorias sugeridas
- Adicionar validação de entradas para evitar duplicações ou dados inválidos.
- Implementar respostas mais descritivas em caso de erros (e.g., 404 para usuários não encontrados).
- Utilizar middlewares para simplificar o processamento de requisições.

