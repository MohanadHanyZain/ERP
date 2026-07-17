import { Router } from 'express';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { validate, productSchema } from '../middleware/validate.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // استيراد الحارس
import { checkRole } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';

const router = Router();

router.get('/', verifyToken, checkRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER]), getProducts);
router.post('/', verifyToken, checkRole([ROLES.ADMIN]), validate(productSchema), addProduct); 
router.delete('/:id', checkRole([ROLES.ADMIN]), verifyToken, deleteProduct);
router.put('/:id', checkRole([ROLES.ADMIN]), verifyToken, updateProduct);

export default router;