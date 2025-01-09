const mongoose = require("mongoose");

// Defining wishlist mongoose schema
const cartSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "BooksDatas" },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartBooks = mongoose.model("cart", cartSchema);

module.exports = CartBooks;
