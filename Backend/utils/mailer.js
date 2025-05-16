const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail accounts only
  auth: {
    user: 'markaldas2002@gmail.com',     
    pass: 'vaqt mlvj qvlq tacr',         // app password on Gmail
  },
});

const sendVerificationEmail = (to, code) => {
  const mailOptions = {
    from: '"Instaguapo" <markaldas2002@gmail.com>',
    to,
    subject: 'Verify Your Account',
    text: `Your verification code is: ${code}`,
    html: `<h3>Your verification code is:</h3><p><b>${code}</b></p>`,
  };

  return transporter.sendMail(mailOptions);
};
const sendPasswordResetEmail = (to, resetLink) => {
  const mailOptions = {
    from: '"InstaGuapo" <your-email@gmail.com>',
    to,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset. Click the link below:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>Link expires in 1 hour.</p>
    `
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
module.exports = { sendVerificationEmail, sendPasswordResetEmail };