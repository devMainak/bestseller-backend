const express = require("express");
const {
  getUserAddresses,
  addUserAddress,
  editUserAddress,
  removeUserAddress,
} = require("../controller/userAddress.controller");
const router = express.Router();

// Routes for user addresses
router.get("/", getUserAddresses);
router.post("/", addUserAddress);
router.put("/:addressId", editUserAddress);
router.delete("/:addressId", removeUserAddress);

module.exports = router;
