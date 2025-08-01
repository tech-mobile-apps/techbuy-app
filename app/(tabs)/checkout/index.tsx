// CheckoutScreen.tsx
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Divider, Button, Switch } from 'react-native-paper';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useFocusEffect, router } from 'expo-router';
import { styles } from './styles';
import { formatCurrency } from '@/utils/formatCurrency';

import { api } from '@/services/api';
import { useAddresses } from '@/hooks/useAddresses';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import OrderSummary from '@/components/OrderSummary';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import PickupSwitch from '@/components/PickupSwitch';
import AddressSelector from '@/components/AddressSelector';
import { User } from '@/types/User';

export default function CheckoutScreen() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [inStorePickUp, setInStorePickUp] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { userAddress, loadAddresses } = useAddresses(user as User, inStorePickUp);
  const paymentForm = usePaymentForm();

  const totalItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        price: item.quantity && item.quantity > 1 ? item.price * item.quantity : item.price,
      })),
    [items],
  );

  const totalValue = useMemo(
    () => totalItems.reduce((acc, item) => acc + item.price, 0),
    [totalItems],
  );

  useFocusEffect(
    useCallback(() => {
      loadAddresses();
    }, [loadAddresses]),
  );

  async function handleFinishPurchase() {
    const hasError = paymentForm.validate(selectedAddress);
    if (hasError) return;

    try {
      setIsLoading(true);

      if (paymentForm.method === 'pix') {
        router.push({
          pathname: '/(tabs)/pix',
          params: { selectedAddress, paymentMethod: paymentForm.method },
        });
        return;
      }

      await api.post('/orders', {
        items,
        total,
        address: selectedAddress,
        paymentMethod: paymentForm.method,
        userId: user?.id,
        date: new Date(),
      });

      clearCart();
      paymentForm.clear();
      router.replace('/(tabs)/orders');
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.paymentContainer}>
        <OrderSummary items={totalItems} totalValue={totalValue} />
        <Divider style={styles.divider} />

        <PaymentMethodSelector form={paymentForm} totalValue={totalValue} />
        <Divider style={styles.divider} />

        <PickupSwitch
          value={inStorePickUp}
          onToggle={() => setInStorePickUp((curretValue) => !curretValue)}
        />

        <AddressSelector
          addresses={userAddress}
          selected={selectedAddress}
          onSelect={setSelectedAddress}
          inStorePickUp={inStorePickUp}
        />

        {!!paymentForm.errors.addressError && (
          <Text style={styles.error}>{paymentForm.errors.addressError}</Text>
        )}
      </View>

      <Divider style={styles.divider} />

      <View style={styles.totalContainer}>
        <Button
          mode="contained"
          onPress={handleFinishPurchase}
          loading={isLoading}
          style={styles.confirmButton}
        >
          Confirmar Pedido
        </Button>
      </View>
    </ScrollView>
  );
}
