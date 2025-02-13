const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/tokenCreate");
const { get } = require("mongoose");
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const responseReturn = require("../utils/response");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success" });
        } else {
          responseReturn(res, 404, { error: "Invalid Password" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select("+password");
      if (seller) {
        const match = await bcrypt.compare(password, seller.password);
        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success" });
        } else {
          responseReturn(res, 404, { error: "Invalid Password" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  seller_register = async (req, res) => {
    const { email,name,password} = req.body
    try {
      const getUser = await sellerModel.findOne({email})
      if(getUser){
        responseReturn(res,404,{error : 'Email Already Exit'})
      }else{
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "menualy",
          shopInformation: {}
        })
        await sellerCustomerModel.create({
          myId : seller.id
        })
        const token = await  createToken({id: seller.id, role : seller.role})
        res.cookie('accessToken', token,{
          expires : new Date(Date.now() + 7*24*60*60*1000)
        })
       responseReturn(res, 201, {token, message: "Registration Success"})
      }
    } catch (error) {
      responseReturn(res,500,{error : 'Internal Server Error'})
    }
  } 

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInformaion: user });
      } else {
        const seller = await sellerModel.findById(id);
        responseReturn(res, 200, { userInformaion: seller });
      }
    } catch (error) {
      responseReturn(res,500,{error : 'Internal Server Error'})
    }
  };


  profile_image_upload = async (req, res) => {
    const { id } = req;
    const form = new formidable.IncomingForm();
  
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err.message);
            return responseReturn(res, 400, { error: 'Error parsing form data' });
        }
  
        const image = files.image && files.image[0]; 
  
        if (!image || !image.filepath) {
            console.error('No image file provided:', image);
            return responseReturn(res, 400, { error: 'No image file provided' });
        }
  
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
            secure: true
        });
  
        try {
            const result = await cloudinary.uploader.upload(image.filepath, { folder: 'profiles' });
  
            if (result && result.url) {
                await sellerModel.findByIdAndUpdate(id, { image: result.url });
                const userInformation = await sellerModel.findById(id);
                responseReturn(res, 201, { message: 'Image upload success', userInformation });
            } else {
                responseReturn(res, 404, { error: 'Image upload failed' });
            }
        } catch (error) {
            console.error('Image upload error:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    });
  }

  profile_information_add = async (req, res) => {
    const {  shopName,province,district, city} = req.body;
    const { id } = req;

    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInformation: {
              shopName,
              province,
              district,
              city
          }
      })
      const userInformaion = await sellerModel.findById(id)
      responseReturn(res, 201, { message: 'Profile info add success', userInformaion })
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }

  admin_profile_image_upload = async (req, res) => {
    const { id } = req;
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
          console.error('Error parsing form:', err.message);
          return responseReturn(res, 400, { error: 'Error parsing form data' });
      }

      const image = files.image && files.image[0]; 

      if (!image || !image.filepath) {
          console.error('No image file provided:', image);
          return responseReturn(res, 400, { error: 'No image file provided' });
      }

      cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_API_KEY,
          api_secret: process.env.CLOUD_API_SECRET,
          secure: true
      });

      try {
          const result = await cloudinary.uploader.upload(image.filepath, { folder: 'admin_profiles' });

          if (result && result.url) {
              await adminModel.findByIdAndUpdate(id, { image: result.url });
              const userInformation = await adminModel.findById(id);
              responseReturn(res, 201, { message: 'Image upload success', userInformation });
          } else {
              responseReturn(res, 404, { error: 'Image upload failed' });
          }
      } catch (error) {
          console.error('Image upload error:', error.message);
          responseReturn(res, 500, { error: error.message });
      }
    });
  }

  updateProfile = async (req, res) => {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const admin = await adminModel.findById(id);
      if (!admin) {
        return res.status(404).json({ error: "User not found" });
      }

      await adminModel.findByIdAndUpdate(id, { name, email });
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateSellerProfile = async (req, res) => {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const seller = await sellerModel.findById(id);
      if (!seller) {
        return res.status(404).json({ error: "User not found" });
      }

      await sellerModel.findByIdAndUpdate(id, { name, email });
  
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error('Error updating seller:', error.message);
      responseReturn(res, 500, { error: error.message });
    }
  };

  updateSellerShopProfile = async (req, res) => {
    const { id, shopName, district, province, city } = req.body;

    if (!id || !shopName || !district || !province || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const seller = await sellerModel.findById(id);

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    seller.shopInformation = {
      shopName,
      district,
      province,
      city,
    };

    await seller.save();

      res.status(200).json({
        message: "Shop profile updated successfully",
        shopInformation: seller.shopInformation,
      });
    } catch (error) {
      console.error("Error updating seller shop profile:", error.message);
      res.status(500).json({ error: "An error occurred while updating the shop profile" });
    }
  };

  delete_seller = async (req, res) => {
    const {sellerId } = req.params;

    try {

    const seller = await sellerModel.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
      await sellerModel.findByIdAndDelete(sellerId);
      responseReturn(res, 200, {
          message: 'Seller deleted successfully'
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, {
          message: 'Failed to delete seller'
      });
    }
  };


  sellerUpdatePassword = async (req, res) => {
    const { id, email, password, new_password } = req.body;

    if (!email || !password || !new_password) {
      return responseReturn(res, 400, { error: 'Missing required fields' });
    }

    try {
      const seller = await sellerModel.findOne({ email }).select('+password');
      
      if (!seller) {
          return responseReturn(res, 404, { error: 'seller not found' });
      } 

      const match = await bcrypt.compare(password, seller.password);
      
      if (!match) {
          return responseReturn(res, 401, { error: 'Invalid current password' });
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

      seller.password = hashedPassword;
      await seller.save(); 

      responseReturn(res, 200, { message: 'Seller password updated successfully' });
    } catch (error) {
      console.error('Error updating seller password:', error.message);
      responseReturn(res, 500, { error: error.message });
    }
  };

  adminUpdatePassword = async (req, res) => {
    const { id, email, password, new_password } = req.body;

    if (!email || !password || !new_password) {
      return responseReturn(res, 400, { error: 'Missing required fields' });
    }

    try {
      const admin = await adminModel.findOne({ email }).select('+password');
      
      if (!admin) {
          return responseReturn(res, 404, { error: 'admin not found' });
      } 

      
      const match = await bcrypt.compare(password, admin.password);
      
      if (!match) {
          return responseReturn(res, 401, { error: 'Invalid current password' });
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

        admin.password = hashedPassword;
        await admin.save(); 

      responseReturn(res, 200, { message: 'Admin password updated successfully' });
    } catch (error) {
        console.error('Error updating admin password:', error.message);
        responseReturn(res, 500, { error: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      res.cookie('accessToken',null,{
          expires : new Date(Date.now()),
          httpOnly : true
      })
      responseReturn(res,200,{message : 'Logout Success'})
    } catch (error) {
      responseReturn(res, 500, { error: error.message })
    }
  }
  
}

module.exports = new authControllers();
