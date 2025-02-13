const router = require("express").Router();
const express = require("express");
const nodemailer = require("nodemailer");

router.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
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
    const mailOptions = {
      from: email,
      replyTo: `${name} <${email}>`,
      to: "dilrukshimanjula14@gmail.com",
      subject: `Contact Form Submission from ${name}`,
      text: `Message: ${message}\n\nReply To: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

module.exports = router;
