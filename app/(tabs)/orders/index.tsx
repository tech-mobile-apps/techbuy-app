import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { api } from '@/services/api';
import { formatCurrency } from '@/utils/formatCurrency';
import { styles } from './styles';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/utils/formatDate';

interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  paymentMethod: string;
  date: string;
}

function getPaymentMethodLabel(method: string) {
  switch (method) {
    case 'credit_card':
      return 'Cartão de Crédito';
    case 'pix':
      return 'PIX';
    default:
      return 'Dinheiro';
  }
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const loadOrders = useCallback(async () => {
    try {
      const response = await api.get('/orders?_sort=date&_order=desc', {
        params: { userId: user?.id },
      });
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, [loadOrders]);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [loadOrders]),
  );

  const renderOrder = ({ item: order }: { item: Order }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Pedido #{order.id}</Title>
        <Paragraph>Data: {formatDate(order.date)}</Paragraph>
        <Paragraph>Forma de pagamento: {getPaymentMethodLabel(order.paymentMethod)}</Paragraph>
        <Text style={styles.itemsTitle}>Itens:</Text>
        {order.items.map((item) => (
          <Text key={`${order.id}-${item.id}`} style={{ marginLeft: 8 }}>
            - {item.name} (x{item.quantity})
          </Text>
        ))}
        <Text style={styles.totalText}>Total: {formatCurrency(order.total)}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderOrder}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.content}
      ListEmptyComponent={<Text style={styles.emptyStateText}>Você ainda não tem pedidos</Text>}
    />
  );
}
