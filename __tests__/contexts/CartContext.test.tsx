import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart, Product } from '../../contexts/CartContext';

// Wrapper para o hook
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide initial cart state', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.itemsCount).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addToCart(testProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({ ...testProduct, quantity: 1 });
    expect(result.current.total).toBe(10);
  });

  it('should increase quantity when adding same item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addToCart(testProduct);
      result.current.addToCart(testProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.total).toBe(20);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addToCart(testProduct);
      result.current.removeFromCart('1');
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addToCart(testProduct);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
    expect(result.current.itemsCount).toBe(0);
  });

  it('should decrease item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addToCart(testProduct);
      result.current.addToCart(testProduct); // Quantity = 2
      result.current.decreaseItemQuantity('1'); // Quantity = 1
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.total).toBe(10);
  });

  it('should remove item when quantity reaches zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addToCart(testProduct);
      result.current.decreaseItemQuantity('1'); // Quantity = 0, should remove
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it('should handle multiple different items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product1: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      image: 'test1.jpg',
    };

    const product2: Product = {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      image: 'test2.jpg',
    };

    act(() => {
      result.current.addToCart(product1);
      result.current.addToCart(product2);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.total).toBe(30);
  });
}); 