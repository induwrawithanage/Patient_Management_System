import express from 'express';
import { signupUser, loginUser,resetPassword,forgetPassword,updateinformation } from '../Controller/doctorcontroller.js';
const router = express.Router();



// Create a doctor
router.post('/signup', signupUser);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);
router.post('/updateinformation', updateinformation);

// Login a doctor
router.post('/login', loginUser);

export default router;