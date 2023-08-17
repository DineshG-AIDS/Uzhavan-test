import express from "express";
import {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
} from "../controllers/productsContoller.js";
import { protect } from "../middleware/authMiddleWare.js";
import { admin } from "../middleware/authMiddleWare.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductId)
  .put(protect, admin, updateProduct);

export default router;
