const categoryModel = require('../../models/categoryModel')
const productModel = require('../../models/productModel');
const blogModel = require('../../models/blogModel');
const reviewModel = require('../../models/reviewModel');
const queryProducts = require('../../utils/queryProducts')
const responseReturn = require('../../utils/response'); 
const moment = require('moment')
const {mongo: {ObjectId}} = require('mongoose')

class homeControllers {

    formateProduct = (products) => {
        const productArray = [];
        let i = 0;
        while (i < products.length) {
            let temp = []
            let j = i
            while (j < i + 3) {
                if (products[j]) {
                    temp.push(products[j])
                }
                j++
            }
            productArray.push([...temp])
            i = j
        }
        return productArray
    }

    get_categories = async (req, res) => {
        try {
            const categories =  await categoryModel.find({}).populate('subcategories').exec();
            responseReturn(res, 200, {
                categories
            })
        } catch (error) {
            console.log(error.message)
        }   
    }

    get_blogs = async (req, res) => {
        try {
            const blogs =  await blogModel.find({}).limit(16).sort({
                createdAt: -1
            })
            responseReturn(res, 200, {
                blogs
            })
        } catch (error) {
            console.log(error.message)
        }   
    }


    get_products = async (req, res) => {
        try {
            const products = await productModel.find({}).limit(20).sort({
                createdAt: -1
            })
            //console.log(products)
            const allProduct1 = await productModel.find({}).limit(9).sort({
                createdAt: -1
            })
            const latest_product = this.formateProduct(allProduct1);
            const allProduct2 = await productModel.find({}).limit(9).sort({
                rating: -1
            })
            const topRated_product = this.formateProduct(allProduct2);
            const allProduct3 = await productModel.find({}).limit(9).sort({
                discount: -1
            })
            const discount_product = this.formateProduct(allProduct3);

            responseReturn(res, 200, {
                products,
                latest_product,
                topRated_product,
               discount_product
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    price_range_product = async (req, res) => {
        try {
            const priceRang = {
                low: 0,
                high: 0
            }
            const products = await productModel.find({}).limit(9).sort({
                createdAt: -1
            })
            const latest_product = this.formateProduct(products);
            const getForPrice = await productModel.find({}).sort({
                'price': 1
            })
            if (getForPrice.length > 0) {
                priceRang.high = getForPrice[getForPrice.length - 1].price
                priceRang.low = getForPrice[0].price
            }
            responseReturn(res, 200, {
                latest_product,
                priceRang
            })
        } catch (error) {
            console.log(error.message)
        }
    }


    query_products = async (req, res) => {
        const parPage = 12;
        req.query.parPage = parPage;
       
        try {
          const products = await productModel.find({}).sort({ createdAt: -1 });
      
          const totalProduct = new queryProducts(products, req.query)
            .categoryQuery()
            .ratingQuery()
            .priceQuery()
            .searchQuery()
            .sortByPrice()
            .countProducts();
      
          const result = new queryProducts(products, req.query)
            .categoryQuery()
            .ratingQuery()
            .priceQuery()
            .searchQuery()
            .sortByPrice()
            .skip()
            .limit()
            .getProducts();
      
          //console.log(result);
      
          responseReturn(res, 200, {
            products: result,
            totalProduct,
            parPage,
          });
        } catch (error) {
          console.log(error.message);
        }
      };

    get_blog = async (req,res) => {
    const { title } = req.params
        try {
            const blog = await blogModel.findOne({
                title
            })
            responseReturn(res, 200, {
                blog
            })
        } catch (error) {
            console.log(error.message)
        }
    }
//product details
    get_product = async (req, res) => {
        const { slug } = req.params
        try {
            const product = await productModel.findOne({
                  slug
            })
            const relatedProducts = await productModel.find({
                $and: [{
                        _id: {
                            $ne: product.id
                        }
                    },
                    {
                        subcategory: {
                            $eq: product.subcategory
                        }
                    }
                ]
            }).limit(20)

            const moreProducts = await productModel.find({
                $and: [{
                        _id: {
                            $ne: product.id
                        }
                    },
                    {
                        sellerId: {
                            $eq: product.sellerId
                        }
                    }
            ]
            }).limit(2)
      
            responseReturn(res, 200, {
                product,
                relatedProducts,
                moreProducts
            })
        } catch (error) {
            console.log(error.message)
        }
    }     

    submit_review = async (req, res) => {
        const { name, rating, review, product } = req.body;
        const productId = product;
        //console.log(req.body)
        try {
            await reviewModel.create({
                productId,
                name,
                rating,
                review,
                date: moment(Date.now()).format('LL')
            })

            let rat = 0;
            const reviews = await reviewModel.find({
                productId
            });
           //console.log(reviews)
            for (let i = 0; i < reviews.length; i++) {
                rat = rat + reviews[i].rating
            }
            let productRating = 0;

            if (reviews.length !== 0) {
                productRating = (rat / reviews.length).toFixed(1)
            }

            await productModel.findByIdAndUpdate(productId, {
                rating: productRating
            })

            responseReturn(res, 201, {
                message: "Review Added Successfully"
            })
        } catch (error) {
            console.log(error)
        }
    }

    get_reviews = async (req, res) => {
        const {productId} = req.params
        let {pageNo} = req.query
        pageNo = parseInt(pageNo)
        const limit = 5
        const skipPage = limit * (pageNo - 1)
        try {
            let getRating = await reviewModel.aggregate([{
                            $match: {
                                productId: {
                                    $eq: new ObjectId(productId) 
                                },
                                rating: {
                                    $not: {
                                        $size: 0
                                    }
                                }
                            }
                        },
                        {
                            $unwind: "$rating"
                        },
                        {
                            $group: {
                                _id: "$rating",
                                count: {
                                    $sum: 1
                                }
                            }
                        }
                    ])
                    //console.log(getRating)
                    let rating_review = [{
                            rating: 5,
                            sum: 0
                        },
                        {
                            rating: 4,
                            sum: 0
                        },
                        {
                            rating: 3,
                            sum: 0
                        },
                        {
                            rating: 2,
                            sum: 0
                        },
                        {
                            rating: 1,
                            sum: 0
                        }
                    ]
                    for (let i = 0; i < rating_review.length; i++) {
                        for (let j = 0; j < getRating.length; j++) {
                            if (rating_review[i].rating === getRating[j]._id) {
                                rating_review[i].sum = getRating[j].count
                                break
                            }
                        }
                    }
                    //console.log(rating_review)
                    const getAll = await reviewModel.find({
                        productId
                    })
                    const reviews = await reviewModel.find({
                        productId
                    }).skip(skipPage).limit(limit).sort({
                        createdAt: -1
                    })
                    responseReturn(res, 200, {
                        reviews,
                        totalReview: getAll.length,
                        rating_review
                    })  
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = new homeControllers()



 