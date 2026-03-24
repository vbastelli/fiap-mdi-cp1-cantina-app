import { Stack } from 'expo-router';
import { CartProvider } from '../components/CartContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="cardapio" />
        <Stack.Screen name="carrinho" />
        <Stack.Screen name="confirmacao" />
      </Stack>
    </CartProvider>
  );
}
