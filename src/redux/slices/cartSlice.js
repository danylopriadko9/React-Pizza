import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem: (state, action) => {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce(
    //     (acc, val) => (acc += val.price),
    //     0
    //   );
    // },
    addItem: (state, action) => {
      const findItem = state.items.find(
        (value) =>
          value.title === action.payload.title && //было id вместо title
          value.size === action.payload.size &&
          value.type === action.payload.type
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (acc, val) => (acc += val.price * val.count),
        0
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (element) => element.id !== action.payload
      );

      state.totalPrice = state.items.reduce(
        (acc, val) => (acc += val.price * val.count),
        0
      );
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    plusCounter: (state, action) => {
      const findItem = state.items.find(
        (value) => value.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce(
        (acc, val) => (acc += val.price * val.count),
        0
      );
    },
    minusCounter: (state, action) => {
      const findItem = state.items.find(
        (value) => value.id === action.payload.id
      );

      if (findItem.count > 1) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce(
        (acc, val) => (acc += val.price * val.count),
        0
      );
    },
  },
});

export const { addItem, removeItem, clearItems, plusCounter, minusCounter } =
  cartSlice.actions;
export default cartSlice.reducer;
