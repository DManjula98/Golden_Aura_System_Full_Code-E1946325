const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const blogController = require('../../controllers/dashboard/blogController')

router.post('/blog-add', authMiddleware, blogController.add_blog)
router.get('/blogs-get', authMiddleware, blogController.blogs_get)
router.get('/blog-get/:blogId', authMiddleware, blogController.blog_get)
router.post('/blog-update', authMiddleware, blogController.blog_update)
router.post('/blog-image-update', authMiddleware, blogController.blog_image_update);
router.delete('/blog/delete/:blogId', blogController.delete_blog);

module.exports = router