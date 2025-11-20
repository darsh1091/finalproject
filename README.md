# OnMart Superstore

Full-stack demo implementing the OnMart ecommerce experience with React + Vite frontend and Node + Express style backend (using LowDB storage).

## Getting Started
1. Install dependencies in `backend` and `frontend` (network access required):
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Seed data:
   ```bash
   cd backend && npm run seed
   ```
3. Run backend:
   ```bash
   npm run dev
   ```
4. Run frontend (separate terminal):
   ```bash
   cd frontend && npm run dev
   ```

Backend listens on `http://localhost:4000`, frontend on `http://localhost:5173`.

## Tests
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`

## Sample Accounts
- Customer: `alice@example.com` / `password`
- Manager: `manager@example.com` / `password`

## Notes
- JWT-based auth; protected routes for cart/orders/repairs.
- Dummy payment form triggers order creation; no real payment processor.
