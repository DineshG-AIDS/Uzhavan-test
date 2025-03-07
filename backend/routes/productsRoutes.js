import express from "express";
import {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productsContoller.js";
import { protect } from "../middleware/authMiddleWare.js";
import { admin } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router.get("/top", getTopProducts);

router.route("/:id").get(getProductId).put(updateProduct).delete(deleteProduct);

router.route("/:id/reviews").post(createProductReview);

export default router;
