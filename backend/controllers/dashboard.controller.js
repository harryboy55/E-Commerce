const User = require('../models/user.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

// Dashboard data controller
const getDashboardData = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

module.exports = {
  getDashboardData,
};
