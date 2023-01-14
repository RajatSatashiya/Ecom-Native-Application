import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/ProductSlice";

const store = configureStore({
  reducer: {
    productsReducer,
  },
});

export default store;
