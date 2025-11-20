import db from '../config/db.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

const departments = ['Electronics', 'Clothing', 'Grocery', 'Furniture', 'Sports', 'Appliances'];

const sampleProducts = [
  { name: '4K TV', department: 'Electronics', category: 'TV', price: 799, description: 'Crisp 4K display', rating: 4.7, image: '' },
  { name: 'Running Shoes', department: 'Sports', category: 'Footwear', price: 120, description: 'Comfortable running shoes', rating: 4.5, image: '' },
  { name: 'Smart Fridge', department: 'Appliances', category: 'Kitchen', price: 1299, description: 'WiFi-enabled fridge', rating: 4.3, image: '' },
  { name: 'Office Chair', department: 'Furniture', category: 'Office', price: 199, description: 'Ergonomic chair', rating: 4.2, image: '' },
  { name: 'Jeans', department: 'Clothing', category: 'Denim', price: 59, description: 'Stretch denim', rating: 4.1, image: '' }
];

const seed = () => {
  db.read();
  db.data.users = [
    { id: nanoid(), name: 'Alice Customer', email: 'alice@example.com', password: bcrypt.hashSync('password', 8), role: 'customer' },
    { id: nanoid(), name: 'Manny Manager', email: 'manager@example.com', password: bcrypt.hashSync('password', 8), role: 'manager' }
  ];
  db.data.products = sampleProducts.map((p) => ({ id: nanoid(), ...p }));
  db.data.orders = [];
  db.data.carts = [];
  db.data.reviews = [];
  db.data.appointments = [];
  db.write();
  console.log('Seed complete');
};

seed();
