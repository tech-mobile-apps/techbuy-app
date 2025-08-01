# 📦 Instalação das Dependências de Teste

Este arquivo contém instruções para instalar as dependências necessárias para executar os testes automatizados.

## 🚀 Instalação Automática

Execute o script de setup:

```bash
node setup-tests.js
```

## 🔧 Instalação Manual

### Usando Yarn (Recomendado)

```bash
yarn add --dev @testing-library/react-native @testing-library/jest-native jest jest-expo @types/jest
```

### Usando NPM

```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest jest-expo @types/jest
```

## 📋 Dependências Necessárias

- `@testing-library/react-native` - Biblioteca de teste para React Native
- `@testing-library/jest-native` - Matchers adicionais para Jest
- `jest` - Framework de teste
- `jest-expo` - Preset do Jest para projetos Expo
- `@types/jest` - Tipos TypeScript para Jest

## ✅ Verificação

Após a instalação, verifique se os seguintes arquivos existem:

- ✅ `jest.config.js` - Configuração do Jest
- ✅ `jest.setup.js` - Setup dos testes
- ✅ `__tests__/` - Diretório com os testes
- ✅ `package.json` com scripts de teste

## 🧪 Executar Testes

```bash
# Executar todos os testes
yarn test

# Executar em modo watch
yarn test:watch

# Executar com cobertura
yarn test:coverage
```

## 🔍 Troubleshooting

### Erro de Política de Execução (Windows)

Se você encontrar erro de política de execução no PowerShell:

1. Abra o PowerShell como administrador
2. Execute: `Set-ExecutionPolicy RemoteSigned`
3. Confirme com "Y"

### Erro de Módulos não Encontrados

Se houver erros de módulos não encontrados:

1. Limpe o cache: `yarn cache clean`
2. Delete node_modules: `rm -rf node_modules`
3. Reinstale: `yarn install`

### Erro de Jest

Se o Jest não estiver funcionando:

1. Verifique se todas as dependências foram instaladas
2. Execute: `yarn jest --version`
3. Se necessário, reinstale: `yarn add --dev jest jest-expo`

## 📖 Documentação

Para mais informações sobre os testes, consulte:

- [`__tests__/README.md`](__tests__/README.md) - Documentação completa dos testes
- [`__tests__/examples/`](__tests__/examples/) - Exemplos de testes
