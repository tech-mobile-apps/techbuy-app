import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Divider, Portal, Text } from 'react-native-paper';

interface ConfirmDialogProps {
  visible: boolean;
  hideDialog: () => void;
  deleteAddressHandler: () => void;
}

function ConfirmDialog({ visible, hideDialog, deleteAddressHandler }: ConfirmDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} style={{ backgroundColor: '#fff' }} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text
            variant="titleMedium"
            style={{
              color: '#050505ff',
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Certeza que deseja remover o endereço?
          </Text>
          <Text
            variant="titleMedium"
            style={{
              color: '#050505ff',
              fontSize: 14,
              marginBottom: 0,
            }}
          >
            Ao confirmar o endereço será permanentemente excluído!
          </Text>
          <Divider
            style={{
              backgroundColor: '#dbd8d8ff',
              marginTop: 12,
              marginBottom: 10,
            }}
          />
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Button
              mode="contained"
              style={{ borderRadius: 8, width: '100%' }}
              onPress={deleteAddressHandler}
            >
              Confirmar
            </Button>
            <Button
              textColor="#e00808ff"
              mode="contained"
              style={{
                backgroundColor: '#eecfcfff',
                borderRadius: 8,
                width: '100%',
              }}
              onPress={hideDialog}
            >
              Cancelar
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

export default ConfirmDialog;
