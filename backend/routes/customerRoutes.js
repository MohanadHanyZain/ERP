import express from 'express';
import { getCustomers, addCustomer } from '../controllers/customerController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getCustomers);
router.post('/', verifyToken, addCustomer);

export default router;