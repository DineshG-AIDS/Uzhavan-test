import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store.js";

import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/cartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PrivatRoutes from "./components/PrivatRoutes.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminRoutes from "./components/AdminRoutes.jsx";
import OrderListScreen from "./screens/Admins/OrderListScreen.jsx";
import ProductsListScreen from "./screens/Admins/ProductsListScreen.jsx";
import ProductEditScreen from "./screens/Admins/ProductEditScreen.jsx";
import UsersListScreen from "./screens/Admins/UsersListScreen.jsx";
import UsersEditScreen from "./screens/Admins/UsersEditScreen.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />

      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />

      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivatRoutes />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route
          path="/admin/products/:id/edit"
          element={<ProductEditScreen />}
        />
        <Route path="/admin/userlist" element={<UsersListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UsersEditScreen />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductsListScreen />}
        />
        <Route path="/admin/productlist" element={<ProductsListScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
        {/* <App /> */}
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
