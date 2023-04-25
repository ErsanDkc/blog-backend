const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    avatar: Object,
  });
  
  const User = mongoose.model("User", userShema);

  module.exports = User;