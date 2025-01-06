const express = require("express");
const {
  getWishlist,
  addToWishlist,
  deleteFromWishlist,
} = require("../controller/wishlist.controller");
const router = express.Router();

// Routes for wishlist
router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:bookId", deleteFromWishlist);

module.exports = router;
