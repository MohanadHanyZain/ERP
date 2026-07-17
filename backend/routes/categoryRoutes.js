import express from 'express';
import { getCategories, addCategory } from '../controllers/categoryController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getCategories);
router.post('/', verifyToken, addCategory);

export default router;