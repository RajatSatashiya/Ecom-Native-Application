import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data;
  }
);

export const createCart = createAsyncThunk(
  "products/createCart",
  async (data) => {
    try {
      const response = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          products: data,
        }),
      });
      const res = await response.json();
      return res.id;
    } catch (e) {
      console.log("Error:" + e.message);
    }
  }
);

export const addToCart = createAsyncThunk("product/addToCart", async (data) => {
  try {
    const response = await fetch(`https://dummyjson.com/carts/${1}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: data,
      }),
    });
    const res = await response.json();
    return res;
  } catch (e) {
    console.log("Error:" + e.message);
  }
});

const initialState = {
  products: [],
  cartId: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.cartId = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log(action.payload);
        state.products = action.payload;
      });
  },
});
export default productSlice.reducer;
