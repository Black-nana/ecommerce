import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItems {
  price: number;
  title: string | undefined;
  rating: any;
  image: string;
  quantity: number;
  id: number;
  // Add other properties of a cart item
}

interface CartState {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  cartItems: CartItems[];
}

const initialState: CartState = {
  subtotal: 0,
  shippingCost: 0,
  tax: 0,
  total: 0,
  cartItems: [],
};
export interface Order {
  id: string;
  date: string;
  total: number;
  items: CartItems[]; // Assuming CartItems type is defined somewhere
  // Add other properties of an order
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<CartItems>) {
      const { id, quantity, ...rest } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update its quantity
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
        state.cartItems = updatedItems;
      } else {
        // Item does not exist in the cart, add it
        state.cartItems.push({ id, quantity, ...rest });
      }
    },
    removeFromCart(state: CartState, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateCartValues(
      state: CartState,
      action: PayloadAction<{
        subtotal: number;
        shippingCost: number;
        tax: number;
        total: number;
      }>
    ) {
      const { subtotal, shippingCost, tax, total } = action.payload;
      state.subtotal = subtotal;
      state.shippingCost = shippingCost;
      state.tax = tax;
      state.total = total;
    },
    clearCart(state: CartState) {
      state.cartItems = []; // Set cartItems to an empty array to clear the cart
      // Optionally, reset other cart-related values if needed
      state.subtotal = 0;
      state.shippingCost = 0;
      state.tax = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartValues, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
