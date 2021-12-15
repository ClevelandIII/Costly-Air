require("dotenv").config();
const nodemailer = require("nodemailer");

const genrandy = () => {
  return Math.ceil(Math.random() * 10 ** 11);
};
// console.log(ralsei);

const id = async (req, res) => {
  const id = genrandy();
  const message = {
    from: "etherial@do-not-email.com",
    to: "	remington.kassulke66@ethereal.email",
    subject: "Password Reset",
    text: `Here is the link to reset the password: http://localhost:3000/reset/:id and the token to reset the password is ${id}`,
    html: `<a href='http://localhost:3000/reset/:id'>Here is the link to reset the password</a> <p>and the token to reset the password is ${id}</p>`,
  };
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "	remington.kassulke66@ethereal.email",
      pass: process.env.MAILER_PASS,
    },
  });

  const info = await transporter.sendMail(message);

  res.json(info);
};

module.exports = id;
