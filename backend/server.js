const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
//importing routes
const productRoutes = require('./routes/product.route');
const dashboardRoutes = require('./routes/dashboard.route');
const cartRoutes = require('./routes/cart.route');
const authRoutes = require('./routes/auth.route');
const orderRoute = require('./routes/order.route');
const wishlistRoutes = require('./routes/wishlist.route');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); //importing stripe

// Load environment variables from .env file
dotenv.config();

// Initialize the express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
connectDB();

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes); // API route for products
app.use('/api/dashboard', dashboardRoutes); // Add the dashboard routes
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoute)

app.post('/api/checkout/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // Ensure this value is sent from the frontend

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to paise for INR/PKR (smallest unit)
      currency: 'pkr', // Set currency to Pakistani Rupee (PKR)
      metadata: { integration_check: 'accept_a_payment' },
    });

    // Return the client secret to the frontend
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send('Internal Server Error');
  }
});




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
