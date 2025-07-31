// src/app/modules/Checkout/hooks/useAddresses.ts
import { useState, useCallback } from 'react';
import { api } from '@/services/api';
import { Address } from '@/types/Address';
import { User } from '@/types/User';

export function useAddresses(user: User, inStorePickUp: boolean) {
  const [userAddress, setUserAddress] = useState<Address[]>([]);

  const loadAddresses = useCallback(async () => {
    try {
      const endpoint = inStorePickUp ? '/store-addresses' : '/addresses';
      const { data } = await api.get(endpoint, {
        params: inStorePickUp ? {} : { userId: user?.id },
      });
      setUserAddress(data);
    } catch (error) {
      console.error('Erro ao carregar endereços:', error);
    }
  }, [user, inStorePickUp]);

  return { userAddress, setUserAddress, loadAddresses };
}
