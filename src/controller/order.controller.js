const Order = require("../models/order.model");

// Function to get order
const readOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw error;
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await readOrders();
    if (orders.length > 0) {
      res.status(200).json({ message: "Order fetched successfully", orders });
    } else {
      res.status(400).json({ message: "Failed to fetch orders" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Function to add a new order summary
const addNewOrder = async (newOrder) => {
  try {
    const orderToSave = new Order(newOrder);
    const savedOrder = await orderToSave.save();
    return savedOrder;
  } catch (error) {
    throw error;
  }
};

exports.saveOrder = async (req, res) => {
  const { order } = req.body;
  try {
    const savedOrder = await addNewOrder(order);
    if (savedOrder) {
      const populatedOrder = await Order.findById(savedOrder._id).populate(
        "books"
      );
      res.status(201).json({
        message: "Order saved successfully",
        savedOrder: populatedOrder,
      });
    } else {
      res.status(400).json({ message: "Failed to save order" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save order" });
  }
};

// Function to update existing order
const editExistingOrder = async (orderId, order) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, order, {
      new: true,
    }).populate("books");
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

exports.updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const { order } = req.body;

  try {
    const updatedOrder = await editExistingOrder(orderId, order);

    if (updatedOrder) {
      res.status(200).json({
        message: "Order updated successfully",
        updatedOrder,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Function to delete order
const deleteExistingOrder = async (orderId) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    return deletedOrder;
  } catch (error) {
    throw error;
  }
};

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const deletedOrder = await deleteExistingOrder(orderId);
    if (deletedOrder) {
      res
        .status(200)
        .json({ message: "Order canceled successfully", deletedOrder });
    } else {
      res.status(400).json({ message: "Failed to cancel order" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
};
