import { Router } from 'express';
import { getCategories, addCategory } from '../controllers/categoryController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';
import { validate, categorySchema } from '../middleware/validate.js'; // سننشئ categorySchema أدناه

const router = Router();

// 1. متاح للجميع - فقط تسجيل دخول
router.get('/', verifyToken, checkRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER]), getCategories);

// 2. إضافة تصنيف - فقط للمدير
router.post('/', verifyToken, checkRole([ROLES.ADMIN]), validate(categorySchema), addCategory);

export default router;