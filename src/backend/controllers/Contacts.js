const nodemailer = require('nodemailer');
const { Message } = require('../models');

require('dotenv').config();

exports.submitMessage = async (req, res) => {
    try {
      const { name, email, message } = req.body;

      await Message.create({ name, email, message });

      // Send an email to the system address
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: email,
        to: 'system@email.com', // Change this to your system email address
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.status(201).json({ message: 'Message submitted successfully' });
    } catch (error) {
      console.error('Error submitting message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
