const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail accounts only
  auth: {
    user: 'markaldas2002@gmail.com',     // your email
    pass: 'vaqt mlvj qvlq tacr',         // app password (not your real password)
  },
});

const sendVerificationEmail = (to, code) => {
  const mailOptions = {
    from: '"Instaguapo" <your-email@gmail.com>',
    to,
    subject: 'Verify Your Account',
    text: `Your verification code is: ${code}`,
    html: `<h3>Your verification code is:</h3><p><b>${code}</b></p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };