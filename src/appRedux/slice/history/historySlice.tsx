// orderHistorySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import {CartItems} from '../cart/cartSlice'; // Import the 'CartItems' interface from the appropriate file

interface CartItems {
    id: number;
    quantity: number;
    // Add other properties of a cart item
  }

interface Order {
    id: number;
    items: CartItems[]; // Update to match your CartItems interface
    total: number;
    date: string;
}

const initialState: Order[] = [];

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
addToOderHistoy: (state, action: PayloadAction<Order>) => {
      state.push(action.payload);
    },
    removeFromOrderHistory: (state, action: PayloadAction<number>) => {
        return state.filter(order => order.id !== action.payload);
      },
  },
});

export const { addToOderHistoy,removeFromOrderHistory } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
