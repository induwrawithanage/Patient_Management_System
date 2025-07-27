// import express from 'express';
// import { signupUser, loginUser,resetPassword,forgetPassword,updateinformation,getinformation,refreshToken } from '../Controller/doctorcontroller.js';
// import { authenticateToken } from '../Middleware/usermiddleware.js';
// const router = express.Router();



// // Create a doctor
// router.post('/signup', signupUser);
// router.post('/forgetpassword', forgetPassword);
// router.post('/resetpassword', resetPassword);
// router.post('/updateinformation', updateinformation);
// router.get('/getinformation', authenticateToken, getinformation);
// router.post('/refresh', refreshToken);
// // Login a doctor
// router.post('/login', loginUser);

// export default router;

import express from 'express';
import { signupUser, loginUser,resetPassword,forgetPassword,updateinformation,getinformation,refreshToken,searchPatient,getinformationpatient } from '../Controller/doctorcontroller.js';
import { authenticateToken } from '../Middleware/usermiddleware.js';
const router = express.Router();



// Create a doctor
router.post('/signup', signupUser);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);
router.post('/updateinformation', updateinformation);
router.get('/getinformation', authenticateToken, getinformation);
router.post('/refresh', refreshToken);
// Login a doctor
router.post('/login', loginUser);
router.get('/searchpatient', searchPatient);
router.get('/getinformationpatient',getinformationpatient);

export default router;