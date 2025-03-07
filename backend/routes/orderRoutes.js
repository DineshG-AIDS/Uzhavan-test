import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderContoller.js";
import { protect, admin } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").post(addOrderItems).get(getOrders);
router.route("/mine").get(getMyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/deliver").put(updateOrderToDelivered);

export default router;
//buddy Testing GIT  AIDS
