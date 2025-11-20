import db from '../config/db.js';
import { nanoid } from 'nanoid';
import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required(),
  department: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().allow(''),
  rating: Joi.number().default(4),
  image: Joi.string().allow('')
});

export const listProducts = (req, res) => {
  db.read();
  const { department, q, sort } = req.query;
  let results = [...db.data.products];
  if (department) results = results.filter((p) => p.department === department);
  if (q) results = results.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  if (sort === 'price') results.sort((a, b) => a.price - b.price);
  if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
  res.json(results);
};

export const getProduct = (req, res) => {
  db.read();
  const product = db.data.products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  const reviews = db.data.reviews.filter((r) => r.productId === product.id);
  res.json({ ...product, reviews });
};

export const createProduct = (req, res) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  db.read();
  const product = { id: nanoid(), ...value };
  db.data.products.push(product);
  db.write();
  res.status(201).json(product);
};
