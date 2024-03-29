import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import wishlistReducer from './whishlist/wishlistSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
