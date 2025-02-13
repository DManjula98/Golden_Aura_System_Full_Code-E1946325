const router = require('express').Router()
const customerAuthControllers = require('../../controllers/home/customerAuthControllers')

router.post('/customer/customer-register',customerAuthControllers.customer_register)
router.post('/customer/customer-login',customerAuthControllers.customer_login)
router.get('/customer/logout',customerAuthControllers.customer_logout)

router.post('/updateProfile', customerAuthControllers.updateProfile)
router.post('/customer-profile-image-upload',customerAuthControllers.customer_profile_image_upload)
router.post('/updatePassword', customerAuthControllers.updatePassword);
router.delete('/customer/delete/:customerId', customerAuthControllers.delete_customer);

router.post('/forgotPassword', customerAuthControllers.requestPasswordReset);
router.post('/resetPassword', customerAuthControllers.resetPassword);

module.exports = router