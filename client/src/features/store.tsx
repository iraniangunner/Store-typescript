import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./createForm/createFormSlice";
import profileReducer from "./registerForm/registerFormSlice";
import cartReducer from "./shoppingCart/shoppingCartSlice";
export default configureStore({
  reducer: {
    create: formReducer,
    profile: profileReducer,
    cart: cartReducer,
  },
});
