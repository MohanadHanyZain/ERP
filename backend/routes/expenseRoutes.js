import { Router } from 'express';
import { createExpense } from '../controllers/expenseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';
import { validate, expenseSchema } from '../middleware/validate.js';

const router = Router();
router.post('/', verifyToken, checkRole([ROLES.ADMIN]), validate(expenseSchema), createExpense);
export default router;