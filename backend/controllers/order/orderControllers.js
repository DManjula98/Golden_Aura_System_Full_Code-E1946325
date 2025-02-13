const authOrderModel = require("../../models/authOrderModel");
const Order = require("../../models/OrderModel");
const cartModel = require("../../models/cartModel");
const Customer = require("../../models/customerModel");
const productModel = require('../../models/productModel');
const moment = require("moment");
const responseReturn = require("../../utils/response");
const myShopWallet = require("../../models/myShopWallet");
const sellerWallet = require("../../models/sellerWallet");
const {
  mongo: { ObjectId },
} = require("mongoose");
const stripe = require("stripe")(process.env.stripe_key);
const nodemailer = require("nodemailer");
const { formatPrice } = require("../../utils/formatUtils");

class orderControllers {
  paymentCheck = async (id) => {
    try {
      const order = await Order.findById(id);
      if (order.payment_status === "unpaid") {
        await Order.findByIdAndUpdate(id, {
          delivery_status: "cancelled",
        });
        for (let i = 0; i < order.products.length; i++) {
          await productModel.findByIdAndUpdate(order.products[i]._id, { 
              $inc: { stock: order.products[i].quantity }
          });
      }
        await authOrderModel.updateMany(
          {
            orderId: id,
          },
          {
            delivery_status: "cancelled",
          }
        );
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  place_order = async (req, res) => {
    try {
      const { price, products, delivery_fee, deliverInformation, userId, productId } =
        req.body;

      let authOrderData = [];
      let cartId = [];

      const tempDate = moment(Date.now()).format("LLL");
      console.log(tempDate);

      let customerOrderProduct = [];

      for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        for (let j = 0; j < pro.length; j++) {
          let tempCusPro = pro[j].productInformation;
          console.log(tempCusPro);
          tempCusPro.quantity = pro[j].quantity;
          customerOrderProduct.push(tempCusPro);
          if (pro[j]._id) {
            cartId.push(pro[j]._id);
          }

          const productStock = await productModel.findById(pro[j].productInformation._id);
            if (!productStock || productStock.stock < pro[j].quantity) {
                return responseReturn(res, 400, { error: "Insufficient stock" });
            }
        }
      }

      try {
        const order = await Order.create({
          customerId: userId,    
          deliverInformation,
          products: customerOrderProduct,
          price: price + delivery_fee,
          delivery_status: "pending",
          payment_status: "unpaid",
          date: tempDate,
        });
        //shops
        for (let i = 0; i < products.length; i++) {
          const pro = products[i].products;
          const pri = products[i].price;
          const sellerId = products[i].sellerId;
          let storePro = [];
          for (let j = 0; j < pro.length; j++) {
            let tempPro = pro[j].productInformation;
            tempPro.quantity = pro[j].quantity;
            storePro.push(tempPro);
          }
          authOrderData.push({
            orderId: order.id,
            sellerId,
            products: storePro,
            price: pri,
            payment_status: "unpaid",
            deliverInformation: "Golden Aura Warehouse",
            delivery_status: "pending",
            date: tempDate,
          });
        }
        await authOrderModel.insertMany(authOrderData);

        for (let k = 0; k < cartId.length; k++) {
          await cartModel.findByIdAndDelete(cartId[k]);
        }
        //delivery cancell
        setTimeout(() => {
          this.paymentCheck(order.id);
        }, 15000);
        responseReturn(res, 201, {
          message: "Order placeed success",
          orderId: order.id,
        });
      } catch (error) {
        console.log(error.message);
      }
      responseReturn(res, 201, { message: "Order placed successfully" });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_customer_dashboard_data = async (req, res) => {
    const { userId } = req.params;
    try {
      const recentOrders = await Order.find({
        customerId: new ObjectId(userId),
      }).limit(5);
      const pendingOrder = await Order.find({
        customerId: new ObjectId(userId),
        delivery_status: "pending",
      }).countDocuments();
      const totalOrder = await Order.find({
        customerId: new ObjectId(userId),
      }).countDocuments();
      const cancelledOrder = await Order.find({
        customerId: new ObjectId(userId),
        delivery_status: "cancelled",
      }).countDocuments();

      responseReturn(res, 200, {
        recentOrders,
        pendingOrder,
        cancelledOrder,
        totalOrder,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_orders = async (req, res) => {
    const { customerId, status } = req.params;

    try {
      let orders = [];
      if (status !== "all") {
        orders = await Order.find({
          customerId: new ObjectId(customerId),
          delivery_status: status,
        });
      } else {
        orders = await Order.find({
          customerId: new ObjectId(customerId),
        });
      }
      responseReturn(res, 200, {
        orders,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await Order.findById(orderId);
      responseReturn(res, 200, {
        order,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_admin_orders = async (req, res) => {
    let { page, parPage, searchValue } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        const orders = await Order.aggregate([
          {
            $lookup: {
              from: "authorders",
              localField: "_id",
              foreignField: "orderId",
              as: "suborder",
            },
          },
        ])
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrder = await Order.aggregate([
          {
            $lookup: {
              from: "authorders",
              localField: "_id",
              foreignField: "orderId",
              as: "suborder",
            },
          },
        ]);
        responseReturn(res, 200, { orders, totalOrder: totalOrder.length });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //view order
  get_admin_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await Order.aggregate([
        {
          $match: { _id: new ObjectId(orderId) },
        },
        {
          $lookup: {
            from: "authorders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborder",
          },
        },
      ]);
      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      console.log("get admin order " + error.message);
    }
  };

  admin_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      await Order.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      responseReturn(res, 200, { message: "order status change success" });
    } catch (error) {
      console.log("get admin order status error " + error.message);
      responseReturn(res, 500, { message: "internal server error" });
    }
  };

  get_seller_orders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, parPage, searchValue } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        const orders = await authOrderModel
          .find({
            sellerId,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalOrder = await authOrderModel
          .find({
            sellerId,
          })
          .countDocuments();
        responseReturn(res, 200, { orders, totalOrder });
      }
    } catch (error) {
      console.log("get seller order error " + error.message);
      responseReturn(res, 500, { message: "internal server error" });
    }
  };

  // view order
  get_seller_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await authOrderModel.findById(orderId);

      responseReturn(res, 200, { order });
    } catch (error) {
      console.log("get admin order " + error.message);
    }
  };

  seller_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await authOrderModel.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      responseReturn(res, 200, { message: "order status change success" });
    } catch (error) {
      console.log("get admin order status error " + error.message);
      responseReturn(res, 500, { message: "internal server error" });
    }
  };

  create_payment = async (req, res) => {
    const { price } = req.body;

    try {
      const payment = await stripe.paymentIntents.create({
        amount: Math.round(price * 100),
        currency: "lkr",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      responseReturn(res, 200, { clientSecret: payment.client_secret });
    } catch (error) {
      console.log(error.message);
    }
  };

  order_confirm = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await Order.findById(orderId);
        if (!order) {
            return responseReturn(res, 404, { error: "Order not found" });
        }

        if (order.payment_status === "paid") {
            return responseReturn(res, 400, { error: "Order is already paid" });
        }

        for (let i = 0; i < order.products.length; i++) {
          const product = await productModel.findById(order.products[i]._id);

          if (product.stock < order.products[i].quantity) {
              return responseReturn(res, 400, { error: `Insufficient stock for ${product.name}` });
          }

          await productModel.findByIdAndUpdate(order.products[i]._id, {
              $inc: { stock: -order.products[i].quantity } 
          });
      }

      await Order.findByIdAndUpdate(orderId, {
        payment_status: "paid",
        delivery_status: "pending",
      });
      await authOrderModel.updateMany(
        { orderId: new ObjectId(orderId) },
        {
          payment_status: "paid",
          delivery_status: "pending",
        }
      );
      const cuOrder = await Order.findById(orderId);

      const auOrder = await authOrderModel.find({
        orderId: new ObjectId(orderId),
      });

      const time = moment(Date.now()).format("l");

      const splitTime = time.split("/");

      await myShopWallet.create({
        amount: cuOrder.price,
        month: splitTime[0],
        year: splitTime[2],
      });

      for (let i = 0; i < auOrder.length; i++) {
        await sellerWallet.create({
          sellerId: auOrder[i].sellerId.toString(),
          amount: auOrder[i].price,
          month: splitTime[0],
          year: splitTime[2],
        });
      }

      const customerId = cuOrder.customerId; 
      if (!ObjectId.isValid(customerId)) {
        return res
          .status(400)
          .json({ message: "Invalid Customer ID in Order" });
      }

      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      const customMessage = `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
           <p> Dear <strong> ${customer.name},</strong></p>
           <p style="color: #4CAF50; font-size: 12px;"">Thank you for your order!</p>
           <p style="font-size: 12px;">Your order with Order ID <strong>#${orderId} </strong>has been confirmed.
            I hope you enjoy your new purchase and look forward to serving you again soon. Below is the detailed receipt for your recent purchase:</p>
            </div>
          `;

      const receiptHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h1 style="text-align: center; color: #4CAF50;">Order Receipt</h1>
              <p><strong>Order ID:</strong> ${orderId}</p>
               <p><strong>Total Price:</strong> ${formatPrice(
                 cuOrder.price
               )}</p>
              <h3 style="margin-top: 20px;">Products:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #f9f9f9; text-align: left;">
                    <th style="border: 1px solid #ddd; padding: 8px;">No</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Shop Name</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${cuOrder.products
                    .map(
                      (product, index) => `
                      <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${
                          index + 1
                        }</td>
                         <td style="border: 1px solid #ddd; padding: 8px;">${
                           product.shopName
                         }</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${
                          product.name
                        }</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${
                          product.quantity
                        }</td>
                       <td style="border: 1px solid #ddd; padding: 8px;">${formatPrice(
                         product.price
                       )}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formatPrice(
                product.quantity * product.price
              )}</td>
       </tr>
                    `
                    )
                    .join("")}
                </tbody>
              </table>
              <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;">
              <p style="text-align: center; color: #777;">Thank you for shopping with us!<br>We hope to see you again soon.</p>
             <p style="ttext-align: left; color: black;"><strong>Best regards,</strong><br> <strong>Golden Aura</strong></p>
              </div>
              
          `;

      const finalHtmlContent = customMessage + receiptHtml;

      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.Google_user,
          pass: process.env.Google_password 
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      transporter.sendMail({
        to: customer.email,
        subject: "Order Confirmation and Receipt",
        text: `Dear ${customer.name},\n\nYour order with Order ID ${orderId} has been confirmed`,
        html: finalHtmlContent,
      });
      console.log("Email sent successfully");

      responseReturn(res, 200, { message: "Order confirmed and receipt sent" });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new orderControllers();
