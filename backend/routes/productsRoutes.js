import express from "express";
import {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
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
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
