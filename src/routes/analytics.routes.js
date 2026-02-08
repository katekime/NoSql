const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  getTotalRevenue,
  getBestSellingProducts,
  getTopCustomers
} = require("../controllers/analytics.controller");

router.get("/revenue", auth, role("admin"), getTotalRevenue);
router.get("/best-products", auth, role("admin"), getBestSellingProducts);
router.get("/top-customers", auth, role("admin"), getTopCustomers);

module.exports = router;
