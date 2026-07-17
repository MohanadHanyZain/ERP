import express from 'express';
import { addTransaction, getTransactions } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getTransactions);
router.post('/', addTransaction);

export default router;