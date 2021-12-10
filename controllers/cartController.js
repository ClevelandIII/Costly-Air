const { log } = require("console");
const { NotFoundError, BadRequestError } = require("../error");
const Cart = require("../models/Cart");

const createItem = async (req, res) => {
  const { quantity } = req.body
  if(quantity > 0){
    constitem = await Cart.create(req.body)
    res.status(200).json({item})
  } else {
    throw new BadRequest("Quantity must be greater than 0");
  }
};

const getAllItems = async (req, res) => {
  const item = await Cart.find({})
  res.status(200).json({item})
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

  if(!company || !position) {
    throw new BadRequestError("Please provide a company and position")
  }

  const oldItem = await Cart.findOne({ name }) 

  if(!olditem) {
    throw new BadRequestError(`no new item in your cart with the name ${name}`)
  }

  const newItem = await Cart.updateOne({ name }, {...oldItem, quantity}, {new: true, runValidators: true})

  res.status(200).json({ newItem })
};

module.exports = {
  createItem,
  getAllItems,
  removeItem,
  updateItem,
};
