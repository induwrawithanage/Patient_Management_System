import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate requests
export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    
    return res.status(401).json({ message: 'Access token required' });
  }
  
 console.log('Token received:', token);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log('User authenticated:', user);
    req.user = user;
    next();
  });
};