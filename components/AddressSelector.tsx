// src/app/modules/Checkout/components/AddressSelector.tsx
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AddressCard from '@/components/AddressCard';
import EmptyState from '@/components/EmptyState';
import { MapPinHouse } from 'lucide-react-native';
import { Address } from '@/types/Address';

interface AddressSelectorProps {
  addresses: Address[];
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  inStorePickUp: boolean;
}

export default function AddressSelector({
  addresses,
  selected,
  onSelect,
  inStorePickUp,
}: AddressSelectorProps) {
  const [parentWidth, setParentWidth] = useState(0);

  return (
    <RadioButton.Group onValueChange={onSelect} value={selected}>
      <ScrollView
        horizontal
        onLayout={(e) => setParentWidth(e.nativeEvent.layout.width)}
        style={{ flexDirection: 'row', paddingHorizontal: 8, marginTop: 16 }}
      >
        {addresses?.length ? (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              parentWidth={parentWidth}
              isRadio
              deletable={!inStorePickUp}
              hasMoreThanOne={addresses.length > 1}
            />
          ))
        ) : (
          <EmptyState
            icon={<MapPinHouse size={60} color="#4B2882" />}
            text="Você ainda não cadastrou um endereço!"
          />
        )}
      </ScrollView>
    </RadioButton.Group>
  );
}
