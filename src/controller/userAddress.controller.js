const UserAddress = require("../models/userAdress.model");

// Function to add user address in db
const seedUserAddress = async (address) => {
  try {
    const newAddress = new UserAddress(address);
    const savedAddress = await newAddress.save();
    return savedAddress;
  } catch (err) {
    throw err;
  }
};

exports.addUserAddress = async (req, res) => {
  const newAddress = req.body;

  try {
    const savedAddress = await seedUserAddress(newAddress);
    if (savedAddress) {
      res.status(201).json({
        message: "Saved address successfully.",
        savedAddress: savedAddress,
      });
    } else {
      res.status(400).json({ message: "Failed to add new address." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add new address." });
  }
};

// Function to read all the user addresses from db
const readUserAddresses = async () => {
  try {
    const addresses = await UserAddress.find();
    return addresses;
  } catch (err) {
    throw err;
  }
};

exports.getUserAddresses = async (req, res) => {
  try {
    const addresses = await readUserAddresses();
    if (addresses.length > 0) {
      res.status(200).json({ addresses });
    } else {
      res.status(200).json({ message: "No address found.", addresses: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to read address" });
  }
};

// Function to update address in db
const updateUserAddress = async (addressId, address) => {
  try {
    const updatedAddress = await UserAddress.findByIdAndUpdate(
      addressId,
      address,
      { new: true }
    );
    return updatedAddress;
  } catch (err) {
    throw err;
  }
};

exports.editUserAddress = async (req, res) => {
  const editedAddress = req.body;
  const addressId = req.params.addressId;
  try {
    const updatedAddress = updateUserAddress(addressId, editedAddress);
    if (updatedAddress) {
      res.status(200).json({
        message: "Updated address successfully.",
        updatedAddress: updatedAddress,
      });
    } else {
      res.status(400).json({ message: "Failed to update address." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update address." });
  }
};

// Function delete address by Id from db
const deleteUserAddress = async (addressId) => {
  try {
    const deletedAddress = await UserAddress.findByIdAndDelete(addressId);
    return deletedAddress;
  } catch (err) {
    throw err;
  }
};

exports.removeUserAddress = async (req, res) => {
  const addressId = req.params.addressId;
  try {
    const deletedAddress = await deleteUserAddress(addressId);
    if (deletedAddress) {
      res.status(200).json({
        message: "Deleted address successfully.",
        deletedAddress: deletedAddress,
      });
    } else {
      res.status(400).json({ message: "Failed to delete address." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete address." });
  }
};
