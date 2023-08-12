export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed();
};

export const udateCart = (state) => {
  // Calculating Item Price
  state.itemPrice = addDecimals(
    state.cartItems.reduce((acc, itm) => +(acc + itm.price) * +itm.qty, 0)
    // state.cartItems.reduce((acc, itm) => console.log(itm.qty, "qty"), 0)
  );

  state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

  // Tax GST for farming Goods
  state.taxPrice = addDecimals(Number((0.15 * +state.itemPrice).toFixed(2)));

  // Total Price for farming Products
  state.totalPrice = (
    Number(state.itemPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
