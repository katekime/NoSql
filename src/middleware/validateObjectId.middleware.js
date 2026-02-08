const mongoose = require("mongoose");

module.exports = (paramName = "id") => (req, res, next) => {
  const value = req.params[paramName];
  if (!mongoose.isValidObjectId(value)) {
    return res.status(400).json({ message: `Invalid ObjectId: ${paramName}` });
  }
  next();
};
