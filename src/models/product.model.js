const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: ["coffee", "dessert", "drink"], required: true },
    price: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
    imageUrl: { type: String, default: "/images/default.jpg" }
  },
  { timestamps: true }
);

productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model("Product", productSchema);
