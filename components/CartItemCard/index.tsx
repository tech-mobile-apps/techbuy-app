import { Product, useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/utils/formatCurrency';
import React, { useContext } from 'react';
import { Button, Card, IconButton, Paragraph, Text, Title } from 'react-native-paper';
import { styles } from './styles';
import { View } from 'react-native';

interface CardItem {
  item: Product;
  handleRemove: (productId: string) => void;
}

function CartItemCard({ item, handleRemove }: CardItem) {
  const { addToCart, decreaseItemQuantity } = useCart();
  function onIncrease() {
    addToCart(item);
  }
  function onDecrease() {
    decreaseItemQuantity(item.id);
  }
  return (
    <Card key={item.id} style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>{formatCurrency(item.price * (item.quantity ?? 1))}</Paragraph>
      </Card.Content>
      <View style={styles.cardActions}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Paragraph>Quantidade: </Paragraph>
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              disabled={item.quantity === 1}
              size={18}
              onPress={onDecrease}
            />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <IconButton icon="plus" size={18} onPress={onIncrease} />
          </View>
        </View>
        <Button textColor="#dd5454ff" onPress={() => handleRemove(item.id)}>
          Remover
        </Button>
      </View>
    </Card>
  );
}

export default CartItemCard;
