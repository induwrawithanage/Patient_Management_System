import express from 'express';
import chatWithGemini from '../Controller/chatController.js';
const router = express.Router();
router.post('/chat', chatWithGemini);

export default router;
