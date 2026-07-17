import express from 'express';
import { createPurchase } from '../controllers/purchaseController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // استيراد الحارس

const router = express.Router();
router.post('/', verifyToken, createPurchase);
export default router;