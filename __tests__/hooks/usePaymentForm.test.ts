import { renderHook, act } from '@testing-library/react-native';
import { usePaymentForm } from '../../hooks/usePaymentForm';

describe('usePaymentForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePaymentForm());

    expect(result.current.method).toBe('credit_card');
    expect(result.current.cardNumber).toBe('');
    expect(result.current.expiryDate).toBe('');
    expect(result.current.cvv).toBe('');
    expect(result.current.cpf).toBe('');
    expect(result.current.errors).toEqual({
      cardNumberError: '',
      expiryError: '',
      cvvError: '',
      cpfError: '',
      addressError: '',
    });
    expect(result.current.isCredit).toBe(true);
    expect(result.current.isDebit).toBe(false);
  });

  it('should change payment method', () => {
    const { result } = renderHook(() => usePaymentForm());

    act(() => {
      result.current.setMethod('debit_card');
    });

    expect(result.current.method).toBe('debit_card');
    expect(result.current.isCredit).toBe(false);
    expect(result.current.isDebit).toBe(true);
  });

  it('should apply masks to input fields', () => {
    const { result } = renderHook(() => usePaymentForm());

    act(() => {
      result.current.setCardNumber('1234567890123456');
      result.current.setExpiryDate('1225');
      result.current.setCvv('123');
      result.current.setCpf('12345678901');
    });

    expect(result.current.cardNumber).toBe('1234 5678 9012 3456');
    expect(result.current.expiryDate).toBe('12/25');
    expect(result.current.cvv).toBe('123');
    expect(result.current.cpf).toBe('123.456.789-01');
  });

  it('should clear all fields', () => {
    const { result } = renderHook(() => usePaymentForm());

    act(() => {
      result.current.setCardNumber('1234567890123456');
      result.current.setExpiryDate('1225');
      result.current.setCvv('123');
      result.current.setCpf('12345678901');
      result.current.setMethod('debit_card');
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.method).toBe('credit_card');
    expect(result.current.cardNumber).toBe('');
    expect(result.current.expiryDate).toBe('');
    expect(result.current.cvv).toBe('');
    expect(result.current.cpf).toBe('');
    expect(result.current.errors).toEqual({
      cardNumberError: '',
      expiryError: '',
      cvvError: '',
      cpfError: '',
      addressError: '',
    });
  });

  describe('validation', () => {
    it('should validate address selection', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.validate('');
      });

      expect(result.current.errors.addressError).toBe('Selecione um endereço');
    });

    it('should validate card number for credit/debit cards', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.setCardNumber('1234');
      });

      act(() => {
        result.current.validate('valid-address');
      });

      expect(result.current.errors.cardNumberError).toBe('Número do cartão inválido');
    });

    it('should validate CVV', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.setCardNumber('1234567890123456');
        result.current.setCvv('12'); // Invalid CVV
      });

      act(() => {
        result.current.validate('valid-address');
      });

      expect(result.current.errors.cvvError).toBe('CVV inválido');
    });

    it('should validate CPF length', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.setCardNumber('1234567890123456');
        result.current.setCvv('123');
        result.current.setCpf('123456789'); // Invalid CPF length
      });

      act(() => {
        result.current.validate('valid-address');
      });

      expect(result.current.errors.cpfError).toBe('CPF deve ter 11 dígitos');
    });

    it('should validate CPF format', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.setCardNumber('1234567890123456');
        result.current.setCvv('123');
        result.current.setCpf('11111111111'); // Invalid CPF
      });

      act(() => {
        result.current.validate('valid-address');
      });

      expect(result.current.errors.cpfError).toBe('CPF inválido');
    });

    it('should validate expiry date format', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.setCardNumber('1234567890123456');
        result.current.setCvv('123');
        result.current.setCpf('12345678901');
        result.current.setExpiryDate('12'); // Invalid format
      });

      act(() => {
        result.current.validate('valid-address');
      });

      expect(result.current.errors.expiryError).toBe('Data de validade inválida');
    });

    it('should validate expiry date month', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.setCardNumber('1234567890123456');
        result.current.setCvv('123');
        result.current.setCpf('12345678909'); // Valid CPF
        // Simular entrada manual de mês inválido
        result.current.setExpiryDate('1325');
      });

      act(() => {
        result.current.validate('valid-address');
      });

      expect(result.current.errors.expiryError).toBe('Mês inválido');
    });

    it('should pass validation with valid data', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.setCardNumber('1234567890123456');
        result.current.setCvv('123');
        result.current.setCpf('12345678909'); // Valid CPF
        // Usar uma data bem no futuro para garantir que seja válida
        const futureYear = new Date().getFullYear() + 5;
        const yearSuffix = futureYear.toString().slice(-2);
        result.current.setExpiryDate(`12${yearSuffix}`);
      });

      let hasErrors;
      act(() => {
        hasErrors = result.current.validate('valid-address');
      });

      expect(hasErrors).toBe(false);
    });

    it('should not validate card fields for PIX method', () => {
      const { result } = renderHook(() => usePaymentForm());

      act(() => {
        result.current.setMethod('pix');
      });

      let hasErrors;
      act(() => {
        hasErrors = result.current.validate('valid-address');
      });

      expect(hasErrors).toBe(false);
    });
  });
}); 