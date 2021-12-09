require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const stripeController = require("./controllers/stripeCon");

const notFoundError = require("./middleware/not-Availible");
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 3000;

app
  .use(express.json())

  .use(express.static("./public"))

  .post("/stripe", stripeController)

  .use(notFoundError);
// .use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(port, console.log(`listening at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
