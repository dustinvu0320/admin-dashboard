const mongoose = require("mongoose");

// Create info schema
const UserSchema = new mongoose.Schema(
  {
    fullName: {type: 'string',required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String, default: ''},
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("User", UserSchema);
