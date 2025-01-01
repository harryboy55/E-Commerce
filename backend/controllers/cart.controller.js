const Cart = require('../models/cart.modal');
const Product = require('../models/product.model'); // Assuming you have a product model

// Add a product to the cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      // If the product exists, update the quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart.products); // Return updated products array
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};

// Get all cart items for a user
const getCartItems = async (req, res) => {
  const { userId } = req.body; // User ID from request body

  try {
    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Return the products in the cart (populated with full product details)
    res.status(200).json(cart.products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  }
};

// Update quantity of a cart item
const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart.products); // Return updated products array
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product quantity', error: error.message });
  }
};

// Remove a cart item
const removeCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the product from the cart
    const updatedProducts = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    cart.products = updatedProducts;
    await cart.save();
    res.status(200).json(cart.products); // Return updated products array
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
};

// Controller to clear the cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from the request body

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    await Cart.deleteMany({ user: userId }); // Delete all items in the user's cart

    res.status(200).json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ success: false, message: 'Failed to clear cart' });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
