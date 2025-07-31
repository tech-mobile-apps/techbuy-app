import { api } from '@/services/api';
import { useState } from 'react';
import { Button, Card, RadioButton, Text } from 'react-native-paper';
import ConfirmDialog from '../ConfirmDialog';
import { styles } from './styles';
import { Address } from '@/types/Address';

interface AddressCardProps {
  address: Address;
  parentWidth: number;
  hasMoreThanOne: boolean;
  isRadio?: boolean;
  setUserAddress?: React.Dispatch<React.SetStateAction<Address[]>>;
  deletable: boolean;
}

function AddressCard({
  address,
  parentWidth,
  hasMoreThanOne,
  isRadio,
  setUserAddress,
  deletable,
}: AddressCardProps) {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const cardWidth = hasMoreThanOne ? parentWidth - 45 : parentWidth;

  async function deleteAddressHandler() {
    try {
      await api.delete(`/addresses/${address.id}`);
      if (setUserAddress) {
        setUserAddress((currentAddressess) =>
          currentAddressess.filter(
            (curretAddress: { id: string }) => address.id !== curretAddress.id,
          ),
        );
      }
      hideDialog();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card key={address.id} style={{ marginBottom: 16, marginRight: 8, width: cardWidth }}>
      <Card.Content>
        {isRadio ? (
          <RadioButton.Item
            label={address.name}
            value={address.id}
            labelStyle={{
              ...styles.addressRow,
              color: '#e4e4e4ff',
              fontWeight: 600,
              marginLeft: -14,
              marginBottom: 0,
            }}
            style={{ backgroundColor: '#25232a' }}
            mode="android"
          />
        ) : (
          <Text
            variant="titleMedium"
            style={{
              ...styles.addressRow,
              color: '#e4e4e4ff',
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            {address.name}
          </Text>
        )}
        <Text variant="titleMedium" style={styles.addressRow}>
          {address.fullAddress}, {address.houseNumber}
        </Text>
        <Text variant="titleMedium" style={styles.addressRow}>
          {address.city}, {address.state} {address.cep}
        </Text>
        <Text variant="titleMedium" style={styles.addressRow}>
          {address.country}
        </Text>
        <Text variant="titleMedium" style={{ ...styles.addressRow, marginBottom: 4 }}>
          Telefone: {address.phone}
        </Text>
        {deletable && (
          <>
            <Button textColor="#f89c9cff" onPress={() => setVisible(true)}>
              Remover endereço
            </Button>
            <ConfirmDialog
              visible={visible}
              hideDialog={hideDialog}
              deleteAddressHandler={deleteAddressHandler}
            />
          </>
        )}
      </Card.Content>
    </Card>
  );
}

export default AddressCard;
