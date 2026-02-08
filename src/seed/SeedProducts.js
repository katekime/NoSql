const Product = require("../models/product.model");

module.exports = async function seedProducts() {
  const products = [
    // ☕ coffee
    { name: "Espresso", category: "coffee", price: 2.0, imageUrl: "/images/espresso.jpg" },
    { name: "Americano", category: "coffee", price: 3.0, imageUrl: "/images/americano.jpg" },
    { name: "Cappuccino", category: "coffee", price: 3.0, imageUrl: "/images/cappuccino.jpg" },
    { name: "Latte", category: "coffee", price: 3.2, imageUrl: "/images/latte.jpg" },
    { name: "Flat White", category: "coffee", price: 3.8, imageUrl: "/images/flatwhite.jpg" },
    { name: "Mocha", category: "coffee", price: 3.5, imageUrl: "/images/mocha.jpg" },
    { name: "Macchiato", category: "coffee", price: 3.2, imageUrl: "/images/macchiato.jpg" },
    { name: "Turkish Coffee", category: "coffee", price: 3.0, imageUrl: "/images/turkishcoffee.jpg" },

    // 🧊 cold drinks
    { name: "Iced Coffee", category: "drink", price: 3.5, imageUrl: "/images/icedcoffee.jpg" },
    { name: "Cold Brew", category: "drink", price: 4.2, imageUrl: "/images/coldbrew.jpg" },

    // 🍨 desserts
    { name: "Affogato", category: "dessert", price: 4.8, imageUrl: "/images/affogato.jpg" },
    { name: "Cheesecake", category: "dessert", price: 4.0, imageUrl: "/images/cheesecake.jpg" },
    { name: "Irish Coffee", category: "dessert", price: 5.5, imageUrl: "/images/irishcoffee.jpg" }
  ];

  for (const p of products) {
    await Product.updateOne(
      { name: p.name },
      {
        $set: {
          category: p.category,
          price: p.price,
          imageUrl: p.imageUrl,
          available: true
        }
      },
      { upsert: true }
    );
  }

  console.log("✅ Seeded ALL products with images");
};
