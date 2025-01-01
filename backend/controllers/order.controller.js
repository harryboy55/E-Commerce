// controllers/orderController.js
const Order = require('../models/order.model');

// Function to create a new order
const createOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  if (!userId || !items || !totalAmount) {
    return res.status(400).json({ success: false, message: 'Required fields missing.' });
  }

  try {
    // Create a new order instance
    const newOrder = new Order({
      user: userId,
      items: items,
      totalAmount: totalAmount,
      status: 'pending', // Default to pending status
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    return res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ success: false, message: 'Failed to place order.' });
  }
};
const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name price image');
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
    }
  };
  
  // Function to get order by ID
  const getOrderById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Order.findById(id).populate('user', 'name email').populate('items.product', 'name price image');
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }
  
      return res.status(200).json({ success: true, order });
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch order.' });
    }
  };
  
// Function to update order status
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body; // Assuming you're sending status like { status: 'delivered' }
  
    if (!status) {
      return res.status(400).json({ message: 'Status is required.' });
    }
  
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      // Update the status
      order.status = status;
  
      await order.save();
  
      return res.status(200).json({ message: 'Order status updated successfully.', order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating order status.' });
    }
  };


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};
