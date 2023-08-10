import asyncHandler from "../middleware/asynHandler.js";
import productsModel from "../models/productsModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await productsModel.find({});
  res.json(products);
});

const getProductId = asyncHandler(async (req, res) => {
  const product = await productsModel.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductId };
