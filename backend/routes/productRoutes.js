import { Router } from 'express';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { validate, productSchema } from '../middlewares/validate.js';

const router = Router();
router.get('/', getProducts);
router.post('/', validate(productSchema), addProduct); 
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;