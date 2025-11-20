# API Docs

Base URL: `http://localhost:4000/api`

## Auth
- `POST /auth/register` body `{name,email,password}` -> `{token,user}`
- `POST /auth/login` body `{email,password}` -> `{token,user}`

## Products
- `GET /products` query `q, department, sort` -> `[product]`
- `GET /products/:id` -> product with reviews
- `POST /products` (auth) body product payload -> created product

## Cart
- `GET /cart` (auth) -> cart items
- `POST /cart` (auth) body `{productId,quantity}` -> message
- `DELETE /cart/:id` (auth) -> message

## Orders
- `GET /orders` (auth) -> list of user orders
- `POST /orders` (auth) body `{items:[{productId,quantity}], address, payment}` -> order
- `GET /orders/:id` (auth)
- `POST /orders/:id/cancel` (auth) -> order
- `POST /orders/:id/reviews` (auth) body `{rating, comment}` -> review

## Appointments
- `GET /appointments` (auth) -> appointments
- `POST /appointments` (auth) body `{type,date,window,note}` -> appointment
- `POST /appointments/:id/cancel` (auth) -> appointment
