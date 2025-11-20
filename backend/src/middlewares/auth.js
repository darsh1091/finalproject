import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'onmart-secret';

export const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role, name: user.name }, secret, { expiresIn: '7d' });

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing auth header' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
