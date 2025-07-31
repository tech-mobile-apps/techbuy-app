import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useCart } from '@/contexts/CartContext';
import { router } from 'expo-router';
import { formatCurrency } from '@/utils/formatCurrency';
import { styles } from './styles';
import CartItemCard from '@/components/CartItemCard';

export default function CartScreen() {
  const { items, removeFromCart, total } = useCart();

  const handleRemove = useCallback(
    (id: string) => {
      removeFromCart(id);
    },
    [removeFromCart],
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        ) : (
          <>
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} handleRemove={handleRemove} />
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalValue}>Total: {formatCurrency(total)}</Text>
              <Button mode="contained" onPress={() => router.push('/checkout')}>
                Finalizar Compra
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
