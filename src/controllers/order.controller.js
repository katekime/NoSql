const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const asyncH = require("../middleware/async.middleware");

exports.createOrder = asyncH(async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("items array is required");
  }

  for (const it of items) {
    if (!mongoose.isValidObjectId(it.productId)) {
      res.status(400);
      throw new Error("Invalid productId in items");
    }
    if (!it.quantity || it.quantity < 1) {
      res.status(400);
      throw new Error("quantity must be >= 1");
    }
  }

  const ids = items.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: ids } });

  if (products.length !== ids.length) {
    res.status(400);
    throw new Error("Some products not found");
  }

  const snapshotItems = items.map((it) => {
    const p = products.find((pp) => String(pp._id) === String(it.productId));
    return {
      productId: p._id,
      nameSnapshot: p.name,
      priceSnapshot: p.price,
      quantity: it.quantity
    };
  });

  const totalPrice = snapshotItems.reduce(
    (sum, it) => sum + it.priceSnapshot * it.quantity,
    0
  );

  const order = await Order.create({
    userId: req.user.userId,
    items: snapshotItems,
    totalPrice,
    status: "pending"
  });

  res.status(201).json(order);
});

exports.getMyOrders = asyncH(async (req, res) => {
  const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
  for (const o of orders) {
    if (typeof o.totalPrice !== "number") {
      o.totalPrice = (o.items || []).reduce(
        (s, it) => s + (it.priceSnapshot || it.price || 0) * (it.quantity || 0),
        0
      );
    }
  }
  res.json(orders);
});

exports.cancelMyOrder = asyncH(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.user.userId });
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (order.status !== "pending") {
    res.status(400);
    throw new Error("Only pending order can be cancelled");
  }
  order.status = "cancelled";
  await order.save();
  res.json(order);
});

exports.deleteMyOrder = asyncH(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.user.userId });
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (order.status === "completed") {
    res.status(400);
    throw new Error("Completed order cannot be deleted");
  }
  await Order.deleteOne({ _id: order._id });
  res.json({ message: "Order deleted successfully" });
});
