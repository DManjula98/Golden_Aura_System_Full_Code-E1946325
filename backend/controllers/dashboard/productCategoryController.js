const ProductCategory = require('../../models/productCategory');
const slugify = require('slugify'); 

class ProductCategoryController {
  createProductCategory = async (req, res) => {
    try {
      const { name, category, subcategories } = req.body;

      if (!name || !category) {
        return res.status(400).json({ error: 'Name and category are required' });
      }

      let processedSubcategories = [];
      if (subcategories) {
        processedSubcategories = JSON.parse(subcategories).map(subcategory => {
          return {
            ...subcategory,
            slug: slugify(subcategory.name, { lower: true, strict: true })
          };
        });
      }

      const newProductCategory = new ProductCategory({
        name,
        category,
        subcategories: processedSubcategories
      });
      await newProductCategory.save();
      res.status(201).json({ message: 'Product category created successfully', newProductCategory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getProductCategories = async (req, res) => {
    try {
      const productCategories = await ProductCategory.find()
        .populate('category') 
        .populate('subcategories'); 
      res.status(200).json({ productCategories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

}

module.exports = new ProductCategoryController();
