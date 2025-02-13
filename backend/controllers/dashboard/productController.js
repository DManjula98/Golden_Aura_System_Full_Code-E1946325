const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const responseReturn = require('../../utils/response');

class productController {
    add_product = async (req, res) => {
        const { id } = req;
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err.message);
                return responseReturn(res, 500, { error: err.message });
            }
            let { name, category, subcategory, description, mdescription, howToUse,ingredient, stock, price, discount, shopName, brand } = fields;
            const { images } = files;

            name = String(name || "").trim();
            category = String(category || "").trim();
            subcategory = String(subcategory || "").trim();
            description = String(description || "").trim();
            mdescription = String(mdescription || "").trim();
            howToUse = String(howToUse || "").trim();
            ingredient = String(ingredient || "").trim();
            shopName = String(shopName || "").trim();
            brand = String(brand || "").trim();

            if (!name || !category  || !description || !stock || !price || !discount || !shopName || !brand) {
                return responseReturn(res, 400, { error: 'All fields are required.' });
            }

            const slug = name.split(' ').join('-');

            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_API_KEY,
                api_secret: process.env.CLOUD_API_SECRET,
                secure: true
            });

            try {
                let allImageUrl = [];
                if (images) {
                    if (!Array.isArray(images)) {
                        images = [images]; 
                    }
                    for (let i = 0; i < images.length; i++) {
                        const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' });
                        allImageUrl.push(result.url);
                    }
                }
                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    category,
                    subcategory,
                    description,
                    mdescription,
                    howToUse,
                    ingredient,
                    stock: parseInt(stock, 10),
                    price: parseInt(price, 10),
                    discount: parseInt(discount, 10),
                    images: allImageUrl,
                    brand
                });
                responseReturn(res, 201, { message: "Product added successfully" });
            } catch (error) {
                console.error('Error during product addition:', error.message);
                responseReturn(res, 500, { error: error.message });
            }
        });
    }

    products_get = async (req, res) => {
        const { page, searchValue, parPage } = req.query;
        const { id } = req;
        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        try {
            if (searchValue) {
                const products = await productModel.find({
                    $text: { $search: searchValue },
                    sellerId: id
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 });

                const totalProduct = await productModel.find({
                    $text: { $search: searchValue },
                    sellerId: id
                }).countDocuments();

                responseReturn(res, 200, { totalProduct, products });
            } else {
                const products = await productModel.find({ sellerId: id }).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
                const totalProduct = await productModel.find({ sellerId: id }).countDocuments();

                responseReturn(res, 200, { totalProduct, products });
            }    
        } catch (error) {
            console.error('Error fetching products:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }

    product_get = async (req, res) => {
        const { productId } = req.params;

        try {
            const product = await productModel.findById(productId);
            responseReturn(res, 200, { product });
        } catch (error) {
            console.error('Error fetching product:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }

    product_update = async (req, res) => {
        let { name, description, mdescription,howToUse,ingredient, discount, price, brand, productId, stock } = req.body;
        name = name.trim();
        const slug = name.split(' ').join('-');

        try {
            await productModel.findByIdAndUpdate(productId, {
                name, description,mdescription,howToUse,ingredient, discount, price, brand, stock, slug
            });
            const product = await productModel.findById(productId);
            responseReturn(res, 200, { product, message: 'Product update successful' });
        } catch (error) {
            console.error('Error updating product:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }

    product_image_update = async (req, res) => {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return responseReturn(res, 500, { error: 'Failed to parse form data' });
            }
            const { productId, oldImage } = fields;
            const { newImage } = files;
    
            if (!newImage) {
                return responseReturn(res, 400, { error: 'No new image provided' });
            }
    
            try {
                cloudinary.config({
                    cloud_name: process.env.CLOUD_NAME,
                    api_key: process.env.CLOUD_API_KEY,
                    api_secret: process.env.CLOUD_API_SECRET,
                    secure: true
                });
    
                const result = await cloudinary.uploader.upload(newImage[0].filepath, { folder: 'products' });
    
                if (result) {
                    let product = await productModel.findById(productId);
                    
                     const images = product.images || [];
                const filteredImages = images.filter((img) => img !== oldImage); 
                filteredImages.push(result.url); 

                product.images = filteredImages;
                await product.save();

                const publicId = oldImage.split('/').pop().split('.')[0]; 
                await cloudinary.uploader.destroy(`products/${publicId}`);

    
                    product = await productModel.findById(productId);
                    responseReturn(res, 200, { product, message: 'Product image update successful' });
                } else {
                    responseReturn(res, 400, { error: 'Image upload failed' });
                }
            } catch (error) {
                console.error('Error updating product image:', error);
                responseReturn(res, 500, { error: error.message });
            }
        });
    }
    
     
    delete_product = async (req, res) => {
        const {productId } = req.params;
        try {
            await productModel.findByIdAndDelete(productId);
            responseReturn(res, 200, {
                message: 'Product deleted successfully'
            });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, {
                message: 'Failed to delete product'
            });
        }
    };
    
}

module.exports = new productController();
