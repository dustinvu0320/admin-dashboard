const mongoose = require("mongoose");

// Create info schema
const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("Cart", CartSchema);
