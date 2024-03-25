const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "visitor",
  },
});

const loginModel = mongoose.model("users", userSchema);
module.exports = loginModel;