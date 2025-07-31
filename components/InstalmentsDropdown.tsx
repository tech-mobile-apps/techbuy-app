import { formatCurrency } from '@/utils/formatCurrency';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';

const InstalmentsDropdown = ({ total }: { total: number }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(`1x de ${formatCurrency(total)}`);
  const [parentWidth, setParentWidth] = useState(0);

  const parcelas = [
    `1x de ${formatCurrency(total)}`,
    `2x de ${formatCurrency(total / 2)}`,
    `3x de ${formatCurrency(total / 3)}`,
    `4x de ${formatCurrency(total / 4)}`,
    `5x de ${formatCurrency(total / 5)}`,
  ];

  return (
    <View style={{ marginBottom: 16 }}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchorPosition="top"
        style={{ width: parentWidth }}
        anchor={
          <Pressable onPress={() => setVisible(true)}>
            <View onLayout={(e) => setParentWidth(e.nativeEvent.layout.width)}>
              <TextInput
                label="Parcelas"
                textColor="#4b4a4aff"
                mode="outlined"
                editable={false}
                pointerEvents="none"
                value={selected}
                right={<TextInput.Icon icon="chevron-down" onPress={() => setVisible(true)} />}
                style={{ backgroundColor: '#fff' }}
              />
            </View>
          </Pressable>
        }
      >
        {parcelas.map((item) => (
          <Menu.Item
            key={item}
            title={item}
            style={{ width: 'auto' }}
            onPress={() => {
              setSelected(item);
              setVisible(false);
            }}
          />
        ))}
      </Menu>
    </View>
  );
};

export default InstalmentsDropdown;
