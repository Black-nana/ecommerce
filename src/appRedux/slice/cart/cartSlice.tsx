import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  quantity: number;
  id: number;
  // Add other properties of a cart item
}

interface CartState {
  cartItems: CartItem[];
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state: CartState, action: PayloadAction<CartItem>) {
      const { id, quantity,...rest } = action.payload as CartItem & { quantity: number };
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        // Implement update quantity functionality here
        const updatedQuantity = existingItem.quantity ; //existingItem.quantity  + quantity
        const updatedItem = { ...existingItem, quantity: updatedQuantity };
        state.cartItems = state.cartItems.map((item) =>
          item.id === id ? updatedItem : item
        );
      } else {
        // Implement add to cart functionality here
        state.cartItems.push({ id, quantity,...rest });
      }
    },
    removeFromCart(state: CartState, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
