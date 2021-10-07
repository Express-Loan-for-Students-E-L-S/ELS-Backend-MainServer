const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    userBankDetails: mongoose.Schema.Types.Mixed,
    documents: mongoose.Schema.Types.Mixed
  })
);

module.exports = User;