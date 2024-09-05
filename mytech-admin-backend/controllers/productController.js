  const productService = require('../services/productService');

  const createProduct = async (req, res) => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const updateProduct = async (req, res) => {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const deleteProduct = async (req, res) => {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getProducts = async (req, res) => {
    try {
      const products = await productService.getProducts();
      console.log('products: ', products);  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
  };
