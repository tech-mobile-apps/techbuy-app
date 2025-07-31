ℹ️ Este repositório foi publicado por uma conta alternativa por motivos de confidencialidade profissional.

# 🛍️ TechBuy - E-commerce de Produtos Tecnológicos

Aplicativo mobile de e-commerce desenvolvido em React Native. Permite ao usuário explorar produtos tecnológicos, adicionar ao carrinho, realizar pagamentos via cartão ou Pix, escolher endereços de entrega ou retirada, e acompanhar o histórico de pedidos.

---

## 📲 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo Router](https://expo.github.io/router/)
- [json-server](https://github.com/typicode/json-server) (API fake)
- JWT para autenticação

---

## ✨ Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/tech-mobile-apps/techbuy-app.git
   cd techbuy-app
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Inicie o projeto:

   ```bash
   yarn dev
   ```

4. (Opcional) Para rodar a API local:

   > No arquivo `services/api.ts`, descomente a getBaseUrl() local e comente a com o link da render.com:
   - Instale o ngrok em: https://ngrok.com/download

   - Para rodar o ngrok use o comando:

   ```bash
   ngrok http 5001
   ```

   - Copie a url gerada pelo ngrok (algo parecido com: https://63b35b1f6b94.ngrok-free.app)

   - Descomente e substitua a url:

   ```ts
   const getBaseUrl = () => {
     if (Platform.OS === 'web') {
       return 'http://localhost:5001';
     }

     //Substitua pela url gerada pelo ngrok
     return 'https://63b35b1f6b94.ngrok-free.app';
   };
   ```

   - Comente:

   ```ts
   // const getBaseUrl = () => 'https://server-c6lo.onrender.com';
   ```

No terminal digite:

```bash
yarn server
```

---

## 🔐 Autenticação

- Usuários se autenticam via JWT.
- Token é salvo localmente com AsyncStorage e usado nas requisições autenticadas.

---

## 💳 Funcionalidades

- Login e cadastro de usuários
- Listagem de produtos tecnológicos com scroll infinito
- Carrinho de compras com atualização de quantidade
- Tela de perfil com opções de adicionar ou remover endereços
- Escolha de endereço de entrega ou retirada na loja
- Pagamento via cartão de crédito/débito ou Pix
- Histórico de pedidos

---

## 📆 Hospedagem da API Fake

A API está hospedada em:

```
https://server-c6lo.onrender.com
```

---

Confira o documento completo de arquitetura e funcionamento:  
👉 [docs/DocumentacaoTecnica.md](docs/DocumentacaoTecnica.md)

---

ℹ️ Este repositório foi publicado por uma conta alternativa por motivos de confidencialidade profissional.

## 📄 Licença

MIT © Vitor Pereira
