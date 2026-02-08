const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/product.controller");

router.get("/", ctrl.getProducts);

module.exports = router;
