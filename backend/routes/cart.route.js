const express = require('express');
const { getCartItems, addToCart, updateCartItem, removeCartItem, clearCart } = require('../controllers/cart.controller');
const router = express.Router();

// Get all cart items
router.post('/', getCartItems); // Get all cart items for a user

// Add product to cart
router.post('/add', addToCart);

// Update cart item
router.patch('/update', updateCartItem); // Update cart item

// Remove product from cart
router.delete('/remove', removeCartItem); // Remove product from cart

router.post('/clear', clearCart);

module.exports = router;
