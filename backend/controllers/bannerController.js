const formidable = require('formidable');
const productModel = require("../models/productModel");
const bannerModel = require("../models/bannerModel");
const { mongo: { ObjectId } } = require('mongoose')
const responseReturn = require("../utils/response");
const cloudinary = require('../utils/cloudinary')

class bannerController {
   
    add_banner = async (req, res) => {
        const form = new formidable.IncomingForm({ multiples: true });
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form Parsing Error:', err);
                return res.status(400).json({ message: 'Error parsing form data' });
            }
    
            console.log('Fields:', fields);
            console.log('Files:', files);
    
            const { productId } = fields;
            const imageFile = files.image && files.image[0]; 
    
            if (!imageFile) {
                console.error('No file uploaded');
                return res.status(400).json({ message: 'No file provided' });
            }
    
            try {
                const { slug } = await productModel.findById(productId);
    
                const result = await cloudinary.uploader.upload(imageFile.filepath, {
                    folder: 'banners',
                });
    
                const banner = await bannerModel.create({
                    productId,
                    banner: result.url,
                    link: slug,
                });
    
                return res.status(201).json({ banner, message: 'Banner added successfully' });
            } catch (error) {
                console.error('Cloudinary Error:', error);
                return res.status(500).json({ message: error.message });
            }
        });
    };

    get_banner = async (req, res) => {
        const { productId } = req.params

        try {
            const banner = await bannerModel.findOne({ productId: new ObjectId(productId) })
            responseReturn(res, 200, { banner })
        } catch (error) {
            console.log(error)
            responseReturn(res, 500, { message: error.message })
        }
    }

    get_banners = async (req, res) => {

        try {
            const banners = await bannerModel.aggregate([
                {
                    $sample: {
                        size: 10
                    }
                }
            ])
            responseReturn(res, 200, { banners })
        } catch (error) {
            console.log(error)
            responseReturn(res, 500, { message: error.message })
        }
    }

    update_banner = async (req, res) => {
        const { bannerId } = req.params;
        const form = new formidable.IncomingForm({ multiples: true });
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return responseReturn(res, 400, { message: 'Error parsing the form' });
            }
    
            console.log('Parsed files:', files);
    
            const image = files.image && files.image[0];
    
            if (!image || !image.filepath) {
                console.error('File not uploaded or missing filepath:', image);
                return responseReturn(res, 400, { message: 'File upload failed or file not provided' });
            }
    
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_API_KEY,
                api_secret: process.env.CLOUD_API_SECRET,
                secure: true,
            });
    
            try {
                let banner = await bannerModel.findById(bannerId);
                if (!banner) {
                    return responseReturn(res, 404, { message: 'Banner not found' });
                }
    
                const temp = banner.banner.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(temp);
    
                const { url } = await cloudinary.uploader.upload(image.filepath, {
                    folder: 'banners',
                });
    
                await bannerModel.findByIdAndUpdate(bannerId, { banner: url });
    
                banner = await bannerModel.findById(bannerId);
    
                responseReturn(res, 200, { banner, message: 'Banner update success' });
            } catch (error) {
                console.error('Error updating banner:', error);
                responseReturn(res, 500, { message: error.message });
            }
        });
    };
}
module.exports = new bannerController()