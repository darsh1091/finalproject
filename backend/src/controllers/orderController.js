import db from '../config/db.js';
import { nanoid } from 'nanoid';
import Joi from 'joi';

const orderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required()
      })
    )
    .min(1)
    .required(),
  address: Joi.string().required(),
  payment: Joi.object({
    cardNumber: Joi.string().required(),
    name: Joi.string().required(),
    expiry: Joi.string().required()
  }).required()
});

export const createOrder = (req, res) => {
  const { error, value } = orderSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  db.read();
  const total = value.items.reduce((acc, item) => {
    const product = db.data.products.find((p) => p.id === item.productId);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);
  const order = {
    id: nanoid(),
    userId: req.user.id,
    items: value.items,
    total,
    address: value.address,
    paymentLast4: value.payment.cardNumber.slice(-4),
    status: 'placed',
    createdAt: new Date().toISOString()
  };
  db.data.orders.push(order);
  db.data.carts = db.data.carts.filter((c) => c.userId !== req.user.id);
  db.write();
  res.status(201).json(order);
};

export const listOrders = (req, res) => {
  db.read();
  const orders = db.data.orders.filter((o) => o.userId === req.user.id);
  res.json(orders);
};

export const getOrder = (req, res) => {
  db.read();
  const order = db.data.orders.find((o) => o.id === req.params.id && o.userId === req.user.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

export const cancelOrder = (req, res) => {
  db.read();
  const order = db.data.orders.find((o) => o.id === req.params.id && o.userId === req.user.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = 'cancelled';
  db.write();
  res.json(order);
};

export const addReview = (req, res) => {
  const reviewSchema = Joi.object({ rating: Joi.number().min(1).max(5).required(), comment: Joi.string().allow('') });
  const { error, value } = reviewSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  db.read();
  const review = { id: nanoid(), userId: req.user.id, productId: req.params.id, ...value };
  db.data.reviews.push(review);
  db.write();
  res.status(201).json(review);
};
