import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DoctorRoutes from './Routes/DoctorRoutes.js';
import PatientRoutes from './Routes/PatientRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';
import errorHandler from './Middleware/errorHandler.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Global error handler
app.use(errorHandler);
// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Patient Management System backend!');
});

app.use('/doctor', DoctorRoutes);
app.use('/patient', PatientRoutes);
app.use('/chat', chatRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});