const customerModel = require('../../models/customerModel')
const responseReturn = require("../../utils/response");
const bcrypt = require("bcrypt");
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const { createToken } = require("../../utils/tokenCreate");
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const nodemailer = require('nodemailer');


class customerAuthControllers {
    customer_register= async(req,res)=>{
        const { name,email, password } = req.body;

        try {
            const customer = await customerModel.findOne({ email })
           // console.log(customer)
            if (customer) {
                responseReturn(res, 404, { error: 'Email already Exits' })
                const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name.trim())) {
            return responseReturn(res, 400, { error: 'Name can only contain letters and spaces.' });
        }
            } else {
                const createCustomer = await customerModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password, 10),
                    method: 'manually'
                })
                await sellerCustomerModel.create({
                    myId: createCustomer.id
                })
                const token = await createToken({
                    id: createCustomer.id,
                    name: createCustomer.name,
                    email: createCustomer.email,
                    method: createCustomer.method
                })
                res.cookie('customerToken', token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })
                responseReturn(res, 201, { message: 'Registration Success', token })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    customer_login  = async (req, res) => {
        const { email, password } = req.body
        try {
            const customer = await customerModel.findOne({ email }).select('+password')
            if (customer) {
                const match = await bcrypt.compare(password, customer.password)
                if (match) {
                    const token = await createToken({
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                        method: customer.method
                    })
                    res.cookie('customerToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    })
                    responseReturn(res, 201, { message: 'Login Success', token })
                } else {
                    responseReturn(res, 404, { error: "Password Wrong" })
                }
            } else {
                responseReturn(res, 404, { error: 'Email Not Found' })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    customer_logout = async(req,res)=>{
        res.cookie('customerToken',"",{
            expires : new Date(Date.now())
        })
        responseReturn(res,200,{message : 'Logout success'})
    }

    customer_profile_image_upload  = async (req, res) => {
        const { id } = req;
        
        const form = new formidable.IncomingForm();
      
        form.parse(req, async (err, fields, files) => {
            if (err) {
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
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'customer_profiles' });
      
                if (result && result.url) {
                    await customerModel.findByIdAndUpdate(id, { image: result.url });
                    const userInformation = await customerModel.findById(id);
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
          const customer = await customerModel.findById(id);
          if (!customer) {
            return res.status(404).json({ error: "User not found" });
          }
      
          await customerModel.findByIdAndUpdate(id, { name, email });
        
          res.status(200).json({ message: "Profile updated successfully" });
        } catch (error) {
            console.error('Error updating customer:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    };

    delete_customer = async (req, res) => {
        const {customerId } = req.params;
      
        try {
      
          const customer = await customerModel.findById(customerId);
    
          if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
          }
            await customerModel.findByIdAndDelete(customerId);
            responseReturn(res, 200, {
                message: 'Customer deleted successfully'
            });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, {
                message: 'Failed to delete Customer'
            });
        }
      };

      updatePassword = async (req, res) => {
        const { id, email, password, new_password } = req.body;
    
        if (!email || !password || !new_password) {
            return responseReturn(res, 400, { error: 'Missing required fields' });
        }
    
        try {
            const customer = await customerModel.findOne({ email }).select('+password');
            
            if (!customer) {
                return responseReturn(res, 404, { error: 'Customer not found' });
            }
    
            const match = await bcrypt.compare(password, customer.password);
            
            if (!match) {
                return responseReturn(res, 401, { error: 'Invalid current password' });
            }
    
            const hashedPassword = await bcrypt.hash(new_password, 10);
    
            customer.password = hashedPassword;
            await customer.save(); 
    
            responseReturn(res, 200, { message: 'Customer password updated successfully' });
        } catch (error) {
            console.error('Error updating customer password:', error.message);
            responseReturn(res, 500, { error: error.message });
        }
    };

    requestPasswordReset = async (req, res) => {
        const { email } = req.body;
    
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
    
        try {
            const customer = await customerModel.findOne({ email });
            if (!customer) {
                return res.status(404).json({ error: "Email not found" });
            }
    
            const resetToken = crypto.randomBytes(32).toString('hex');
            const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
            customer.resetPasswordToken = tokenHash;
            customer.resetPasswordExpire = Date.now() + 15 * 60 * 1000; 
            await customer.save();
    
             var transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                      user: "dilrukshimanjula14@gmail.com",
                      pass: "sqve usnn gohw abxk",
                    },
                    tls: {
                      rejectUnauthorized: false,
                    },
                  });
                  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
            const mailOptions = {
                from: 'dilrukshimanjula14@gmail.com',
                to: customer.email,
                subject: 'Password Reset Request',
                text: `You requested a password reset. Use this token to reset your password: ${resetLink}. This token expires in 15 minutes.`,
            };
    
            await transporter.sendMail(mailOptions);
    
            res.status(200).json({ message: "Password reset email sent." });
        } catch (error) {
            console.error('Error requesting password reset:', error.message);
            res.status(500).json({ error: error.message });
        }
    };

    resetPassword = async (req, res) => {
        const { token, new_password } = req.body;
   
        console.log('Received token:', token);
        console.log('Received new_password:', new_password);
    
        if (!token || !new_password) {
            return responseReturn(res, 400, { error: 'Token and new password are required' });
        }
    
        try {
            const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
            console.log('Hashed token:', tokenHash);

            const customer = await customerModel.findOne({
                resetPasswordToken: tokenHash,
                resetPasswordExpire: { $gt: Date.now() },
            });
    
            if (!customer) {
                return responseReturn(res, 400, { error: 'Invalid or expired token' });
            }
    
            const hashedPassword = await bcrypt.hash(new_password, 10);
            console.log('Hashed new password:', hashedPassword);
    
            customer.password = hashedPassword;
            customer.resetPasswordToken = undefined; 
            customer.resetPasswordExpire = undefined; 
    
            await customer.save(); 
    
            return responseReturn(res, 200, { message: 'Password reset successful' });
        } catch (error) {
            console.error('Error resetting password:', error.message);
            return responseReturn(res, 500, { error: error.message });
        }
    };
}
module.exports = new customerAuthControllers()