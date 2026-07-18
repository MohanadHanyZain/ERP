import { Router } from 'express';
import { createSale } from '../controllers/saleController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';
import { validate, saleSchema } from '../middleware/validate.js';

const router = Router();
router.post('/', verifyToken, checkRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER]), validate(saleSchema), createSale);
export default router;