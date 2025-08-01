import { validaDigitosCPF } from '../../utils/validators';

describe('validaDigitosCPF', () => {
  it('should validate valid CPF numbers', () => {
    expect(validaDigitosCPF('12345678909')).toBe(true);
    expect(validaDigitosCPF('11144477735')).toBe(true);
    expect(validaDigitosCPF('52998224725')).toBe(true);
  });

  it('should reject invalid CPF numbers', () => {
    expect(validaDigitosCPF('12345678901')).toBe(false);
    expect(validaDigitosCPF('12345678900')).toBe(false);
    expect(validaDigitosCPF('12345678910')).toBe(false);
  });

  it('should reject CPF with wrong length', () => {
    expect(validaDigitosCPF('123456789')).toBe(false);
    expect(validaDigitosCPF('123456789012')).toBe(false);
  });

  it('should reject CPF with non-numeric characters', () => {
    expect(validaDigitosCPF('123.456.789-09')).toBe(false);
    expect(validaDigitosCPF('abc123def45')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(validaDigitosCPF('')).toBe(false);
    expect(validaDigitosCPF('1234567890')).toBe(false);
    expect(validaDigitosCPF('123456789012')).toBe(false);
  });
}); 