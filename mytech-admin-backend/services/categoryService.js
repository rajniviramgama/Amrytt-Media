const Category = require('../models/Category');

const createCategory = async (data) => {
  const category = new Category(data);
  return await category.save();
};

const updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

const getCategories = async () => {
  return await Category.find();
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
