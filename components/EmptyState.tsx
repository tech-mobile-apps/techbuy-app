import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface EmptyState {
  icon: ReactNode;
  text: string;
  buttonText?: string;
  onPress?: () => void;
}

function EmptyState({ icon, text, buttonText, onPress }: EmptyState) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 12,
        height: '100%',
        backgroundColor: '#fff',
      }}
    >
      {icon}
      <Text
        variant="headlineMedium"
        style={{ color: '#4b4a4aff', fontSize: 20, textAlign: 'center' }}
      >
        {text}
      </Text>
      {!!buttonText && !!onPress && (
        <Button mode="contained" style={{ borderRadius: 8 }} onPress={onPress}>
          {buttonText}
        </Button>
      )}
    </View>
  );
}

export default EmptyState;
