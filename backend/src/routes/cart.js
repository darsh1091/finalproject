import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { getCart, updateCart, removeFromCart } from '../controllers/cartController.js';

const router = Router();
router.use(authenticate);
router.get('/', getCart);
router.post('/', updateCart);
router.delete('/:id', removeFromCart);

export default router;
