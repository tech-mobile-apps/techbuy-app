import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { padding: 16 },
  title: { color: '#000', marginBottom: 14 },
  logoutButton: { borderRadius: 8, height: 40, marginBottom: 16 },
  addAddress: { fontSize: 16, fontWeight: 600, color: '#4B2882' },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    gap: 4,
    height: 40,
  },
  addressName: { color: '#908e8d', fontWeight: 600, marginLeft: -14 },
  addressRow: { color: '#908e8d', marginBottom: 8 },
  addingAddressContainer: { marginHorizontal: 12 },
  errorMessage: { marginBottom: 16, color: '#dd5454ff', flex: 1 },
  addAddressButton: {
    marginTop: 8,
    borderRadius: 8,
    height: 40,
    marginBottom: 16,
  },
  addressList: { display: 'flex', flexDirection: 'row', gap: 4 },
});
