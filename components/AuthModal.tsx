import { styles } from '@/app/(tabs)/styles';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { Button, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';

function AuthModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isVisible, setIsVisible, signIn } = useAuth();

  const fields = [
    {
      name: 'name',
      label: 'Nome',
      value: name,
      keyboardType: 'default',
      autoCapitalize: 'words',
      visible: isRegister,
      secureTextEntry: false,
      onChange: setName,
    },
    {
      name: 'email',
      label: 'Email',
      value: email,
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      visible: true,
      secureTextEntry: false,
      onChange: setEmail,
    },
    {
      name: 'password',
      label: 'Senha',
      value: password,
      secureTextEntry: true,
      autoCapitalize: 'none',
      keyboardType: 'default',
      visible: true,
      onChange: setPassword,
    },
    {
      name: 'confirmPassword',
      label: 'Repetir Senha',
      value: confirmPassword,
      secureTextEntry: true,
      autoCapitalize: 'none',
      keyboardType: 'default',
      visible: isRegister,
      onChange: setConfirmPassword,
    },
  ];

  function hideAuthModal() {
    setIsVisible(false);
  }

  async function handleLogin() {
    setIsLoading(true);
    try {
      await signIn(email, password);
      hideAuthModal();
      setIsLoading(false);
    } catch (err) {
      setError('Email ou senha inválidos');
      setIsLoading(false);
    }
  }

  async function handleRegister() {
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      const payload = {
        email,
        password,
        name,
      };
      await api.post('/users', payload);
      await handleLogin();
      hideAuthModal();
      setIsLoading(false);
    } catch (err) {
      setError('Email ou senha inválidos');
      setIsLoading(false);
    }
  }

  function Auth() {
    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  }

  useFocusEffect(
    useCallback(() => {
      setError('');
    }, [isVisible]),
  );

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={hideAuthModal}
        contentContainerStyle={{ ...styles.modalContainer, minHeight: 400 }}
        style={styles.modalWrapper}
      >
        <View style={{ ...styles.modalHeader, flexDirection: 'row-reverse' }}>
          <IconButton icon="close" size={24} onPress={hideAuthModal} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // ajuste conforme header/status bar do seu app
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>
              <Image
                style={{ marginBottom: 40, height: 100, width: 100 }}
                source={require('../assets/images/purpleLogo.png')}
              />

              {fields.map(
                (currentField) =>
                  currentField.visible && (
                    <TextInput
                      key={currentField.name}
                      mode="outlined"
                      error={error.length > 0}
                      label={currentField.label}
                      value={currentField.value}
                      textColor="#4b4a4aff"
                      onChangeText={currentField.onChange}
                      autoCapitalize="none"
                      keyboardType={currentField.keyboardType as KeyboardTypeOptions}
                      secureTextEntry={currentField.secureTextEntry}
                      style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        marginBottom: 16,
                      }}
                    />
                  ),
              )}

              {error ? (
                <Text style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>{error}</Text>
              ) : null}

              <Button
                mode="contained"
                style={{ borderRadius: 8, width: '100%' }}
                loading={isLoading}
                onPress={Auth}
              >
                {isRegister ? 'Cadastrar' : 'Entrar'}
              </Button>

              <View style={{ flexDirection: 'row', marginTop: 16 }}>
                <Text
                  style={{ color: '#4b4a4aff', textAlign: 'center', fontSize: 16, marginRight: 4 }}
                >
                  {isRegister ? 'Já possui uma conta?' : 'Ainda não possui uma conta?'}
                </Text>

                <Text
                  style={{
                    color: '#4B2882',
                    marginBottom: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  onPress={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? 'Faça login!' : 'Cadastre-se!'}
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

export default AuthModal;
