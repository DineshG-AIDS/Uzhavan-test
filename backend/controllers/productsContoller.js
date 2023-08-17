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

const createProduct = asyncHandler(async (req, res) => {
  const product = new productsModel({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 2,
    numReviews: 1,
    description: "This is a sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await productsModel.findById(req.params.id);
  // console.log(product);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductId, createProduct, updateProduct };
