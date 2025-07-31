import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import {
  Text,
  Button,
  Card,
  Title,
  Paragraph,
  Portal,
  Modal,
  Menu,
  IconButton,
  Checkbox,
} from 'react-native-paper';
import { useCart } from '@/contexts/CartContext';
import { api } from '@/services/api';
import { router, usePathname } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { AppContext } from '@/contexts/AppContext';
import { styles } from './styles';
import { AxiosError } from 'axios';

const orderMenuOptions = [
  {
    icon: 'arrow-down',
    title: 'Menor preço',
    sortBy: 'price',
    order: 'asc',
  },
  {
    icon: 'arrow-up',
    title: 'Maior preço',
    sortBy: 'price',
    order: 'desc',
  },
  {
    icon: 'domain',
    title: 'Fabricante',
    sortBy: 'manufacturer',
    order: 'desc',
  },
  {
    icon: 'calendar-clock',
    title: 'Mais recentes',
    sortBy: 'createdAt',
    order: 'desc',
  },
];

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  manufacturer: string;
  createdAt: string;
  category: string;
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [orderModalIsVisible, setOrderModalIsVisible] = useState(false);
  const [filterModalIsVisible, setFilterModalIsVisible] = useState(false);
  const showOrderModal = () => setOrderModalIsVisible(true);
  const hideOrderModal = () => setOrderModalIsVisible(false);
  const showFilterModal = () => setFilterModalIsVisible(true);
  const hideFilterModal = () => setFilterModalIsVisible(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { searchText } = useContext(AppContext);
  const { addToCart } = useCart();
  const pathname = usePathname();
  const { user, setIsVisible } = useAuth();

  const loadProducts = useCallback(
    async (pageNumber = 1, shouldRefresh = false) => {
      if (loading || !hasMore) return;

      setLoading(true);
      setError(null);
      try {
        let filter = '';
        if (selectedCategories.length > 0) {
          filter = selectedCategories.join('|');
        }

        const response = await api.get<Product[]>(
          `/products?_page=${pageNumber}&_limit=2&_sort=${sortBy}&_order=${order}&category_like=${filter}`,
        );
        const { data } = response;

        setHasMore(data.length > 0);
        setProducts((oldProducts) => {
          const newProducts = shouldRefresh ? data : [...oldProducts, ...data];
          const uniqueProducts = newProducts.filter(
            (product, index, self) => index === self.findIndex((p) => p.id === product.id),
          );
          return uniqueProducts;
        });
        setPage(pageNumber);
        setCategories((prevCategories) => {
          const newCategories = data.map((product) => product.category);
          const combined = [...new Set([...prevCategories, ...newCategories])];
          return combined;
        });
      } catch (error: unknown) {
        const err = error as AxiosError;
        setError(
          err.code === 'ECONNABORTED'
            ? 'Tempo de conexão esgotado. Tente novamente.'
            : 'Erro ao carregar produtos. Verifique sua conexão.',
        );
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [sortBy, order, selectedCategories],
  );

  useEffect(() => {
    if (pathname !== '/') router.push('/');
    const delayDebounceFn = setTimeout(async () => {
      if (searchText.trim() !== '') {
        try {
          let filter = '';
          if (selectedCategories.length > 0) {
            filter = selectedCategories.join('|');
          }
          const response = await api.get(
            `/products?name_like=${searchText}&_sort=${sortBy}&_order=${order}&category_like=${filter}`,
          );
          setProducts(response.data);
          setHasMore(false);
        } catch (error) {
          setError('Erro ao buscar produtos:');
          console.error('Erro ao buscar produtos:', error);
        }
      } else {
        setProducts([]);
        setPage(1);
        setHasMore(true);
        loadProducts(1, true);
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, sortBy, order, selectedCategories]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProducts(1, true).then(() => setRefreshing(false));
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      setIsVisible(true);
      return;
    }
    addToCart(product);
  };

  const handleFilter = (filter: string) => {
    setHasMore(true);
    if (selectedCategories.includes(filter)) {
      setSelectedCategories((currentCategories) =>
        currentCategories.filter((category) => category !== filter),
      );
    } else {
      setSelectedCategories((currentCategories) => [...currentCategories, filter]);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Text style={styles.price}>
          {item.price.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => handleAddToCart(item)} style={styles.button}>
          Adicionar ao Carrinho
        </Button>
      </Card.Actions>
    </Card>
  );

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={onRefresh} style={styles.retryButton}>
            Tentar Novamente
          </Button>
        </View>
      ) : (
        <>
          <Portal>
            <Modal
              visible={orderModalIsVisible}
              onDismiss={hideOrderModal}
              contentContainerStyle={styles.modalContainer}
              style={styles.modalWrapper}
            >
              <View>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Ordenar por</Text>
                  <IconButton icon="close" size={24} onPress={hideOrderModal} />
                </View>
                {orderMenuOptions.map(({ icon, title, sortBy, order }) => (
                  <Menu.Item
                    key={title}
                    leadingIcon={icon}
                    titleStyle={styles.menuItem}
                    onPress={() => {
                      setSortBy(sortBy);
                      setOrder(order);
                      setHasMore(true);
                      hideOrderModal();
                    }}
                    title={title}
                  />
                ))}
              </View>
            </Modal>
          </Portal>
          <Portal>
            <Modal
              visible={filterModalIsVisible}
              onDismiss={hideFilterModal}
              contentContainerStyle={styles.modalContainer}
              style={styles.modalWrapper}
            >
              <View>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Filtrar por</Text>
                  <IconButton icon="close" size={24} onPress={hideFilterModal} />
                </View>
                {categories.map((currentCategory) => (
                  <Checkbox.Item
                    key={currentCategory}
                    label={currentCategory}
                    labelStyle={{ color: '#000' }}
                    color="#000"
                    onPress={() => handleFilter(currentCategory)}
                    status={selectedCategories.includes(currentCategory) ? 'checked' : 'unchecked'}
                  />
                ))}
              </View>
            </Modal>
          </Portal>
          <View style={styles.filtersContainer}>
            <Button textColor="#000" icon="tune" onPress={showFilterModal}>
              Filtrar
            </Button>
            <Button textColor="#000" icon="sort" onPress={showOrderModal}>
              Ordenar
            </Button>
          </View>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => String(item.id)}
            onEndReached={() => hasMore && loadProducts(page + 1)}
            onEndReachedThreshold={0.1}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              !loading ? <Text style={styles.emptyText}>Nenhum produto encontrado</Text> : null
            }
            ListFooterComponent={
              loading && !initialLoading ? (
                <View style={styles.footerLoader}>
                  <ActivityIndicator size="small" color="#2196F3" />
                </View>
              ) : null
            }
          />
        </>
      )}
    </View>
  );
}
