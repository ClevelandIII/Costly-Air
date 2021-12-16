require("dotenv").config();
const nodemailer = require("nodemailer");
let message = {
  //Yeah i think ill stick with the example. Naa it doesnt save any time and yes its lazy and.......
  from: "sender@server.com",
  to: "receiver@sender.com",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>",
};

const sendEmail = async (req, res) => {
  const { price, cart } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "remington.kassulke66@ethereal.email",
      pass: process.env.MAILER_PASS,
    },
  });

  log(cart)

  message.text = `$${price/100} was your total ${cart}`;
  message.html = `<h1>$${price/100}</h1><p> was your total</p>`;

  const info = await transporter.sendMail(message);

  res.json(info);
};

module.exports = sendEmail;
