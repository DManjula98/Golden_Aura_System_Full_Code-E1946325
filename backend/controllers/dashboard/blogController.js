const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const blogModel = require('../../models/blogModel');
const responseReturn = require('../../utils/response');

class blogController {
    add_blog = async (req, res) => {
        const { id } = req
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err.message);
                return responseReturn(res, 500, { error: err.message });
            }
            let { name, title,  description, first_topic, first_description,second_topic, second_description, third_topic, third_description,forth_topic,forth_description,fifth_topic,fifth_description,  shopName, brand } = fields;
            const { images } = files;

            name = String(name || "").trim();
            title = String(title || "").trim();
            description = String(description || "").trim();
            first_topic = String(first_topic || "").trim();
            first_description = String(first_description || "").trim();
            second_topic = String(second_topic || "").trim();
            second_description = String(second_description || "").trim();
            third_topic = String(third_topic || "").trim();
            third_description = String(third_description || "").trim();
            forth_topic = String(forth_topic || "").trim();
            forth_description = String(forth_description || "").trim();
            fifth_topic = String(fifth_topic || "").trim();
            fifth_description = String(fifth_description || "").trim();
            shopName = String(shopName || "").trim();
            brand = String(brand || "").trim();

            if (!name || !title  || !description ||!first_topic ||!first_description || !shopName || !brand) {
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
                        const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'blogs' });
                        allImageUrl.push(result.url);
                    }
                }
                await blogModel.create({
                    sellerId:id,
                    name,
                    slug,
                    shopName,
                    title,
                    description,
                    fifth_topic,
                    first_description,
                    second_topic,
                    second_description,
                    third_topic,
                    third_description,
                    forth_topic,
                    forth_description,
                    first_topic,
                    fifth_description,
                    images: allImageUrl,
                    brand

                })
                
                responseReturn(res, 201, { message: "blog added successfully" });
            } catch (error) {
                console.error('Error during blog addition:', error.message);
                responseReturn(res, 500, { error: error.message });
            }
        });
    }


    blogs_get = async (req, res) => {
        const { page, searchValue, parPage } = req.query;
        const { id } = req;
        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        try {
            if (searchValue) {
                const blogs = await blogModel.find({
                    $text: { $search: searchValue },
                    sellerId: id
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 });

                const totalblog = await blogModel.find({
                    $text: { $search: searchValue },
                    sellerId: id
                }).countDocuments();

                responseReturn(res, 200, { totalblog, blogs });
            } else {
                const blogs = await blogModel.find({ sellerId: id }).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
                const totalblog = await blogModel.find({ sellerId: id }).countDocuments();

                responseReturn(res, 200, { totalblog, blogs });
            }    
        } catch (error) {
            console.error('Error fetching blogs:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }


    blog_get = async (req, res) => {
        const { blogId } = req.params;

        try {
            const blog = await blogModel.findById(blogId);
            responseReturn(res, 200, { blog });
        } catch (error) {
            console.error('Error fetching blog:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }

    blog_update = async (req, res) => {
        let { name, title, description, first_topic,first_description,second_topic,second_description,third_topic,third_description, forth_topic,forth_description,fifth_topic,fifth_description, brand, blogId,  } = req.body;
        name = name.trim();
        const slug = name.split(' ').join('-');

        try {
            await blogModel.findByIdAndUpdate(blogId, {
                name, title, description,first_topic,first_description,second_topic,second_description, third_topic, third_description, forth_topic,forth_description,fifth_topic,fifth_description, brand,slug
            });
            const blog = await blogModel.findById(blogId);
            responseReturn(res, 200, { blog, message: 'blog update successful' });
        } catch (error) {
            console.error('Error updating blog:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    }

    blog_image_update = async (req, res) => {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return responseReturn(res, 500, { error: 'Failed to parse form data' });
            }
            const { blogId, oldImage } = fields;
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
    
                const result = await cloudinary.uploader.upload(newImage[0].filepath, { folder: 'blogs' });
    
                if (result) {
                    let blog = await blogModel.findById(blogId);
                    const images = blog.images || [];
                    const filteredImages = images.filter((img) => img !== oldImage); 
                    filteredImages.push(result.url); 
    
                    
                    blog.images = filteredImages;
                    await blog.save();
    
                    
                    const publicId = oldImage.split('/').pop().split('.')[0]; 
                    await cloudinary.uploader.destroy(`blogs/${publicId}`);
    
                    await blogModel.findByIdAndUpdate(blogId, { images });
    
                    blog = await blogModel.findById(blogId);
                    responseReturn(res, 200, { blog, message: 'blog image update successful' });
                } else {
                    responseReturn(res, 400, { error: 'Image upload failed' });
                }
            } catch (error) {
                console.error('Error updating blog image:', error);
                responseReturn(res, 500, { error: error.message });
            }
        });
    }
    
     
    delete_blog = async (req, res) => {
        const {blogId } = req.params;
        try {
            await blogModel.findByIdAndDelete(blogId);
            responseReturn(res, 200, {
                message: 'blog deleted successfully'
            });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, {
                message: 'Failed to delete blog'
            });
        }
    };
    
}
module.exports = new blogController();