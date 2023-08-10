import express from "express";
import { getProducts, getProductId } from "../controllers/productsContoller.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductId);

export default router;
