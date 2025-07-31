# 📘️ Documentação Técnica - TechBuy

## 🧠 Contexto

O app simula uma experiência real de compra de eletrônicos via mobile, permitindo ao usuário navegar, comprar, pagar e gerenciar seus pedidos. Criado como desafio técnico.

---

## ⚙️ Tecnologias-chave

- **React Native + Expo**: base do app
- **Expo Router**: estrutura de rotas por pastas
- **React Native Paper**: UI rápida e acessível
- **json-server**: simulação de API REST
- **JWT**: autenticação de usuários

---

## 🔄 Fluxos

### 1. **Autenticação**

- Modal de login/cadastro aparece ao tentar executar uma ação na qual é preciso estar logado
- Após login bem-sucedido, token JWT é salvo e usado nas chamadas

### 2. **Carrinho**

- Produtos adicionados com botão "Adicionar"
- Pode-se aumentar/reduzir a quantidade
- Valor total é recalculado

### 3. **Endereços**

- Usuário pode:
  - Cadastrar novos endereços (na aba Perfil)
  - Escolher retirada na loja (endereços fixos)

- Tela de checkout permite selecionar

### 4. **Pagamento**

- Duas opções:
  - Cartão (débito ou crédito)
  - Pix (simulado)

- Após pagamento, pedido é criado na lista de histórico

### 5. **Pedidos**

- Lista de pedidos do usuário com:
  - Data, status e valor
  - Acesso via aba inferior (tab)

### 6. **Busca e Filtragem de Produtos**

- Campo de busca por nome de produto
- Filtros por categoria disponíveis na tela inicial

---

## 🔐 Autenticação

- JWT salvo via SecureStore (ou AsyncStorage)
- Interceptor do Axios injeta token nas requests

---

## 🗐 Endpoints principais (API Fake)

```http
GET /products
POST /login
POST /users
GET /orders?userId={id}
POST /orders
GET /addresses?userId={id}
POST /addresses
```

---

## 📋 Comandos úteis

```bash
# Rodar o app
npx expo start

# Rodar API local
json-server --watch db.json --port 5001

# Rodar testes (depois de configurar)
yarn test
```

---

## ✨ Sugestão de melhorias futuras

- Integração com Firebase ou backend real
- Testes automatizados mais robustos
- Avaliações e comentários
- Upload de imagem de perfil e personalização
