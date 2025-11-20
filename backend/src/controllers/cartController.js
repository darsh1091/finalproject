import db from '../config/db.js';
import Joi from 'joi';

const cartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required()
});

export const getCart = (req, res) => {
  db.read();
  const cart = db.data.carts.find((c) => c.userId === req.user.id) || { items: [] };
  res.json(cart.items || []);
};

export const updateCart = (req, res) => {
  const { error, value } = cartSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  db.read();
  const cart = db.data.carts.find((c) => c.userId === req.user.id);
  if (!cart) {
    db.data.carts.push({ userId: req.user.id, items: [value] });
  } else {
    const existing = cart.items.find((i) => i.productId === value.productId);
    if (existing) existing.quantity = value.quantity;
    else cart.items.push(value);
  }
  db.write();
  res.json({ message: 'Cart updated' });
};

export const removeFromCart = (req, res) => {
  db.read();
  const cart = db.data.carts.find((c) => c.userId === req.user.id);
  if (cart) {
    cart.items = cart.items.filter((i) => i.productId !== req.params.id);
    db.write();
  }
  res.json({ message: 'Removed' });
};
