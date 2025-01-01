// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const { addProductToWishlist, removeProductFromWishlist, getWishlist } = require('../controllers/wishlist.contoller');

// Add product to wishlist
router.post('/add', addProductToWishlist);

// Remove product from wishlist
router.delete('/remove', removeProductFromWishlist);

// Get wishlist for a specific user
router.get('/:userId', getWishlist);

module.exports = router;
