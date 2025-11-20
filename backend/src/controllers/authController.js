import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { generateToken } from '../middlewares/auth.js';
import Joi from 'joi';

const authSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().default('customer')
});

export const register = (req, res) => {
  const { error, value } = authSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  db.read();
  const exists = db.data.users.find((u) => u.email === value.email);
  if (exists) return res.status(400).json({ message: 'Email already registered' });
  const user = {
    id: nanoid(),
    name: value.name,
    email: value.email,
    password: bcrypt.hashSync(value.password, 8),
    role: value.role
  };
  db.data.users.push(user);
  db.write();
  res.json({ token: generateToken(user), user: { id: user.id, name: user.name, role: user.role } });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  db.read();
  const user = db.data.users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: generateToken(user), user: { id: user.id, name: user.name, role: user.role } });
};
