import { useCartStore } from '../stores/useCartStore';
import { useAuthStore } from '../stores/useAuthStore';

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    cartItems: items,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount,
    isAuthenticated
  };
}