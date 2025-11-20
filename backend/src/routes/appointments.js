import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { schedule, listAppointments, cancelAppointment } from '../controllers/appointmentController.js';

const router = Router();
router.use(authenticate);
router.get('/', listAppointments);
router.post('/', schedule);
router.post('/:id/cancel', cancelAppointment);

export default router;
