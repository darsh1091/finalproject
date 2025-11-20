import { Router } from 'express';
import { listProducts, getProduct, createProduct } from '../controllers/productController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', authenticate, createProduct);

export default router;
