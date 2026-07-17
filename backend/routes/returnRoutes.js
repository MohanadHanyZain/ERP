import express from 'express';
import { handleCustomerReturn } from '../controllers/returnController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/customer', verifyToken, handleCustomerReturn);
export default router;