import React, { createContext, useState, useContext } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

interface CartContextData {
  items: Product[];
  itemsCount: number;
  addToCart: (product: Product) => void;
  decreaseItemQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  function addToCart(product: Product) {
    setItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);

      if (existingItem) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function decreaseItemQuantity(productId: string) {
    setItems((current) => {
      return current
        .map((item) =>
          item.id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item,
        )
        .filter((item) => item.quantity! > 0); // Remove itens com quantidade 0
    });
  }

  function removeFromCart(productId: string) {
    setItems((current) => current.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  // Calcular valores derivados
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemsCount = items.reduce((count, item) => count + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemsCount,
        addToCart,
        decreaseItemQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
