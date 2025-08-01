import { useState } from 'react';
import { applyMask } from '@/utils/applyMask';
import { validaDigitosCPF } from '@/utils/validators';

const initialErrors = {
  cardNumberError: '',
  expiryError: '',
  cvvError: '',
  cpfError: '',
  addressError: '',
};

export function usePaymentForm() {
  const [method, setMethod] = useState('pix');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cpf, setCpf] = useState('');
  const [errors, setErrors] = useState(initialErrors);

  const isCredit = method === 'credit_card';
  const isDebit = method === 'debit_card';

  function clear() {
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCpf('');
    setErrors(initialErrors);
    setMethod('credit_card');
  }

  function validate(selectedAddress: string) {
    let newErrors = { ...initialErrors };

    if (!selectedAddress) {
      newErrors.addressError = 'Selecione um endereço';
    }

    if (isCredit || isDebit) {
      const cleanCard = cardNumber.replace(/\D/g, '');
      const cleanCVV = cvv.replace(/\D/g, '');
      const cleanCpf = cpf.replace(/\D/g, '');

      if (cleanCard.length !== 16) {
        newErrors.cardNumberError = 'Número do cartão inválido';
      }
      if (!(cleanCVV.length === 3 || cleanCVV.length === 4)) {
        newErrors.cvvError = 'CVV inválido';
      }
      if (cleanCpf.length !== 11) {
        newErrors.cpfError = 'CPF deve ter 11 dígitos';
      } else if (/^(\d)\1{10}$/.test(cleanCpf) || !validaDigitosCPF(cleanCpf)) {
        newErrors.cpfError = 'CPF inválido';
      }

      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        newErrors.expiryError = 'Data de validade inválida';
      } else {
        const [monthStr, yearStr] = expiryDate.split('/');
        const month = parseInt(monthStr, 10);
        const year = parseInt(`20${yearStr}`, 10);
        const now = new Date();

        if (month < 1 || month > 12) {
          newErrors.expiryError = 'Mês inválido';
        } else if (
          year < now.getFullYear() ||
          (year === now.getFullYear() && month < now.getMonth() + 1)
        ) {
          newErrors.expiryError = 'Cartão vencido';
        }
      }
    }

    setErrors(newErrors);
    return Object.values(newErrors).some(Boolean);
  }

  return {
    method,
    setMethod,
    cardNumber,
    expiryDate,
    cvv,
    cpf,
    errors,
    setCardNumber: (v: string) => setCardNumber(applyMask(v, '9999 9999 9999 9999')),
    setExpiryDate: (v: string) => setExpiryDate(applyMask(v, '99/99')),
    setCvv: (v: string) => setCvv(applyMask(v, '999')),
    setCpf: (v: string) => setCpf(applyMask(v, '999.999.999-99')),
    validate,
    clear,
    isCredit,
    isDebit,
  };
}
