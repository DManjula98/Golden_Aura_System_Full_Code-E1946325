const express = require('express');
const router = express.Router();
const ProductCategory = require('../models/ProductCategory');

router.post('/productCategories', async (req, res) => {
  try {
    const { name, price, description, categoryId, subcategoryId } = req.body;
    const productCategory = new ProductCategory({
      name,
      price,
      description,
      categoryId,
      subcategoryId,
      imageUrl: req.file ? req.file.path : '',
    });
    await productCategory.save();
    res.status(201).json(productCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product category', error });
  }
});

module.exports = router;
