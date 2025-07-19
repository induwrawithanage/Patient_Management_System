import express from 'express';
import { signupUser, loginUser, resetPassword, forgetPassword, updateinformation } from '../Controller/patientcontroller.js';
const router = express.Router();
router.post('/signup', signupUser);
router.post('/forgetpassword', forgetPassword); 
router.post('/resetpassword', resetPassword);
router.post('/updateinformation', updateinformation);   
router.post('/login', loginUser);
export default router;