const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

// nodemailer setup
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    service: 'Gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
   
});

module.exports = transporter;