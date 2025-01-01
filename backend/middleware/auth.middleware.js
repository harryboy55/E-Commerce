const jwt = require('jsonwebtoken');

// Middleware function to check if the user is authenticated
export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware/route
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token', error: error.message });
    }
};
