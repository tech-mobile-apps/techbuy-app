import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  subtitle: {
    color: '#424141',
    fontSize: 14,
    marginTop: 24,
  },
  description: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
  },
  qrCode: {
    marginLeft: 12,
    height: 300,
    width: 300,
  },
  paymentCode: {
    fontSize: 16,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#4e4e4e',
    color: '#6e6d6d',
  },
  copyButton: {
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
  },
  successContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
  successMessage: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
  },
});
