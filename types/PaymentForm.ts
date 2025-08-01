interface PaymentFormErrors {
  cardNumberError: string;
  expiryError: string;
  cvvError: string;
  cpfError: string;
  addressError: string;
}

export interface PaymentForm {
  method: string;
  setMethod: (value: string) => void;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cpf: string;
  errors: PaymentFormErrors;
  setCardNumber: (value: string) => void;
  setExpiryDate: (value: string) => void;
  setCvv: (value: string) => void;
  setCpf: (value: string) => void;
  validate: (selectedAddress: string) => boolean;
  clear: () => void;
  isCredit: boolean;
  isDebit: boolean;
}
