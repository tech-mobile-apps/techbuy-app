import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  paymentContainer: { padding: 16, backgroundColor: '#fff' },
  paymentTitle: { color: '#000' },
  totalContainer: { padding: 16 },
  totalText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  confirmButton: { borderRadius: 8, height: 40 },
  divider: {
    backgroundColor: '#dbd8d8ff',
    marginTop: 12,
    marginBottom: 16,
  },
  error: {
    marginBottom: 16,
    color: '#dd5454ff',
    flex: 1,
    textAlign: 'center',
  },
});
