const express = require("express");
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} = require("../controller/cart.controller");
const router = express.Router();

// Routes for cart
router.get("/", getCart);
router.post("/", addToCart);
router.put("/:bookId", updateCart);
router.delete("/:bookId", removeFromCart);

module.exports = router;
