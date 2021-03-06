const express = require("express");
const {
  createItem,
  getAllItems,
  removeItem,
  updateItem,
  removeAllItems,
} = require("../controllers/cartController");
const router = express.Router();

router.route("/").post(createItem).get(getAllItems).delete(removeAllItems);
router.route("/:id").delete(removeItem).post(updateItem);

module.exports = router;
