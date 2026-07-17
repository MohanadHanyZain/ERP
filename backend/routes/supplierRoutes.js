import express from 'express';
import { getSuppliers, addSupplier } from '../controllers/supplierController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getSuppliers);
router.post('/', verifyToken, addSupplier);

export default router;