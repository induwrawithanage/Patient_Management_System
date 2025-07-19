import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/Doctor.js';
import nodemailer from 'nodemailer';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
let refreshTokens = [];

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
      { email: user.email, role: user.role,userId: user._id,fullname: user.fullname,email: user.email,phone: user.phone,role: user.role ,hospital: user.hospital,national_id: user.national_id},
      JWT_SECRET,
      { expiresIn: '1d' } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { email: user.email, role: user.role,userId: user._id,fullname: user.fullname,email: user.email,phone: user.phone,role: user.role ,hospital: user.hospital,national_id: user.national_id},
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


 export const forgetPassword = async (req, res) => {
  const { email, phone} = req.body;

  // Validate input
  if (!email || !phone)  {
    return res.status(400).json({ message: 'Username, email, and mobile are required' });
  }

  try {
    // Check if a user exists with the provided details
    const existingUser = await User.findOne({ email, phone});
    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found with the provided details' });
    }

    // Generate a secure token or OTP
    const resetToken = Math.floor(100000 + Math.random() * 900000);
    //const resetToken = crypto.randomBytes(32).toString('hex'); 
    const tokenExpiry = Date.now() + 60000000000; // Token valid for 10 minutes
   
    // Save the token and expiry in the database
    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = tokenExpiry;
    console.log(existingUser);
    await existingUser.save();

    // Send the reset token to the user's email or mobile
    sendResetLink(email, resetToken); 
    return res.status(200).json({ message: 'Password reset link has been sent to your email/mobile' , status: 'ok' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


 export const resetPassword = async (req, res) => {
  const { otp, newpassword } = req.body;

  if (!otp || !newpassword) {
    return res.status(400).json({ message: 'otp and new password are required' });
  }

  try {
    // Find the user by token and check expiry
    const user = await User.findOne({
     
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) {
      console.log(Date.now());
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the password and clear the reset fields
    console.log(user);
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword; // Ensure password is hashed if using bcrypt
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password successfully updated' , status: 'ok'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


 export const sendResetLink = async (email, resetToken) => {
  try {
    // Configure the SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email provider
      auth: {
        user: process.env.Email, // Your email address
        pass: process.env.Emailpassword, // Your email password (use app password if using Gmail)
      },
    });

    // Email content
    const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: 'm.mannage@gmail.com', // Sender address
      to: email, // Receiver address
      subject: 'Password Reset Request',
      html: `
  <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9; color: #333;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #333; font-size: 24px;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">You have requested to reset your password.Below is your Resetting otp</p>
        
        <p style="text-align: center; margin-top: 20px;">
          <p style="background-color: #4CAF50; color: white; padding: 12px 20px; font-size: 16px; text-decoration: none; border-radius: 5px; display: inline-block;">${resetToken}</p>
        </p>
        
        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">If you did not request this, please ignore this email.</p>
      </div>
    </body>
  </html>
`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully.');
  } catch (err) {
    console.error('Error sending password reset email:', err);
    throw new Error('Could not send email');
  }
};


export const updateinformation = async (req, res) => {
  const { fullname, email, phone,national_id,hospital } = req.body;

  // Validate required fields
  if (!fullname || !email || !phone || !national_id || !hospital) {
    return res.status(400).json({ message: 'Full name, email, phone, national ID, and hospital are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user information
    user.fullname = fullname;
    user.phone = phone;
    user.national_id = national_id;
    user.hospital = hospital;
    user.email = email; // Update email if provided

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User information updated successfully', status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user information' });
  }
}


export const getinformation = async (req, res) => {
  // Middleware should have already authenticated the user
  console.log(req.user);
  const user = req.user; // this contains { id, email, role } as you set in sign()
  res.json({
    message: 'User profile',
    user,
  });
};


export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    const payload = {
      email: user.email,
      phone: user.phone,
      role: user.role,
      userId: user.userId,
      fullname: user.fullname,
      hospital: user.hospital,
      national_id: user.national_id,
      
    };

    const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '150m' });

    res.status(200).json({
      message: 'Access token refreshed',
      accessToken: newAccessToken,
    });
  });
};