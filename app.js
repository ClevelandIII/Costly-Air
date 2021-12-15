const port = process.env.PORT || 3000;

require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const buyController = require("./controllers/buyController");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

const notFoundError = require("./middleware/not-Availible");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require('./DB/connect-function')
const sendEmail = require("./controllers/sendEmail");
//routes

app
  .use(express.json())
  .use(express.static("./public"))
  .use(fileUpload({ useTempFiles: true }))

  .get('/send', sendEmail)
  .get('/reset')
  .post("/stripe", buyController)
  .use("/api/v1/products", productRouter)
  .use("/api/v1/cart", cartRouter)

  // .use(notFoundError);
// .use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL).then(
      app.listen(port, console.log(`listening at port ${port}`))
    );
  } catch (error) {
    console.log(error);
  }
};

start();
