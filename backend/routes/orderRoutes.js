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

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
//buddy Testing GIT  AIDS
