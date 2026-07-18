import { Router } from 'express';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { validate, productSchema } from '../middleware/validate.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';

const router = Router();

// الترتيب الصحيح: (1) تحقق من التوكن -> (2) تحقق من الدور -> (3) تنفيذ المنطق
router.get('/', verifyToken, checkRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER]), getProducts);
router.post('/', verifyToken, checkRole([ROLES.ADMIN]), validate(productSchema), addProduct); 
router.delete('/:id', verifyToken, checkRole([ROLES.ADMIN]), deleteProduct);
router.put('/:id', verifyToken, checkRole([ROLES.ADMIN]), validate(productSchema), updateProduct);

export default router;