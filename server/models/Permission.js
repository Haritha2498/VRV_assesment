const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String], // Array of strings to store permissions
    enum: ["read", "write", "delete"], // Allowed values for permissions
    default: [], // Default empty array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserPermission", UserSchema);
