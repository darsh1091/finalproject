import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { createOrder, listOrders, getOrder, cancelOrder, addReview } from '../controllers/orderController.js';

const router = Router();
router.use(authenticate);
router.get('/', listOrders);
router.post('/', createOrder);
router.get('/:id', getOrder);
router.post('/:id/cancel', cancelOrder);
router.post('/:id/reviews', addReview);

export default router;
