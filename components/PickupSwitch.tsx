// src/app/modules/Checkout/components/PickupSwitch.tsx
import { styles } from '@/app/(tabs)/checkout/styles';
import React from 'react';
import { View } from 'react-native';
import { Text, Switch } from 'react-native-paper';

interface PickupSwitchProps {
  value: boolean;
  onToggle: () => void;
}

export default function PickupSwitch({ value, onToggle }: PickupSwitchProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingHorizontal: 12,
      }}
    >
      <Text variant="titleMedium" style={{ ...styles.paymentTitle, color: '#4b4a4aff' }}>
        Retirar na loja
      </Text>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  );
}
