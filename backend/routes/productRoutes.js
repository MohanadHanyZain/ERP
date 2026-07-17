import { Router } from 'express';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { validate, productSchema } from '../middleware/validate.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // استيراد الحارس

const router = Router();

router.get('/', verifyToken, getProducts);
router.post('/', verifyToken, validate(productSchema), addProduct); 
router.delete('/:id', verifyToken, deleteProduct);
router.put('/:id', verifyToken, updateProduct);

export default router;