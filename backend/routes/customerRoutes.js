import { Router } from 'express';
import { getCustomers, addCustomer } from '../controllers/customerController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';
import { validate, customerSchema } from '../middleware/validate.js';

const router = Router();
router.get('/', verifyToken, checkRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER]), getCustomers);
router.post('/', verifyToken, checkRole([ROLES.ADMIN, ROLES.MANAGER]), validate(customerSchema), addCustomer);
export default router;