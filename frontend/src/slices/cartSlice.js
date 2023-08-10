import { createSlice } from "@reduxjs/toolkit";
// import { json } from "express";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };
console.log(initialState);

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed();
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      //   console.log(item);
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculating Item Price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, itm) => +(acc + itm.price) * +itm.qty, 0)
      );

      // Calculate Shipping price
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

      // Tax GST for farming Goods
      state.taxPrice = addDecimals(
        Number((0.15 * +state.itemPrice).toFixed(2))
      );

      // Total Price for farming Products
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
// localStorage.clear();
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
