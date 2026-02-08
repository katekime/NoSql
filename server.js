require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const seedProducts = require("./src/seed/seedProducts");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedProducts(); // ✅ автозаполнение товаров с картинками
    app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err.message));
