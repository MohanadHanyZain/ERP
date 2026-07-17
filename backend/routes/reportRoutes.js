import express from 'express';
import { getStats } from '../controllers/reportController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // استيراد الحارس

const router = express.Router();
router.get('/', verifyToken, getStats);
export default router;