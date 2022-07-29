import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
    buttonStatus: "",
    cartProducts: [],
  },
  reducers: {
    increaseCartQuantity: (state) => {
      state.quantity += 1;
    },

    decreaseCartQuantity: (state) => {
      state.quantity -= 1;
    },

    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },

    setButtonStatus: (state, action) => {
      state.buttonStatus = action.payload;
    },
    addProduct: (state: any, action: any) => {
      state.cartProducts.push(action.payload);
    },
    deleteProduct: (state: any, action: any) => {
      state.cartProducts = state.cartProducts.filter(
        (p: any) => p.id !== action.payload
      );
    },
    changeProductQuantity: (state: any, action: any) => {
     const item =  state.cartProducts.find(
        (p: any) => p.id === action.payload.id
      );
     item.quantity = action.payload.data;
    },
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
});

export const {
  increaseCartQuantity,
  decreaseCartQuantity,
  setQuantity,
  setButtonStatus,
  addProduct,
  deleteProduct,
  changeProductQuantity,
  setCartProducts,
} = userSlice.actions;

export const quantity = (state: any) => state.cart.quantity;
export const buttonStatus = (state: any) => state.cart.buttonStatus;
export const cartProducts = (state: any) => state.cart.cartProducts;

export default userSlice.reducer;
