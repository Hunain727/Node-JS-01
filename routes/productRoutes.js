const express = require('express');
const router = express.Router();
let { products } = require('../config/dummyData');
const apiKeyAuth = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

// 6. GET All Products (Public)
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// 7. GET Single Product (Public)
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
});

// 8. POST Add Product (Protected + Validated)
router.post('/', apiKeyAuth, validateProduct, (req, res) => {
  const { name, price, category, stock } = req.body;
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 101,
    name,
    price,
    category,
    stock
  };

  products.push(newProduct);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct
  });
});

// 9. PUT Update Product (Protected + Validated)
router.put('/:id', apiKeyAuth, validateProduct, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const { name, price, category, stock } = req.body;
  products[index] = { id, name, price, category, stock };

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: products[index]
  });
});

// 10. DELETE Product (Protected)
router.delete('/:id', apiKeyAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const deletedProduct = products.splice(index, 1);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: deletedProduct[0]
  });
});

module.exports = router;