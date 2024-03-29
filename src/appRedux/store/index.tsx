// store.tsx
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cart/cartSlice';
import wishlistReducer from '../slice/whishlist/wishlistSlice'; // Import wishlistReducer
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root', // key is required
  storage, // storage is where data will be persisted (e.g., localStorage, AsyncStorage)
};
// Enhance reducers with persistence
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(persistConfig, wishlistReducer);

// Create the store with persisted reducers
const store = configureStore({

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),

  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
  },
});
// Create persistor to persist the store
export const persistor = persistStore(store);

export default store;
