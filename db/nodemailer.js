const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // replace with your email;
    pass: "password", // replace with your password;
  },
});

const sendVerificationCode = async (email, token) => {
  await mailTransporter.sendMail({
    from: "your-email@gmail.com",
    to: email,
    subject: `Your Verification Code`,
    html: `<a href="http://localhost:5001/api/verify?token=${token}>Log In </a>`,
  });
};

module.exports = { sendVerificationCode };
