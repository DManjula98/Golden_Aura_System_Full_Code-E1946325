const router = require('express').Router()
const {authMiddleware} = require('../middlewares/authMiddleware')
const authControllers = require('../controllers/authControllers')

router.post('/admin-login',authControllers.admin_login)
router.get('/get-user',authMiddleware,authControllers.getUser)
router.post('/seller-register',authControllers.seller_register)
router.post('/seller-login',authControllers.seller_login)
router.post('/profile-image-upload',authMiddleware, authControllers.profile_image_upload)
router.post('/profile-information-add',authMiddleware, authControllers.profile_information_add)
router.get('/logout',authMiddleware, authControllers.logout)
router.post('/admin-profile-image-upload',authMiddleware, authControllers.admin_profile_image_upload)

router.post('/update-profile', authMiddleware, authControllers.updateProfile);
router.post('/updateSellerProfile', authMiddleware, authControllers.updateSellerProfile)
router.post('/updateSellerShopProfile', authMiddleware, authControllers.updateSellerShopProfile)

router.delete('/seller/delete/:sellerId', authMiddleware, authControllers.delete_seller);
router.post('/sellerUpdatePassword', authMiddleware, authControllers.sellerUpdatePassword);
router.post('/adminUpdatePassword', authMiddleware, authControllers.adminUpdatePassword);

module.exports = router