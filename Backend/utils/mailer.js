const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASS ,       
  },
});

const sendVerificationEmail = (to, code) => {
  return transporter.sendMail ({
    from: '"Instaguapo" <markaldas2002@gmail.com>',
    to,
    subject: 'Verify Your Account',
    text: `Your verification code is: ${code}`,
    html: `<h3>Your verification code is:</h3><p><b>${code}</b></p>`,
  });

};

const sendPasswordResetEmail = (to, code) => {
  const mailOptions = {
    from: '"Instaguapo" <markaldas2002@gmail.com>',
    to,
    subject: 'Password Reset Code',
    html: `<p>Your password reset code is: <b>${code}</b></p>`
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };