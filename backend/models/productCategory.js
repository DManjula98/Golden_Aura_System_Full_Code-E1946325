const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  name: String,
  price: Number,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
  },
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);
