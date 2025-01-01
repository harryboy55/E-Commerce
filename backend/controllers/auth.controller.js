const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Instantiate the Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to handle Google login
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body; // Receive the token from the frontend
    
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your Google Client ID
    });
    const payload = ticket.getPayload();

    // Check if the user already exists
    let user = await User.findOne({ googleId: payload.sub });
    
    if (!user) {
      // If the user does not exist, create a new one
      user = new User({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
      await user.save();
    }

    // Generate a JWT token for the user
    const jwtToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET, // Ensure this is set in your .env file
      { expiresIn: '1h' }
    );

    // Send the user and token as response
    res.status(200).json({ success: true, user, token: jwtToken });
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ success: false, message: 'Authentication failed', error: error.message });
  }
};

module.exports = { googleLogin };
