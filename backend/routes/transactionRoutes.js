import express from 'express';
import { addTransaction, getTransactions } from '../controllers/transactionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getTransactions);
router.post('/', verifyToken, addTransaction);

export default router;