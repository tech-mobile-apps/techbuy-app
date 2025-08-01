import { useCart } from '@/contexts/CartContext';
import { Tabs } from 'expo-router';
import { ShoppingBag, Chrome as Home, User, ShoppingCart } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform } from 'react-native';

interface TabBarIcon {
  size: number;
  color: string;
}

export default function TabLayout() {
  const { itemsCount } = useCart();

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'TechBuy - Loja Online';
    }
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ size, color }: TabBarIcon) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ size, color }: TabBarIcon) => <ShoppingCart size={size} color={color} />,
          tabBarBadge: itemsCount === 0 ? undefined : itemsCount,
        }}
      />
      <Tabs.Screen
        name="orders/index"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ size, color }: TabBarIcon) => <ShoppingBag size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ size, color }: TabBarIcon) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="checkout/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="pix/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
