# Design Notes

## Actors & Scenarios
- **Customer**: browses departments, filters/sorts products, adds to cart, checks out with dummy payment, schedules repair/delivery, tracks orders, adds reviews.
- **Manager**: seeds catalog (create product endpoint), monitors orders via history view and chart, can cancel orders.
- **Technician/Driver**: represented through appointment scheduling where customers pick repair/delivery windows; data stored for operations.

## Navigation Model
- **Hybrid hub-and-spoke + hierarchical**: persistent top navigation (hub) links to Orders, Repairs, Cart, and Account, while product hierarchy (departments -> product detail) follows hierarchical flow. This supports wayfinding across many departments and quick return to key hubs required by superstore shoppers.
- Search and filters live on the home hub so customers can pivot quickly without deep navigation.

## UI Pattern Mapping (per Phase 2/3)
- **Layout of Screen Elements**: top nav for global wayfinding; grid catalog on HomePage; master-detail on ProductPage.
- **Chunking Information**: grouped search/filter controls, checkout card separating payment data, product detail vs reviews sections, repair form card.
- **Lists and Commands**: product cards with Add-to-Cart, order list with Cancel, cart list with Remove/update.
- **Interactive Information Graphics**: OrdersPage shows BarChart of order totals by order id.
- **Forms and Controls**: validated login/register forms, checkout payment form, repair scheduling form with required fields.

## Workflow Notes
- Cart and checkout enforce login to align with backend stateful cart.
- Order creation clears cart server-side; reviews allowed post-purchase through dedicated endpoint.
- Repair scheduling is decoupled but uses same auth to keep audit trail.
