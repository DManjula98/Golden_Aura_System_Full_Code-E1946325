const categoryModel = require('../../models/categoryModel');
const formidable = require('formidable');
const responseReturn = require('../../utils/response');
const cloudinary = require('../../utils/cloudinary')
const slugify = require('slugify'); 

class CategoryController {
    add_category = async (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parsing error:', err);
                return res.status(400).json({ error: 'Error parsing form data', details: err.message });
            }

            const name = fields.name ? fields.name[0] : null;
            const subcategories = JSON.parse(fields.subcategories[0]);
            subcategories.forEach((subcategory, index) => {
                subcategory.slug = slugify(subcategory.name, { lower: true, strict: true });
            });
            const image = files.image ? files.image[0] : null;

            if (!name || typeof name !== 'string' || !name.trim()) {
                console.error('Invalid name:', name);
                return res.status(400).json({ error: 'Invalid name format' });
            }

            if (!image || !image.filepath) {
                console.error('No image file provided:', image);
                return res.status(400).json({ error: 'No image file provided' });
            }

            for (let i = 0; i < subcategories.length; i++) {
            if (files[`subcategoryImage${i}`]) {
            const result = await cloudinary.uploader.upload(files[`subcategoryImage${i}`].filepath, { folder: 'subcategories' });
            subcategories[i].image = result.url;
            }
            }

            try {
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'categories' });
                if (result && result.url) {
                    const category = await categoryModel.create({
                        name: name.trim(),
                        slug: name.split(' ').join('-'),
                        image: result.url,
                        subcategories: subcategories
                    });
                    return responseReturn(res, 201, { category, message: 'Category added successfully' });
                } else {
                    console.error('Image upload failed:', result);
                    return res.status(500).json({ error: 'Image upload failed' });
                }
            } catch (error) {
                console.error('Error during Cloudinary or DB operation:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
        });
    }

    get_category = async (req, res) => {
        const { page, searchValue, parPage } = req.query
        try {
            let skipPage = ''

            if (parPage && page) {
                skipPage = parseInt(parPage) * (parseInt(page) - 1)
            }
            if (searchValue && page && parPage) {
                const categories = await categoryModel.find({
                    $text: { $search: searchValue }
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })
                const totalCategory = await categoryModel.find({
                    $text: { $search: searchValue }
                }).countDocuments()
                responseReturn(res, 200, { totalCategory, categories })
            }
            else if (searchValue === '' && page && parPage) {
                const categories = await categoryModel.find({}).skip(skipPage).limit(parPage).sort({ createdAt: -1 })
                const totalCategory = await categoryModel.find({}).countDocuments()
                responseReturn(res, 200, { totalCategory, categories })
            }
            else {
                const categories = await categoryModel.find({}).sort({ createdAt: -1 })
                const totalCategory = await categoryModel.find({}).countDocuments()
                responseReturn(res, 200, { totalCategory, categories })
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    get_category_by_Id = async (req, res) => {
        const { categoryId } = req.params;

        try {
            const category = await categoryModel.findById(categoryId);
            responseReturn(res, 200, { category });
        } catch (error) {
            console.error('Error fetching category:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }

    update_category = async (req, res) => {
        const { id, name, subcategories,image } = req.body;
       
      console.log(id)
       
        if ( !id || !name || !subcategories||!image) {
            return res.status(400).json({ error: "Missing required fields" });
          }
       

        try {
            const category = await categoryModel.findById(id);
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
              }
          
            await categoryModel.findByIdAndUpdate(id , {
                name, subcategories
            });
            
            responseReturn(res, 200, { category, message: 'Category update successful' });
        } catch (error) {
            console.error('Error updating category:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }


     delete_category = async (req, res) => {
        const { category_id } = req.params;
        try {
            await categoryModel.findByIdAndDelete(category_id);
            responseReturn(res, 200, {
                message: 'Category deleted successfully'
            });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, {
                message: 'Failed to delete category'
            });
        }
    };


    category_image_update = async (req, res) => {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return responseReturn(res, 500, { error: 'Failed to parse form data' });
            }
            const { categoryId, oldImage } = fields;
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
    
                const result = await cloudinary.uploader.upload(newImage[0].filepath, { folder: 'categories' });
    
                if (result) {
                    let category = await categoryModel.findById(categoryId);
                    const images = category.image || [];
                    const filteredImages = images.filter((img) => img !== oldImage); 
                    filteredImages.push(result.url); 
    
                    category.image = filteredImages;
                    await category.save();
  
                    const publicId = oldImage.split('/').pop().split('.')[0]; 
                    await cloudinary.uploader.destroy(`categories/${publicId}`);
    
            
                    await categoryModel.findByIdAndUpdate(categoryId, { images });
    
                    category = await categoryModel.findById(categoryId);
                    responseReturn(res, 200, { category, message: 'Category image update successful' });
                } else {
                    responseReturn(res, 400, { error: 'Image upload failed' });
                }
            } catch (error) {
                console.error('Error updating category image:', error);
                responseReturn(res, 500, { error: error.message });
            }
        });
    }
    
}


module.exports = new CategoryController();
