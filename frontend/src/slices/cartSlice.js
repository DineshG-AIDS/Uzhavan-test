import { createSlice } from "@reduxjs/toolkit";
import { udateCart } from "../utils/cartUtils.js";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Paypal" };
console.log(initialState);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // console.log("payload", item);
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return udateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return udateCart(state);
    },
    saveShippingAddress: (state, actions) => {
      state.shippingAddress = actions.payload;
      return udateCart(state);
    },
  },
});
// localStorage.clear();
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
