import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import wishlistReducer from './whishlist/wishlistSlice';
import historyReducer from './history/historySlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  history: historyReducer,


});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
