import React, { useCallback, useState } from 'react';
import { KeyboardTypeOptions, Pressable, ScrollView, View } from 'react-native';
import { Text, Button, IconButton, TextInput } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import { router, useFocusEffect } from 'expo-router';
import { styles } from './styles';
import AddressCard from '@/components/AddressCard';
import { api } from '@/services/api';
import { applyMask } from '@/utils/applyMask';
import { User as UserIcon } from 'lucide-react-native';
import EmptyState from '@/components/EmptyState';
import { MapPinHouse } from 'lucide-react-native';
import { Address } from '@/types/Address';

export default function ProfileScreen() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const { user, setIsVisible, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState<Address[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [parentWidth, setParentWidth] = useState(0);
  const initalErrorState = {
    name: '',
    phone: '',
    cep: '',
    fullAddress: '',
    houseNumber: '',
    neighborhood: '',
    city: '',
    state: '',
    country: '',
  };
  const [errors, setErrors] = useState(initalErrorState);

  async function handleSignOut() {
    await signOut();
    router.replace('/');
  }

  async function loadAddress() {
    const { data } = await api.get('/addresses', {
      params: {
        userId: user?.id,
      },
    });
    setUserAddress(data);
  }

  function cleanForm() {
    setName('');
    setPhone('');
    setCep('');
    setFullAddress('');
    setHouseNumber('');
    setNeighborhood('');
    setCity('');
    setState('');
    setCountry('');
  }

  async function addAddressHandler() {
    setIsLoading(true);
    try {
      const newErrors = { ...initalErrorState };

      if (!name.trim()) newErrors.name = 'Informe o nome do endereço.';
      if (!phone.trim() || phone.replace(/\D/g, '').length !== 11)
        newErrors.phone = 'Telefone inválido.';
      if (!cep.trim() || cep.replace(/\D/g, '').length !== 8) newErrors.cep = 'CEP inválido.';
      if (!fullAddress.trim()) newErrors.fullAddress = 'Informe o endereço completo.';
      if (!houseNumber.trim() || isNaN(Number(houseNumber)))
        newErrors.houseNumber = 'Número inválido.';
      if (!neighborhood.trim()) newErrors.neighborhood = 'Informe o bairro.';
      if (!city.trim()) newErrors.city = 'Informe a cidade.';
      if (!state.trim()) newErrors.state = 'Informe o estado.';
      if (!country.trim()) newErrors.country = 'Informe o país.';

      const hasError = Object.values(newErrors).some((value) => !!value);

      if (hasError) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      const payload = {
        userId: user?.id,
        name,
        phone,
        cep,
        fullAddress,
        houseNumber,
        neighborhood,
        city,
        state,
        country,
      };

      const { data } = await api.post('/addresses', payload);
      setUserAddress((currentState) => [...currentState, data]);
      setIsLoading(false);
      setIsAddingAddress(false);
      cleanForm();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadAddress();
    }, [user]),
  );

  if (!user) {
    return (
      <EmptyState
        icon={<UserIcon size={60} color="#4B2882" />}
        text="Para acessar a tela de perfil você precisa fazer login!"
        buttonText="Fazer login"
        onPress={() => setIsVisible(true)}
      />
    );
  }

  const addressFormFields = [
    {
      value: name,
      name: 'name',
      errorMessage: errors.name,
      label: 'Nome do Endereço',
      keyboardType: 'default',
      onChange: (text: string) => setName(text),
    },
    {
      value: phone,
      name: 'phone',
      errorMessage: errors.phone,
      label: 'Telefone',
      keyboardType: 'phone-pad',
      onChange: (text: string) => {
        const formattedValue = applyMask(text, '(99) 99999-9999');
        setPhone(formattedValue);
      },
    },
    {
      value: cep,
      name: 'cep',
      errorMessage: errors.cep,
      label: 'CEP',
      keyboardType: 'numeric',
      onChange: (text: string) => {
        const formattedValue = applyMask(text, '99999-999');
        setCep(formattedValue);
      },
    },
    {
      value: fullAddress,
      name: 'fullAddress',
      errorMessage: errors.fullAddress,
      label: 'Endereço Completo',
      keyboardType: 'default',
      onChange: (text: string) => setFullAddress(text),
    },
    {
      value: houseNumber,
      name: 'houseNumber',
      errorMessage: errors.houseNumber,
      label: 'Número',
      keyboardType: 'numeric',
      onChange: (text: string) => setHouseNumber(text),
    },
    {
      value: neighborhood,
      name: 'neighborhood',
      errorMessage: errors.neighborhood,
      label: 'Bairro',
      keyboardType: 'default',
      onChange: (text: string) => setNeighborhood(text),
    },
    {
      value: city,
      name: 'city',
      errorMessage: errors.city,
      label: 'Cidade',
      keyboardType: 'default',
      onChange: (text: string) => setCity(text),
    },
    {
      value: state,
      name: 'state',
      errorMessage: errors.state,
      label: 'Estado',
      keyboardType: 'default',
      onChange: (text: string) => setState(text),
    },
    {
      value: country,
      name: 'country',
      errorMessage: errors.country,
      label: 'País',
      keyboardType: 'default',
      onChange: (text: string) => setCountry(text),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text variant="headlineMedium" style={{ ...styles.title, marginBottom: 4 }}>
          Perfil
        </Text>
        <Text variant="titleMedium" style={{ ...styles.title, marginBottom: 8 }}>
          Nome: {user?.name}
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          Email: {user?.email}
        </Text>
        <Button icon="logout" mode="contained" style={styles.logoutButton} onPress={handleSignOut}>
          Sair
        </Button>

        <View style={styles.address}>
          <Text variant="headlineMedium" style={{ color: '#000' }}>
            Endereços
          </Text>
          {isAddingAddress ? (
            <IconButton
              icon="close"
              iconColor="#4B2882"
              onPress={() => setIsAddingAddress(false)}
            />
          ) : (
            <Pressable onPress={() => setIsAddingAddress(true)}>
              <Text style={styles.addAddress}>Adicionar</Text>
            </Pressable>
          )}
        </View>

        {isAddingAddress && (
          <>
            <View style={styles.addingAddressContainer}>
              {addressFormFields.map((field) => (
                <View key={field.name}>
                  <TextInput
                    label={field.label}
                    textColor={field.errorMessage ? '#dd5454ff' : '#4b4a4aff'}
                    error={field.errorMessage.length > 0}
                    mode="outlined"
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                    autoCapitalize="none"
                    keyboardType={field.keyboardType as KeyboardTypeOptions}
                    style={{
                      marginBottom: field.errorMessage.length > 0 ? 8 : 16,
                      backgroundColor: '#fff',
                    }}
                  />
                  {!!field.errorMessage && (
                    <Text style={styles.errorMessage}>{field.errorMessage}</Text>
                  )}
                </View>
              ))}
            </View>
            <Button
              mode="contained"
              loading={isLoading}
              style={styles.addAddressButton}
              onPress={addAddressHandler}
            >
              Adicionar
            </Button>
          </>
        )}
        <View>
          <ScrollView
            horizontal={true}
            onLayout={(e) => setParentWidth(e.nativeEvent.layout.width)}
            style={styles.addressList}
          >
            {!!userAddress?.length ? (
              userAddress.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  setUserAddress={setUserAddress}
                  hasMoreThanOne={userAddress.length > 1}
                  parentWidth={parentWidth}
                  deletable
                />
              ))
            ) : (
              <>
                {!isAddingAddress && (
                  <EmptyState
                    icon={<MapPinHouse size={60} color="#4B2882" />}
                    text="Você ainda não cadastrou um endereço!"
                  />
                )}
              </>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
