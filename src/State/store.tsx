import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import profileReducer from './userSlice';
export default configureStore({
  reducer: {
    form: formReducer,
    profile: profileReducer
  },
});