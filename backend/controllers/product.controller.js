const Product = require('../models/product.model');

const addProduct = async (req, res) => {
  try {
    console.log(req.file); // Log the file to see if it is being received
    const { name, description, price, category } = req.body; // Include category
    const image = req.file ? req.file.path : null; // Handle the uploaded image

    // If no image is received, throw an error
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // If no category is provided, throw an error
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Create the product
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category, // Save category
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category } = req.body; // Include category

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category }, // Update category
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};


// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

const searchProducts = async (req, res) => {
  const { q, category } = req.query;  // Get query params from URL

  try {
    let query = {};

    if (q) {
      query.name = { $regex: q, $options: 'i' };  // Case-insensitive search for product name
    }

    if (category) {
      query.category = category;  // Filter by category if provided
    }

    const products = await Product.find(query);  // Query products based on the search params
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Export controller functions
module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct, searchProducts };
