const Product = require('../models/Product');

const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const getProducts = async () => {
  return await Product.find().populate('category');
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
