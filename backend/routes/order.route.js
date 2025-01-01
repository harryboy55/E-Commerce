// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/order.controller');

// Route to create a new order
router.post('/add', createOrder);

// Route to get all orders
router.get('/', getAllOrders);

// Route to get an order by ID
router.get('/:id', getOrderById);

router.put('/update-status/:orderId', updateOrderStatus);

module.exports = router;
