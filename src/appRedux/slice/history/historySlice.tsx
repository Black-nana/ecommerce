import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  [x: string]: any;
  id: string;
  date: string;
  total: number;
  // Add other properties of an order
}

interface HistoryState {
  orderHistory: Order[];
}

const initialState: HistoryState = {
  orderHistory: [] as Order[],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addToOrderHistory(state: HistoryState, action: PayloadAction<Order>) {
            state.orderHistory.push(action.payload);
        },
        removeFromOrderHistory: (state, action: PayloadAction<number>) => {
            state.orderHistory = state.orderHistory.filter(order => order.id !== String(action.payload));
        },
        clearHistory(state: HistoryState) {
          state.orderHistory = [];
      },
    },
});

export const { addToOrderHistory,removeFromOrderHistory,clearHistory } = historySlice.actions;
export default historySlice.reducer;
