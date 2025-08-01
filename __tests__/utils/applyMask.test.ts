import { applyMask } from '../../utils/applyMask';

describe('applyMask', () => {
  it('should apply card number mask correctly', () => {
    expect(applyMask('1234567890123456', '9999 9999 9999 9999')).toBe('1234 5678 9012 3456');
    expect(applyMask('123456789012', '9999 9999 9999 9999')).toBe('1234 5678 9012');
  });

  it('should apply expiry date mask correctly', () => {
    expect(applyMask('1225', '99/99')).toBe('12/25');
    expect(applyMask('12', '99/99')).toBe('12');
  });

  it('should apply CVV mask correctly', () => {
    expect(applyMask('123', '999')).toBe('123');
    expect(applyMask('12', '999')).toBe('12');
  });

  it('should apply CPF mask correctly', () => {
    expect(applyMask('12345678901', '999.999.999-99')).toBe('123.456.789-01');
    expect(applyMask('123456789', '999.999.999-99')).toBe('123.456.789');
  });

  it('should handle empty string', () => {
    expect(applyMask('', '9999 9999 9999 9999')).toBe('');
    expect(applyMask('', '99/99')).toBe('');
  });

  it('should handle non-numeric characters', () => {
    expect(applyMask('123abc456def789', '999.999.999-99')).toBe('123.456.789');
    expect(applyMask('12-34-56', '999999')).toBe('123456');
  });

  it('should handle mask with only numbers', () => {
    expect(applyMask('123456', '999999')).toBe('123456');
    expect(applyMask('123', '999999')).toBe('123');
  });

  it('should handle mask with only separators', () => {
    expect(applyMask('123', '---')).toBe('---');
  });

  it('should handle complex masks', () => {
    expect(applyMask('123456789', '(99) 99999-9999')).toBe('(12) 34567-89');
    expect(applyMask('12345678901', '999.999.999-99')).toBe('123.456.789-01');
  });

  it('should handle input longer than mask', () => {
    expect(applyMask('12345678901234567890', '9999 9999 9999 9999')).toBe('1234 5678 9012 3456');
  });
}); 