const authOrderModel = require('../../models/authOrderModel')
const Order = require('../../models/OrderModel')
const myShopWallet = require('../../models/myShopWallet')
const sellerWallet = require('../../models/sellerWallet')
const responseReturn = require("../../utils/response");
const sellerModel = require('../../models/sellerModel');
const sellerCustomerMessage = require('../../models/chat/sellerCustomerMessage')
const adminSellerMessage = require('../../models/chat/adminSellerMessage')
const productModel = require('../../models/productModel');
const { mongo: { ObjectId } } = require('mongoose')

module.exports.get_seller_dashboard_data = async (req, res) => {
    const { id } = req;
    //console.log(id)
    try {
        const totalSele = await sellerWallet.aggregate([
            {
                $match: {
                    sellerId: {
                        $eq: id
                    }
                }
            }, {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ])

        const totalProduct = await productModel.find({
            sellerId: new ObjectId(id)
        }).countDocuments()

        const totalOrder = await authOrderModel.find({
            sellerId: new ObjectId(id)
        }).countDocuments()

        const totalPendingOrder = await authOrderModel.find({
            $and: [
                {
                    sellerId: {
                        $eq: new ObjectId(id)
                    }
                },
                {
                    delivery_status: {
                        $eq: 'pending'
                    }
                }
            ]
        }).countDocuments()

        const messages = await sellerCustomerMessage.find({
            $or: [
                {
                    senderId: {
                        $eq: id
                    }
                },
                {
                    receverId: {
                        $eq: id
                    }
                }
            ]
        }).limit(3)

        const recentOrders = await authOrderModel.find({
            sellerId: new ObjectId(id)
        }).limit(5)

        const productDetails = await productModel.find({}, { 
            _id: 1, 
            name: 1, 
            category: 1, 
            subcategory: 1, 
            brand:1,
            createdAt: 1 
        }).limit(5).sort({ createdAt: -1 });
        
        responseReturn(res, 200, {
            totalOrder,
            totalSale: totalSele.length > 0 ? totalSele[0].totalAmount : 0,
            totalPendingOrder,
            messages,
            recentOrders,
            totalProduct,
             productDetails
        })
    } catch (error) {
        console.log('get seller dashboard data error ' + error.messages)
    }
}

module.exports.get_admin_dashboard_data = async (req, res) => {
    const { id } = req
    try {
        const totalSele = await myShopWallet.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ])

        const totalProduct = await productModel.find({}).countDocuments()

        const totalOrder = await Order.find({}).countDocuments()

        const totalSeller = await sellerModel.find({}).countDocuments()

        const messages = await adminSellerMessage.find({}).limit(3)

        const recentOrders = await Order.find({}).limit(5)

        const sellerDetails = await sellerModel.find({}, { 
            _id: 1, 
            name: 1, 
            email: 1, 
            status: 1, 
            payment:1,
            createdAt: 1 
        }).limit(10).sort({ createdAt: -1 });
        

        responseReturn(res, 200, {
            totalOrder,
            totalSale: totalSele.length > 0 ? totalSele[0].totalAmount : 0,
            totalSeller,
            messages,
            recentOrders,
            totalProduct,
            sellerDetails
        })
    

    } catch (error) {
        console.log('get admin dashboard data error ' + error.messages)
    }

}