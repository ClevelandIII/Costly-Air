require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const buyController = async (req, res) => {
  const { totalAmount, shippingFee, purchase } = req.body;
  const calcTotal = () => {
    return totalAmount + shippingFee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calcTotal(),
    currency: "usd",
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = buyController;