import { useEffect, useState } from 'react';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { PaperProvider, Searchbar } from 'react-native-paper';
import { AppContext } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, View } from 'react-native';
import { Image } from 'react-native';
import LoginModal from '@/components/AuthModal';
import './global.css';

export default function RootLayout() {
  const [searchText, setSearchText] = useState('');

  useFrameworkReady();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#25232a' }}>
        <PaperProvider>
          <AuthProvider>
            <AppContext.Provider value={{ searchText }}>
              <CartProvider>
                <View
                  style={{
                    backgroundColor: '#25232a',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 18,
                    width: '100%',
                  }}
                >
                  <Pressable onPress={() => router.push('/')}>
                    <Image
                      style={{ marginLeft: 12, height: 40, width: 40 }}
                      source={require('../assets/images/whiteLogo.png')}
                    />
                  </Pressable>
                  <Searchbar
                    placeholder="Buscar"
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                    style={{ borderRadius: 8, width: '60%' }}
                  />
                </View>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="login" />
                </Stack>
                <StatusBar style="light" />
                <LoginModal />
              </CartProvider>
            </AppContext.Provider>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
