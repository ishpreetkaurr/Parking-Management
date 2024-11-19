var jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userData) => {
    // Creating a new fresh JWT token to provide the user for session management or authorization purposes
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // Added expiration (optional but recommended)
}

// Validate JWT Token
const validateToken = (req, res, next) => {
    // Check if the token is available in the authorization header
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ err: 'Token not available' });
    }

    // Extract the token from the 'Bearer token' format
    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ err: 'Unauthorized user' });
    }

    try {
        // Verify the token using the secret key from environment variables
        const validatedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user information to the request object
        req.user = validatedToken;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Token validation failed
        console.error("Error Occurred:", err.message);
        res.status(403).json({ err: 'Invalid or expired token' });
    }
}

module.exports = { generateToken, validateToken };
