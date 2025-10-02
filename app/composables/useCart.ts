import { useStorage } from "@vueuse/core";

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

export function useCart() {
  // Persisted state in localStorage
  const cart = useStorage<CartItem[]>("cart", []);

  function addToCart(item: CartItem) {
    const existing = cart.value.find((p) => p.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.value.push(item);
    }
  }

  function updateQuantity(id: string, quantity: number) {
    const existing = cart.value.find((p) => p.id === id);
    if (existing) {
      existing.quantity = quantity;
      if (existing.quantity <= 0) {
        removeFromCart(id);
      }
    }
  }

  function removeFromCart(id: string) {
    cart.value = cart.value.filter((p) => p.id !== id);
  }

  function clearCart() {
    cart.value = [];
  }

  const totalItems = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const subtotal = computed(() =>
    cart.value.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    )
  );

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
  };
}
