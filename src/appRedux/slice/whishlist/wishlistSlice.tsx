// wishlistSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
  price: number;
}

const initialState: Item[] = [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Item>) {
      const newItem = action.payload;
      const existingItemIndex = state.findIndex(item => item.id === newItem.id);
      if (existingItemIndex === -1) { // Fixed condition
        state.push(newItem);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      return state.filter(item => item.id !== itemId);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
