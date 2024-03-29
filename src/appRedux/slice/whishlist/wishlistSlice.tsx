import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
 id: number;
 name: string;
 price: number;
}

// Define the initial state as an array of Item
const wishlistSlice = createSlice({
 name: 'wishlist',
 initialState: {
    items: [] as Item[], // Corrected property name to 'items'
 },
 reducers: {
    addToWishlist(state, action: PayloadAction<Item>) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      if (existingItemIndex === -1) {
        state.items.push(newItem); // Corrected property name to 'items'
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId); // Corrected property name to 'items'
    },
 },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
