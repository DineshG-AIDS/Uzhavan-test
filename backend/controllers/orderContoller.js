import { json } from "express";
import asyncHandler from "../middleware/asynHandler.js";
import Order from "../models/orderModel.js";
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress, // Make sure you have the correct structure for shippingAddress
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

//Get logged in orders
//GET REQ
//PRIVATE

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200), json(orders);
});

//Get order by ID
//GET REQ
//PRIVATE

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("No such order");
  }
});

//update order to paid
//GET REQ
//PRIVATE

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update Order to paid");
});

//update order to delivered
//GET REQ
//PRIVATE

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update Order to delivered");
});

//GET ALL ORDERS
//GET REQ
//PRIVATE/ADMIN

const getOrders = asyncHandler(async (req, res) => {
  res.send("get orders only admins");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
