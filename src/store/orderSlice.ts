// store/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Item = {
  productId: string;
  sizeName: string;
  colorName: string;
  quantity: string;
};

type Order = {
  name: string;
  phone: string;
  address: string;
  note: string;
  city: string;
  area: string;
  items: Item[];
};

const initialState: Order = {
  name: "",
  phone: "",
  address: "",
  note: "",
  city: "",
  area: "",
  items: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Partial<Order>>) => {
      return { ...state, ...action.payload };
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<{ index: number; data: Partial<Item> }>,
    ) => {
      const { index, data } = action.payload;
      if (state.items[index]) {
        state.items[index] = { ...state.items[index], ...data };
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    resetOrder: () => initialState,
  },
});

export const { setOrder, addItem, updateItem, deleteItem, resetOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
