const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        host: process.env.EMAIL_USER,
        host: process.env.EMAIL_PASS,
    },
   
});

module.exports = transporter;