import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  price: { fontSize: 16, marginTop: 8 },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 8,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 16,
  },
});
