const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const categoryController = require('../../controllers/dashboard/categoryController');

router.post('/category-add', authMiddleware, categoryController.add_category);
router.get('/category-get', authMiddleware, categoryController.get_category);
router.delete('/category/delete/:category_id', categoryController.delete_category);
router.get('/category-get-by-id/:categoryId', categoryController.get_category_by_Id)
router.post('/category-update', categoryController.update_category)
router.post('/category-image-update', categoryController.category_image_update);

module.exports = router;
