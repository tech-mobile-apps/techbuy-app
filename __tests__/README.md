# Testes Automatizados

Este diretório contém todos os testes automatizados do projeto usando Jest e React Native Testing Library.

## Estrutura dos Testes

```
__tests__/
├── contexts/              # Testes dos contextos React
│   └── CartContext.test.tsx
├── hooks/                 # Testes dos hooks personalizados
│   └── usePaymentForm.test.ts
└── utils/                 # Testes das funções utilitárias
    ├── applyMask.test.ts
    ├── formatCurrency.test.ts
    └── validators.test.ts
```

## Como Executar os Testes

### Executar todos os testes

```bash
yarn test
```

### Executar testes em modo watch

```bash
yarn test:watch
```

### Executar testes com cobertura

```bash
yarn test:coverage
```

### Executar testes específicos

```bash
# Testes de utilitários
yarn test utils

# Testes de hooks
yarn test hooks

# Testes de contextos
yarn test contexts
```

## Tipos de Testes

### 1. Testes Unitários

- **Utilitários**: Funções puras como `formatCurrency`, `applyMask`, `validators`
- **Hooks**: Lógica de estado e comportamento como `usePaymentForm`
- **Contextos**: Gerenciamento de estado global como `CartContext`

## Configuração

### Jest Setup (`jest.setup.js`)

- Configuração de mocks para bibliotecas externas
- Mock do AsyncStorage, expo-constants, axios, etc.
- Configuração global para testes

### Jest Config (`jest.config.js`)

- Preset para Expo/React Native
- Configuração de transformações
- Padrões de arquivos para cobertura

## Mocks Importantes

### Bibliotecas Externas

- `@react-native-async-storage/async-storage`
- `expo-constants`
- `expo-linking`
- `expo-clipboard`
- `expo-haptics`
- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-svg`
- `uuid`
- `axios`

### Navegação

- `expo-router` para testar navegação entre telas

## Boas Práticas

1. **Isolamento**: Cada teste deve ser independente
2. **Limpeza**: Usar `beforeEach` para limpar mocks
3. **Descrições claras**: Nomes de testes descritivos
4. **Cobertura**: Almejar alta cobertura de código
5. **Mocks realistas**: Simular comportamento real das dependências

## Exemplos de Testes

### Teste de Função Utilitária

```typescript
describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(1000)).toBe('R$ 1.000,00');
  });
});
```

### Teste de Hook

```typescript
describe('usePaymentForm', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePaymentForm());
    expect(result.current.method).toBe('credit_card');
  });
});
```

## Cobertura de Testes

Os testes cobrem:

- ✅ Funções utilitárias (100%)
- ✅ Hooks personalizados
- ✅ Contextos React

## Troubleshooting

### Erro de Mock

Se encontrar erros relacionados a mocks, verifique se o arquivo `jest.setup.js` está configurado corretamente.

### Erro de Navegação

Para testes que envolvem navegação, certifique-se de que o `expo-router` está mockado adequadamente.

### Erro de AsyncStorage

O AsyncStorage é mockado automaticamente. Se houver problemas, verifique se o mock está funcionando corretamente.
