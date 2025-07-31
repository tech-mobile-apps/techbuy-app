// src/app/modules/Checkout/components/OrderSummary.tsx
import React from 'react';
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { formatCurrency } from '@/utils/formatCurrency';
import { styles } from './styles';
import { Product } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items: Product[];
  totalValue: number;
}

export default React.memo(function OrderSummary({ items, totalValue }: OrderSummaryProps) {
  return (
    <View>
      <Text variant="headlineMedium" style={{ color: '#000', fontWeight: '600', marginBottom: 14 }}>
        Resumo do pedido
      </Text>

      {items.map((item) => (
        <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="headlineMedium" style={styles.mediumText}>
            {item.name}
            {item.quantity && item.quantity > 1 && ` (${item.quantity}x)`}
          </Text>
          <Text variant="headlineMedium" style={styles.mediumText}>
            {formatCurrency(item.price)}
          </Text>
        </View>
      ))}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
        <Text variant="headlineMedium" style={styles.mediumText}>
          Frete
        </Text>
        <Text variant="headlineMedium" style={styles.mediumText}>
          Grátis
        </Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.mediumText}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalValue)}</Text>
      </View>
    </View>
  );
});
