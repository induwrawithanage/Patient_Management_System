import express from 'express';
import { signupUser, loginUser,resetPassword,forgetPassword, updateinformation, getinformation,updatepatientprofile, refreshToken,addMedicalRecord } from '../Controller/patientcontroller.js';
import { authenticateToken } from '../Middleware/usermiddleware.js';
const router = express.Router();
router.post('/signup', signupUser);
router.post('/forgetpassword', forgetPassword); 
router.post('/resetpassword', resetPassword);
router.post('/updateinformation', updateinformation); 
router.post('/refresh', refreshToken);  
router.post('/login', loginUser);
router.get('/getinformation', authenticateToken,getinformation);
router.post('/addmedicalrecord',  addMedicalRecord);
router.post('/updatepatientprofile', updatepatientprofile);

export default router;