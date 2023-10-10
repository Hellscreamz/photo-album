const nodemailer = require('nodemailer');
const { Message } = require('../models');
require('dotenv').config();

async function sendEmail(name, email, message) {
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

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}

async function saveMessage(name, email, message) {
  return Message.create({ name, email, message });
}

module.exports = {
  sendEmail,
  saveMessage,
};
