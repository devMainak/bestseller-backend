const mongoose = require('mongoose')

// Defining wishlist mongoose schema
const wishlistSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "BooksDatas" }
})

const WishlistBooks = mongoose.model("WishlistBooks", wishlistSchema)

module.exports = WishlistBooks