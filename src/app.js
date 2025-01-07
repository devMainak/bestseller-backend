const express = require("express");
const cors = require("cors");

const initializeDatabase = require("./config/db.connection");

const app = express();

// cors config
const corsOptions = {
  origin: "*",
  credentials: true,
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());

// Initialize database
initializeDatabase();

// Importing routes files
app.use("/categories", require("./routes/bookCategory.routes"));
app.use("/books", require("./routes/book.routes"));
app.use("/wishlist", require("./routes/wishlist.routes"));
app.use("/cart", require("./routes/cart.routes"));
app.use("/user/address", require("./routes/userAddress.routes"));
app.use("/orders", require("./routes/order.routes"));

module.exports = app;
