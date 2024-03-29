// store.tsx
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cart/cartSlice';
import wishlistReducer from '../slice/whishlist/wishlistSlice'; // Import wishlistReducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // Add wishlist reducer to the store
  },
});
export default store;
