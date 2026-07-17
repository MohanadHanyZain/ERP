import express from 'express';
import { handleCustomerReturn } from '../controllers/returnController.js';
const router = express.Router();
router.post('/customer', handleCustomerReturn);
export default router;