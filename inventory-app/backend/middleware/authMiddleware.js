const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Get the token from the header
  // Look for 'x-auth-token' or standard 'Authorization' header
  const token = req.header('x-auth-token') || req.header('Authorization')?.split(' ')[1];

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add the user ID from the token to the request object
    req.user = decoded; 
    
    next(); // Move to the next function (the Controller)
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};