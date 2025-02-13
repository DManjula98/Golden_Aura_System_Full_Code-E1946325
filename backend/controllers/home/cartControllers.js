const cartModel = require('../../models/cartModel')
const productModel = require('../../models/productModel');
const responseReturn = require("../../utils/response");
const {mongo : {ObjectId}} = require('mongoose')
const wishlistModel = require('../../models/wishlistModel')
class cartControllers {

    add_to_cart = async (req, res) => {
        const {userId, productId, quantity} = req.body
        try {
            const productStock = await productModel.findById(productId);
            if (!productStock) {
                return responseReturn(res, 404, { error: 'Product not found' });
            }
            if (productStock.stock < quantity) {
                return responseReturn(res, 400, { error: 'Not enough stock available' });
            }
            const product = await cartModel.findOne({
                $and: [{
                       productId: {
                            $eq:productId
                        }
                    },
                    {
                        userId: {
                            $eq: userId
                        }
                    }
                ]
            })
            if (product) {
                responseReturn(res, 404, {
                    error: 'Product already added to cart'
                })
            } else {
                const product = await cartModel.create({
                   userId,
                   productId,
                   quantity
                })
                await productModel.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
                responseReturn(res, 201, {
                    message: 'Product Added to cart successfully',
                    product
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    get_cart_products= async (req, res) => {
        const commission = 5;
        const {userId} = req.params
       try {
        const cart_products =await cartModel.aggregate([
            {
                $match :{
                    userId : {
                        $eq : new ObjectId(userId)
                    }
                }
            },
            {
                $lookup :{
                    from :'products',
                    localField :'productId',
                    foreignField : '_id',
                    as : 'products'
                }
            }
        ])
        let calculatePrice = 0;
        let cart_products_count = 0;
        let buy_product_item = 0
       
        //identify out of stock product
      const outofstock_products = cart_products.filter(product => product.products[0].stock < product.quantity)
       
        //count out of stock product quantity
        for (let i = 0; i < outofstock_products.length; i++) {
            cart_products_count = cart_products_count + outofstock_products[i].quantity
        }
        //console.log(cart_products_count)
        //calculate price for in stock product
        const stockProduct =cart_products.filter(product => product.products[0].stock >= product.quantity)
        for (let i = 0; i < stockProduct.length; i++) {
            const {quantity} = stockProduct[i]
            cart_products_count = cart_products_count + quantity
            buy_product_item = buy_product_item + quantity
            const {price, discount} = stockProduct[i].products[0]
            //calculate price
            if (discount !== 0) {
                calculatePrice = calculatePrice + quantity * (price - Math.floor((price * discount) / 100))
            } else {
                calculatePrice = calculatePrice + quantity * price
            }
        }
        //console.log(calculatePrice)

        let product = []
        //group product by seller
        let unique = [...new Set(stockProduct.map(product => product.products[0].sellerId.toString()))]
        for (let i = 0; i < unique.length; i++) {
            let price = 0;
            for (let j = 0; j < stockProduct.length; j++) {
                const tempProduct = stockProduct[j].products[0]
                if (unique[i] === tempProduct.sellerId.toString()) {
                    let pri = 0;
                    if (tempProduct.discount !== 0) {
                        pri = tempProduct.price - Math.floor((tempProduct.price * tempProduct.discount) / 100)
                    } else {
                        pri = tempProduct.price
                    }
                    pri = pri - Math.floor((pri * commission) / 100)
                    price = price + pri * stockProduct[j].quantity
                   //every product group together
                    product[i] = {
                        sellerId: unique[i],
                        shopName: tempProduct.shopName,
                        price,
                        products: product[i] ? [
                            ...product[i].products,
                            {
                                _id: stockProduct[j]._id,
                                quantity: stockProduct[j].quantity,
                                productInformation: tempProduct
                            }
                        ] : [{
                            _id: stockProduct[j]._id,
                            quantity: stockProduct[j].quantity,
                            productInformation: tempProduct

                        }]
                    }
                }

            }
        }

        responseReturn(res, 200, {
            cart_products: product,
            price: calculatePrice,
            cart_products_count,
            //delivery fee calculate according to number of seller
            delivery_fee: 85 * product.length,
            outofstock_products,
            buy_product_item
        })
    } catch (error) {
        console.log(error.message)
       }
    }



    delete_cart_product = async (req, res) => {
        //console.log(req.params)
        const { cart_id} = req.params
        try {
            const product = await cartModel.findById(cart_id);
            if (!product) {
                return responseReturn(res, 404, { error: 'Cart item not found' });
            }

            await productModel.findByIdAndUpdate(product.productId, { $inc: { stock: product.quantity } });
       
            await cartModel.findByIdAndDelete(cart_id)
            responseReturn(res, 200, {
                message: 'Product Remove form Cart Successfully'
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    quantity_increment = async (req, res) => {
        const { cart_id} = req.params
        try {
            const product = await cartModel.findById(cart_id)
            if (!product) {
                return responseReturn(res, 404, { error: 'Cart item not found' });
            }

            const productStock = await productModel.findById(product.productId);
            if (!productStock) {
                return responseReturn(res, 404, { error: 'Product not found' });
            }
            if (productStock.stock <= 0) {
                return responseReturn(res, 400, { error: 'Not enough stock available' });
            }

            await cartModel.findByIdAndUpdate(cart_id, {
                $inc: { quantity: 1 }
            })
            await productModel.findByIdAndUpdate(product.productId, { $inc: { stock: -1 } });
            responseReturn(res, 200, {
                message: 'Quantity Increment Success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    quantity_decrement = async (req, res) => {
        const {cart_id} = req.params
        try {
            const product = await cartModel.findById(cart_id)
            if (!product) {
                return responseReturn(res, 404, { error: 'Cart item not found' });
            }
    
            if (product.quantity <= 1) {
                return responseReturn(res, 400, { error: 'Quantity cannot be less than 1' });
            }
            await cartModel.findByIdAndUpdate(cart_id, {
                $inc: { quantity: -1 }
            })
            await productModel.findByIdAndUpdate(product.productId, { $inc: { stock: 1 } });
            responseReturn(res, 200, {
                message: 'Quantity Decrement Success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    add_to_wishlist = async (req, res) => {
        const { userId, slug } = req.body;  
        try {
            const existingProduct = await wishlistModel.findOne({
                userId,  
                slug   
            });
    
            if (existingProduct) {
                return responseReturn(res, 404, {
                    error: 'Product already added to your wishlist'
                });
            } else {
                await wishlistModel.create(req.body);  
                return responseReturn(res, 201, {
                    message: 'Product added to wishlist successfully'
                });
            }
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Server error' });
        }
    };

    get_wishlist = async (req, res) => {
        const { userId } = req.params;  
        try {
            const wishlist = await wishlistModel.find({ userId });

            res.status(200).json({
                wishlistCount: wishlist.length,  
                wishlist  
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch wishlist" });
        }
    };


    delete_wishlist = async (req, res) => {
        const { wishlistId } = req.params;
        try {
            const deletedProduct = await wishlistModel.findByIdAndDelete(wishlistId);

            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found in wishlist" });
            }

            res.status(200).json({
                message: "Product removed from wishlist successfully",
                wishlistId
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to remove product from wishlist" });
        }
    };

}
module.exports = new cartControllers()
