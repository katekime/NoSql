const Product = require("../models/product.model");
const asyncH = require("../middleware/async.middleware");

exports.getProducts = asyncH(async (req, res) => {
  const products = await Product.find({ available: true }).sort({ createdAt: -1 });
  res.json(products); 
});
