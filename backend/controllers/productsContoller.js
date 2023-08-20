import asyncHandler from "../middleware/asynHandler.js";
import productsModel from "../models/productsModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGE_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await productsModel.countDocuments({ ...keyword });

  const products = await productsModel
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
    throw new Error("resource not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productsModel.findById(req.params.id);

  if (product) {
    await productsModel.deleteOne({ _id: product._id });
    res.status(200).json({ message: "PRoduct Deleted" });
  } else {
    res.status(404);
    throw new Error("resource not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await productsModel.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed this Product");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await productsModel
    .find({})
    .sort({ rating: -1 })
    .limit(3);
  res.status(200).json(products);
});

export {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
