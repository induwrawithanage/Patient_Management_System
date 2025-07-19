import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/Doctor.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Controller for user signup
export const signupUser = async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  // Validate required fields
  if (!fullname || !email || !phone || !password) {
    return res.status(400).json({ message: 'Full name, email, phone, and password are required' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
      role: 'doctor', // Default role
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User signed up successfully', status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error signing up user' });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' } // Long-lived refresh token
    );

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in user' });
  }
};