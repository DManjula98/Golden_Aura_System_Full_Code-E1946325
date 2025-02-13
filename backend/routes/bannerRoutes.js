const router = require('express').Router()
const {authMiddleware} = require('../middlewares/authMiddleware')
const bannerController = require('../controllers/bannerController')

router.post('/banner/add', authMiddleware, bannerController.add_banner)
router.get('/banner/get/:productId', authMiddleware, bannerController.get_banner)
router.put('/banner/update/:bannerId', authMiddleware, bannerController.update_banner)
router.get('/banners', bannerController.get_banners)

module.exports = router