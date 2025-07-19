import express from 'express';
import { signupUser, loginUser } from '../Controller/doctorcontroller.js';
const router = express.Router();



// Create a doctor
router.post('/signup', signupUser);

// Login a doctor
router.post('/login', loginUser);

export default router;