import express from 'express';
import { getStats } from '../controllers/reportController.js';
const router = express.Router();
router.get('/', getStats);
export default router;