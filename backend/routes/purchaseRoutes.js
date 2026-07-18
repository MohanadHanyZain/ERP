import { Router } from 'express';
import { createPurchase } from '../controllers/purchaseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';
import { validate, purchaseSchema } from '../middleware/validate.js';

const router = Router();
router.post('/', verifyToken, checkRole([ROLES.ADMIN, ROLES.MANAGER]), validate(purchaseSchema), createPurchase);
export default router;