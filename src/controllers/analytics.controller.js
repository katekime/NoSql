const Order = require("../models/order.model");
const asyncH = require("../middleware/async.middleware");

function parseDateRange(req) {
  const { from, to } = req.query;
  const match = { status: "completed" };

  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = new Date(from);
    if (to) match.createdAt.$lte = new Date(to);
  }
  return match;
}

exports.getTotalRevenue = asyncH(async (req, res) => {
  const match = parseDateRange(req);

  const result = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
        ordersCount: { $sum: 1 }
      }
    }
  ]);

  res.json(result[0] || { totalRevenue: 0, ordersCount: 0 });
});

exports.getBestSellingProducts = asyncH(async (req, res) => {
  const match = parseDateRange(req);

  const result = await Order.aggregate([
    { $match: match },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        name: { $first: "$items.nameSnapshot" },
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: { $multiply: ["$items.priceSnapshot", "$items.quantity"] } }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 }
  ]);

  res.json(result);
});

exports.getTopCustomers = asyncH(async (req, res) => {
  const match = parseDateRange(req);

  const result = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$userId",
        totalSpent: { $sum: "$totalPrice" },
        ordersCount: { $sum: 1 }
      }
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        username: "$user.username",
        email: "$user.email",
        totalSpent: 1,
        ordersCount: 1
      }
    }
  ]);

  res.json(result);
});
