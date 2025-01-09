const mongoose = require("mongoose");

// Order summary schema
const orderSchema = new mongoose.Schema(
  {
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "BooksDatas" }],
    totalAmount: { type: Number, default: 0 },
    totalBookCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
