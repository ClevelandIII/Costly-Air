const { log } = require("console");
const { NotFoundError, BadRequest } = require("../error");
const Cart = require("../models/cartSchema");

const createItem = async (req, res) => {
  const { quantity } = req.body
  if(quantity > 0){
    const item = await Cart.create(req.body)
    res.status(200).json({item})
  } else {
    throw new BadRequest("Quantity must be greater than 0");
  }
};

const getAllItems = async (req, res) => {
  const cart = await Cart.find({})
  res.status(200).json({cart})
};

const removeItem = async (req, res) => {
  const {
    params : {id : name},
  } = req

  const item = await Cart.deleteOne({ name })

  if(!item) {
    throw new NotFoundError(`no item in your cart with the name ${name}`)
  }

  res.status(200).json({ item })
}

const updateItem = async (req, res) => {
  const {
    body : {quantity},
    params : { id : name}
  } = req

  log(quantity)

  const newItem = await Cart.updateOne({ name }, {quantity}, {new: true, runValidators: true})

  res.status(200).json({ newItem })
};

module.exports = {
  createItem,
  getAllItems,
  removeItem,
  updateItem,
};
