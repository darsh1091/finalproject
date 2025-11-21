# OnMart Superstore

Full-stack demo implementing the OnMart ecommerce experience with React + Vite frontend and Node + Express style backend (using LowDB storage).

## Getting Started
1. Install dependencies in `backend` and `frontend` (network access required):
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. (Optional) Reseed data if you want to reset to defaults:
   ```bash
   cd backend && npm run seed
   ```
3. Run backend:
   ```bash
   cd backend && npm run dev
   ```
4. Run frontend (separate terminal):
   ```bash
   cd frontend && npm run dev
   ```

You can also use the root scripts for convenience:
```bash
npm run dev:server  # backend only
npm run dev:client  # frontend only
npm run dev         # start both (runs in background shell)
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
