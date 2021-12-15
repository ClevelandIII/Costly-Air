require("dotenv").config();
const nodemailer = require("nodemailer");
const message = {
  //Yeah i think ill stick with the example. Naa it doesnt save any time and yes its lazy and.......
  from: "sender@server.com",
  to: "receiver@sender.com",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>",
};

const sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "remington.kassulke66@ethereal.email",
      pass: process.env.MAILER_PASS,
    },
  });

  const info = await transporter.sendMail(message);

  res.json(info);
};

module.exports = sendEmail;
