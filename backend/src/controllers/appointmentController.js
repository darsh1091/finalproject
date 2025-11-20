import db from '../config/db.js';
import { nanoid } from 'nanoid';
import Joi from 'joi';

const appointmentSchema = Joi.object({
  type: Joi.string().required(),
  date: Joi.string().required(),
  window: Joi.string().required(),
  note: Joi.string().allow('')
});

export const schedule = (req, res) => {
  const { error, value } = appointmentSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  db.read();
  const appointment = { id: nanoid(), userId: req.user.id, status: 'scheduled', ...value };
  db.data.appointments.push(appointment);
  db.write();
  res.status(201).json(appointment);
};

export const listAppointments = (req, res) => {
  db.read();
  const appointments = db.data.appointments.filter((a) => a.userId === req.user.id);
  res.json(appointments);
};

export const cancelAppointment = (req, res) => {
  db.read();
  const appointment = db.data.appointments.find((a) => a.id === req.params.id && a.userId === req.user.id);
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  appointment.status = 'cancelled';
  db.write();
  res.json(appointment);
};
