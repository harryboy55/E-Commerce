const mongoose = require('mongoose');

// Define product schema with category
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Store image path
  category: { type: String, required: true }, // New category field
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
