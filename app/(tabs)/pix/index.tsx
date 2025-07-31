import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { HandCoins, Check } from 'lucide-react-native';
import { Button, Text } from 'react-native-paper';
import { useCart } from '@/contexts/CartContext';
import { router, useLocalSearchParams } from 'expo-router';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { styles } from './styles';

const paymentCode =
  '00020126630014BR.GOV.BCB.PIX0114+55819999999990215Pagamento PIX5204000053039865405100.005802BR5914Loja Exemplo Ltda6009Sao Paulo62070503***63041D3D';

function PaymentSuccess() {
  return (
    <View style={styles.successContainer}>
      <Check color="#4B2882" size={80} />
      <Text style={styles.successTitle}>Pagamento efetuado com sucesso!</Text>
      <Text style={styles.successMessage}>
        Você será redirecionado automaticamente para a tela de pedidos!
      </Text>
    </View>
  );
}

function PixPaymentContent({
  total,
  copied,
  onCopy,
}: {
  total: number;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <>
      <HandCoins color="#4B2882" size={80} />
      <Text style={styles.subtitle}>Falta pouco!</Text>
      <Text style={styles.description}>
        Pague o valor de {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} via
        pix para concluir sua compra
      </Text>
      <Image
        style={styles.qrCode}
        source={require('../../../assets/images/qrcode_pagamento_aprovado.png')}
      />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.paymentCode}>
        {paymentCode}
      </Text>
      <Button
        mode="contained"
        icon={copied ? 'check' : 'content-copy'}
        style={styles.copyButton}
        onPress={onCopy}
      >
        {copied ? 'Copiado' : 'Copiar código'}
      </Button>
    </>
  );
}

export default function PixPage() {
  const [copied, setCopied] = useState(false);
  const [payed, setPayed] = useState(false);
  const { total, clearCart, items } = useCart();
  const { user } = useAuth();
  const { selectedAddress, paymentMethod } = useLocalSearchParams();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(paymentCode);
    setCopied(true);
  };

  const confirmPayment = useCallback(async () => {
    try {
      await api.post('/orders', {
        items,
        total,
        address: selectedAddress,
        paymentMethod,
        userId: user?.id,
        date: new Date(),
      });

      clearCart();
      router.replace('/(tabs)/orders');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao confirmar pagamento. Tente novamente.');
    }
  }, [items, total, selectedAddress, paymentMethod, user, clearCart]);

  useEffect(() => {
    if (copied) {
      const copyTimeout = setTimeout(() => {
        setCopied(false);
        setPayed(true);
      }, 3000);
      return () => clearTimeout(copyTimeout);
    }
  }, [copied]);

  useEffect(() => {
    if (payed) {
      const payTimeout = setTimeout(() => {
        confirmPayment();
      }, 3000);
      return () => clearTimeout(payTimeout);
    }
  }, [payed, confirmPayment]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {payed ? (
          <PaymentSuccess />
        ) : (
          <PixPaymentContent total={total} onCopy={copyToClipboard} copied={copied} />
        )}
      </View>
    </ScrollView>
  );
}
