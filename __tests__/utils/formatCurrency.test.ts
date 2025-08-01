// Teste da função formatCurrency sem import
const formatCurrency = (value: number) =>
  value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(1000)).toMatch(/R\$\s*1\.000,00/);
    expect(formatCurrency(1234.56)).toMatch(/R\$\s*1\.234,56/);
    expect(formatCurrency(0)).toMatch(/R\$\s*0,00/);
  });

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-1000)).toMatch(/-R\$\s*1\.000,00/);
    expect(formatCurrency(-1234.56)).toMatch(/-R\$\s*1\.234,56/);
  });

  it('should handle decimal numbers correctly', () => {
    expect(formatCurrency(10.5)).toMatch(/R\$\s*10,50/);
    expect(formatCurrency(10.99)).toMatch(/R\$\s*10,99/);
    expect(formatCurrency(10.999)).toMatch(/R\$\s*11,00/); // Arredondamento
  });

  it('should handle large numbers correctly', () => {
    expect(formatCurrency(1000000)).toMatch(/R\$\s*1\.000\.000,00/);
    expect(formatCurrency(1234567.89)).toMatch(/R\$\s*1\.234\.567,89/);
  });

  it('should handle zero correctly', () => {
    expect(formatCurrency(0)).toMatch(/R\$\s*0,00/);
  });
}); 