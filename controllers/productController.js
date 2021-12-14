const { log } = require("console");
const { NotFoundError } = require("../error");
const Product = require("../models/productSchema");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const { name } = req.params;

  const product = await Product.findOne({ name });

  if (!product) {
    throw new NotFoundError(`No product with the name ${name}`);
  }

  res.status(200).json({ product });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
};
