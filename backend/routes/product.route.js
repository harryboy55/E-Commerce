const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, deleteProduct, updateProduct, searchProducts } = require('../controllers/product.controller');
const upload = require('../config/multer.config'); // Import Multer config

// POST route to add a new product with image upload
router.post('/', upload.single('image'), addProduct); // 'image' is the field name for the file


// Get all products
router.get('/', getAllProducts);

// Delete a product
router.delete('/:id', deleteProduct);

// Update a product
router.put('/:id', upload.single('image'), updateProduct);

router.get('/search', searchProducts);

module.exports = router;
