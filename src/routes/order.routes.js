const express = require("express");
const {
  getOrders,
  saveOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controller");
const router = express.Router();

// Routes for order
router.get("/", getOrders);
router.post("/", saveOrder);
router.post("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

module.exports = router;
