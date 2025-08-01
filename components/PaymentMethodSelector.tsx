// src/app/modules/Checkout/components/PaymentMethodSelector.tsx
import React from 'react';
import { View } from 'react-native';
import { Text, RadioButton, TextInput } from 'react-native-paper';
import InstalmentsDropdown from '@/components/InstalmentsDropdown';
import { styles } from '@/app/(tabs)/checkout/styles';
import { PaymentForm } from '@/types/PaymentForm';

interface PaymentMethodSelectorProps {
  form: PaymentForm;
  totalValue: number;
}

export default function PaymentMethodSelector({ form, totalValue }: PaymentMethodSelectorProps) {
  const PAYMENT_METHODS = [
    { label: 'Cartão de Crédito', value: 'credit_card', hasForm: !!form.isCredit },
    { label: 'Cartão de Débito', value: 'debit_card', hasForm: !!form.isDebit },
    { label: 'PIX', value: 'pix', hasForm: false },
  ];

  return (
    <View>
      <Text variant="titleMedium" style={styles.paymentTitle}>
        Forma de Pagamento
      </Text>

      <RadioButton.Group onValueChange={form.setMethod} value={form.method}>
        {PAYMENT_METHODS.map((method) => (
          <View key={method.value}>
            <RadioButton.Item
              label={method.label}
              value={method.value}
              labelStyle={{ color: '#4b4a4aff', fontWeight: 500 }}
              mode="android"
            />

            {method.hasForm && (
              <View style={{ marginHorizontal: 12 }}>
                <TextInput
                  textColor={!!form.errors.cardNumberError ? '#dd5454ff' : '#4b4a4aff'}
                  label="Número do cartão"
                  error={!!form.errors.cardNumberError}
                  value={form.cardNumber}
                  onChangeText={form.setCardNumber}
                  mode="outlined"
                  keyboardType="number-pad"
                  autoComplete="off"
                  style={{
                    marginBottom: form.errors.cardNumberError ? 8 : 16,
                    backgroundColor: '#fff',
                  }}
                />
                {!!form.errors.cardNumberError && (
                  <Text style={{ color: '#dd5454ff', marginBottom: 8 }}>
                    {form.errors.cardNumberError}
                  </Text>
                )}

                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      textColor={!!form.errors.expiryError ? '#dd5454ff' : '#4b4a4aff'}
                      label="Validade (MM/AA)"
                      error={!!form.errors.expiryError}
                      value={form.expiryDate}
                      onChangeText={form.setExpiryDate}
                      mode="outlined"
                      keyboardType="number-pad"
                      style={{
                        marginBottom: !!form.errors.expiryError ? 8 : 16,
                        backgroundColor: '#fff',
                      }}
                    />
                    {!!form.errors.expiryError && (
                      <Text style={{ color: '#dd5454ff', marginBottom: 8 }}>
                        {form.errors.expiryError}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      textColor={!!form.errors.cvvError ? '#dd5454ff' : '#4b4a4aff'}
                      label="CVV"
                      error={!!form.errors.cvvError}
                      value={form.cvv}
                      onChangeText={form.setCvv}
                      mode="outlined"
                      keyboardType="number-pad"
                      style={{
                        flex: 1,
                        marginBottom: !!form.errors.cvvError ? 8 : 16,
                        backgroundColor: '#fff',
                      }}
                    />
                    {!!form.errors.cvvError && (
                      <Text style={{ color: '#dd5454ff', marginBottom: 8 }}>
                        {form.errors.cvvError}
                      </Text>
                    )}
                  </View>
                </View>
                <TextInput
                  textColor={!!form.errors.cardNumberError ? '#dd5454ff' : '#4b4a4aff'}
                  label="CPF"
                  error={!!form.errors.cpfError}
                  value={form.cpf}
                  onChangeText={form.setCpf}
                  mode="outlined"
                  keyboardType="number-pad"
                  style={{
                    marginBottom: !!form.errors.cpfError ? 8 : 16,
                    backgroundColor: '#fff',
                  }}
                />
                {!!form.errors.cpfError && (
                  <Text style={{ color: '#dd5454ff', marginBottom: 8 }}>
                    {form.errors.cpfError}
                  </Text>
                )}

                <InstalmentsDropdown total={totalValue} />
              </View>
            )}
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
}
