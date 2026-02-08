const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const validateId = require("../middleware/validateObjectId.middleware");
const ctrl = require("../controllers/order.controller");

router.get("/my", auth, ctrl.getMyOrders);
router.post("/", auth, ctrl.createOrder);

router.patch("/:id/cancel", auth, validateId("id"), ctrl.cancelMyOrder);
router.delete("/:id", auth, validateId("id"), ctrl.deleteMyOrder);

module.exports = router;
