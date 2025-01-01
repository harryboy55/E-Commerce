// controllers/wishlistController.js
const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');

// Add product to wishlist
exports.addProductToWishlist = async (req, res) => {
  const { productId, userId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // If wishlist doesn't exist, create a new one
      wishlist = new Wishlist({ userId, products: [{ productId, quantity: 1 }] });
      await wishlist.save();
    } else {
      // If wishlist exists, check if product is already in the wishlist
      const productIndex = wishlist.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex === -1) {
        // Add product to the wishlist if not already there
        wishlist.products.push({ productId, quantity: 1 });
        await wishlist.save();
        return res.status(200).json({ message: 'Product added to wishlist' });
      } else {
        // If product is already in the wishlist, send a message without crashing
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      
    }

    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to wishlist', error: error.message });
  }
};



// Remove product from wishlist
exports.removeProductFromWishlist = async (req, res) => {
  const { productId, userId } = req.body; // Extract productId and userId from the request body

  try {
    // Find the user's wishlist by userId
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Check if the product exists in the wishlist before attempting to remove it
    const productIndex = wishlist.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    // Remove the product from the wishlist
    wishlist.products.splice(productIndex, 1);

    // Save the updated wishlist
    await wishlist.save();

    // Return the updated wishlist
    res.status(200).json(wishlist.products);
  } catch (error) {
    // Improved error handling
    console.error(error);
    res.status(500).json({ message: 'Error removing product from wishlist', error: error.message });
  }
};


// Get wishlist (fetch all products in the user's wishlist)
exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the wishlist for the user and populate product details
    const wishlist = await Wishlist.findOne({ userId }).populate('products.productId'); // Populate product details

    if (!wishlist) {
      return res.status(400).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist.products); // Return populated products array
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};
