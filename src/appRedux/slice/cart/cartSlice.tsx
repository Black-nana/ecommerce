import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  quantity: number;
  id: number;
  // Add other properties of a cart item
}

interface CartState {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  cartItems: CartItem[];
}

const initialState: CartState = {
  subtotal: 0,
  shippingCost: 0,
  tax: 0,
  total: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
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
    updateCartValues(state: CartState, action: PayloadAction<{ subtotal: number, shippingCost: number, tax: number, total: number }>) {
      const { subtotal, shippingCost, tax, total } = action.payload;
      state.subtotal = subtotal;
      state.shippingCost = shippingCost;
      state.tax = tax;
      state.total = total;
    },
  },
});

export const { addToCart, removeFromCart,updateCartValues } = cartSlice.actions;
export default cartSlice.reducer;
