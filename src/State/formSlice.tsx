import { createSlice } from "@reduxjs/toolkit";

interface Product{
  productTitle: string
    productDesc: string
    productPrice: string
  files:any[]
}

export const formSlice = createSlice({
  name: "form",
  initialState: {
    product:[{}]
  },
  reducers: {
    setProduct: (state, action) => {
     state.product = [...state.product, action.payload]
    },
  },
});

export const { setProduct } = formSlice.actions;

export const product = (state: any) => state.form.product;

export default formSlice.reducer;
