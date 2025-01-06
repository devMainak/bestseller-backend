const mongoose = require('mongoose')

// Defining wishlist mongoose schema
const wishlistSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "BooksDatas" }
})

// Defining mongoose model for wishlist
const WishlistBooks = mongoose.model("WishlistBooks", wishlistSchema)

// Exporting wishlist model
module.exports = WishlistBooks