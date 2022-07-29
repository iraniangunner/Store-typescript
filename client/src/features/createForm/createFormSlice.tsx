import { createSlice } from "@reduxjs/toolkit";

interface Product {
  productTitle: string;
  productDesc: string;
  productPrice: string;
  files: any[];
}

export const formSlice = createSlice({
  name: "create",
  initialState: {
    productTitle: "",
    productDesc: "",
    productPrice: "",
    files: [],
  },
  reducers: {
    setProduct: (state: any, action: any) => {
      state.files.push(action.payload);
    },
  },
});

export const { setProduct } = formSlice.actions;

export const product = (state: any) => state.form.product;

export default formSlice.reducer;
