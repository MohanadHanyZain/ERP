import express from 'express';
import { createExpense } from '../controllers/expenseController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // استيراد الحارس

const router = express.Router();
router.post('/', verifyToken, createExpense);
export default router;