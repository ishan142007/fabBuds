# FabBuds

FabBuds is a full-stack e-commerce web application built to demonstrate a practical online shopping workflow: account creation, role-based login, product browsing, seller product management, cart handling, order placement, order history, and admin-level user visibility.

The project is designed as an interview-ready portfolio application. It shows how the frontend, backend, database models, authentication, and role-based API permissions work together in a real product flow.

## Project Goals

- Present a working e-commerce experience for customers, sellers, and admins.
- Demonstrate MERN-style full-stack development with React, Express, MongoDB, and Node.js.
- Show practical backend concepts such as JWT authentication, password hashing, protected routes, role checks, and MongoDB data modeling.
- Provide a clear setup guide so reviewers can run the project locally without guessing.
- Include demo accounts and a suggested walkthrough for interviews or project posts.

## Repository

GitHub remote:

```text
https://github.com/ishan142007/faabBuds.git
```

## Demo Accounts

These are safe dummy credentials for local testing and demos. The repository does not commit database records, so create these accounts once through the Sign Up screen or by calling the signup API after connecting MongoDB.

| Role | Email | Password | What to Test |
| --- | --- | --- | --- |
| Customer | demo.user@fabbuds.test | Demo@123 | Browse products, add to cart, place orders, view profile and order history |
| Seller | demo.seller@fabbuds.test | Demo@123 | Create products, view own products, delete products |
| Admin | demo.admin@fabbuds.test | Demo@123 | View users, sellers, products, and admin-only screens |

Important: when logging in, select the same role that was used while creating the account. The backend checks both email/password and role.

Example signup payload:

```json
{
  "fullname": "Demo Admin",
  "email": "demo.admin@fabbuds.test",
  "password": "Demo@123",
  "role": "admin"
}
```

## Feature Overview

### Customer Features

- Account signup and login.
- JWT-based authenticated session stored in browser local storage.
- Product catalogue view.
- Client-side product search by name.
- Add product to cart.
- View cart items and cart total.
- Remove individual cart items or clear the cart.
- Enter delivery address.
- Place an order from cart items.
- View personal order history.
- View profile details.

### Seller Features

- Role-based seller access.
- Add new products with name, description, price, category, stock, and image URL.
- View products created by the logged-in seller.
- Delete owned products through the product form screen.

### Admin Features

- Admin-only protected route.
- View registered customers.
- View registered sellers.
- Add customers and sellers from the admin panel.
- Delete users or sellers by email.
- View product inventory records.
- Access admin-only order APIs for all-order listing and order status updates.

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router
- Axios
- Tailwind CSS 4
- React Icons
- Framer Motion

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- dotenv
- CORS
- nodemon

## High-Level Architecture

```text
fabbuds/
  backend/
    config/
      db.js
    controllers/
      auth.controller.js
      Cart.controller.js
      order.controller.js
      product.controller.js
    Middleware/
      role.middle.js
      verifyToken.middle.js
    models/
      cart.modal.js
      order.models.js
      product.model.js
      user.model.js
    routes/
      auth.route.js
      cart.route.js
      order.route.js
      product.route.js
    index.js
    package.json
  frontend/
    src/
      components/
        Admin/
        Cart/
        Home/
        Profile/
        auth/
      Ai/
      App.jsx
      Rout.jsx
      main.jsx
    package.json
    vite.config.js
```

The frontend is a Vite React app. It calls the backend directly through Axios using `http://localhost:3000`.

The backend exposes REST APIs under `/api`, connects to MongoDB through Mongoose, and protects selected routes with JWT verification and role authorization middleware.

## Data Models

### User

Stores account and role information.

Key fields:

- `fullname`
- `email`
- `password`
- `role`: `user`, `seller`, or `admin`
- `address`
- timestamps

### Product

Stores catalogue and seller-owned product data.

Key fields:

- `name`
- `description`
- `price`
- `category`
- `stock`
- `imageUrl`
- `rating`
- `reviewCount`
- `userId`
- timestamps

### Cart

Stores one active cart per user.

Key fields:

- `UserId`
- `item`
- `totalprice`
- timestamps

### Order

Stores completed checkout records.

Key fields:

- `UserId`
- `items`
- `totalAmount`
- `orderStatus`: `processing`, `shipped`, `delivered`, or `cancelled`
- `paymentStatus`: `pending`, `done`, or `cancelled`
- timestamps

## API Overview

Base URL:

```text
http://localhost:3000
```

### Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | Public | Create a user, seller, or admin account |
| POST | `/api/auth/login` | Public | Login and receive a JWT |
| POST | `/api/auth/verify` | Authenticated | Verify token |
| GET | `/api/auth/profile` | Authenticated | Fetch logged-in user profile |
| POST | `/api/auth/admin/fetch` | Admin | Fetch all users |
| POST | `/api/auth/admin/delete` | Admin | Delete a user by email |
| POST | `/api/auth/logout` | Public | Logout response endpoint |

### Products

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/products` | Public | Fetch products with optional search, category, price, sort, and pagination query params |
| GET | `/api/products/:id` | Public | Fetch one product |
| POST | `/api/products/create` | Admin or Seller | Create product |
| GET | `/api/products/user` | Admin or Seller | Fetch products for current seller/admin |
| PUT | `/api/products/update/:id` | Admin or Seller | Update product |
| DELETE | `/api/products/delete/:id` | Admin or Seller | Delete product |

### Cart

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/cart` | Authenticated | Get current user cart |
| POST | `/api/cart/add` | Authenticated | Add product to cart |
| PUT | `/api/cart/update` | Authenticated | Update cart item quantity |
| DELETE | `/api/cart/remove` | Authenticated | Remove item from cart |
| DELETE | `/api/cart/clear` | Authenticated | Clear cart |
| POST | `/api/cart/totalprice` | Authenticated | Calculate cart total |

### Orders

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/orders/create` | Authenticated | Create order from cart |
| POST | `/api/orders/getOrder/:id` | Authenticated | Fetch one order |
| POST | `/api/orders/getOrders` | Authenticated | Fetch current user's orders |
| GET | `/api/orders/all` | Admin | Fetch all orders |
| PUT | `/api/orders/update/:id` | Admin | Update order or payment status |

## Local Setup

### Prerequisites

- Node.js and npm
- MongoDB running locally or a MongoDB Atlas connection string
- Git

Because the frontend currently points to `http://localhost:3000`, run the backend on port `3000` for the smoothest local demo.

### 1. Clone the Repository

```bash
git clone https://github.com/ishan142007/faabBuds.git
cd faabBuds
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Create Backend Environment File

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/
JWT_SECRET_TOKEN=replace_this_with_a_long_random_secret
```

Database note: `backend/config/db.js` appends the database name `ecommmerce` to `MONGO_URI`, so keep the URI ending with `/` unless you update that connection logic.

### 4. Start Backend

```bash
npm run dev
```

The server should run at:

```text
http://localhost:3000
```

### 5. Install Frontend Dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

### 6. Start Frontend

```bash
npm run dev
```

The Vite app usually opens at:

```text
http://localhost:5173
```

### 7. Create Demo Accounts

Use the Sign Up tab in the app and create the three demo accounts listed above. Make sure to choose the correct role for each account.

## Interview Demo Flow

Use this sequence to show the strongest parts of the project:

1. Start MongoDB, backend, and frontend.
2. Create or confirm the demo accounts.
3. Login as seller and add a few products from Product Form.
4. Login as customer and show product browsing, search, cart, address, order placement, and order history.
5. Login as admin and show the admin panel with users, sellers, and product records.
6. Explain backend protections: JWT middleware validates the token, and role middleware restricts admin/seller actions.
7. Explain the data flow: React calls Express APIs, Express validates requests, Mongoose stores documents in MongoDB, and protected APIs return data based on user role.

## Available Scripts

### Root

Run from the repository root:

```bash
npm run setup
```

Installs backend and frontend dependencies.

```bash
npm run dev:backend
```

Starts the backend from the root directory.

```bash
npm run dev:frontend
```

Starts the frontend from the root directory.

```bash
npm run build
```

Builds the frontend.

```bash
npm run lint
```

Runs frontend linting.

### Backend

Run from `backend/`:

```bash
npm run dev
```

Starts the backend with nodemon.

```bash
npm start
```

Starts the backend with Node.

### Frontend

Run from `frontend/`:

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint.

## Manual Testing Checklist

- Sign up as `user`, `seller`, and `admin`.
- Login with each role and confirm role-based navigation changes.
- Add a product as seller.
- Confirm the product appears on the home page.
- Add a product to cart as customer.
- Remove an item and clear cart.
- Place an order.
- Check order history.
- Login as admin and verify user/seller/product tables.
- Call admin order APIs with an admin token if order status updates need to be demonstrated.

## Security Notes

- Passwords are hashed with bcrypt before storage.
- JWT tokens are signed with `JWT_SECRET_TOKEN`.
- Protected APIs require an `Authorization: Bearer <token>` header.
- Role-based middleware restricts admin and seller operations.
- Demo account passwords are intentionally public and should only be used in local or demo environments.
- Never commit real `.env` values or production database credentials.

## Deployment Notes

For deployment, update the current local-only assumptions:

- Move the frontend API base URL from hard-coded `http://localhost:3000` values to an environment variable.
- Configure production CORS to allow only the deployed frontend domain.
- Use MongoDB Atlas or another managed MongoDB provider.
- Store `JWT_SECRET_TOKEN` and database credentials in the hosting provider's secret manager.
- Build the frontend with `npm run build`.
- Start the backend with `npm start`.

## Current Scope and Roadmap

- There is no automated seed script yet, so demo accounts are created manually.
- Frontend API URLs are currently configured for local development on `http://localhost:3000`.
- Product creation is available through the seller/admin Product Form screen.
- The admin dashboard currently focuses on user, seller, and product visibility.
- The payment flow is represented by order/payment status fields; no real payment gateway is integrated yet.
- The chat assistant component is present as future-facing UI work, but the backend chat route is not wired into the current server.
- Automated tests are not included yet. Adding API tests and frontend smoke tests would improve reviewer confidence.

## Suggested Future Enhancements

- Add a seed script for demo users and sample products.
- Add centralized frontend API configuration.
- Add protected route wrappers in React for cleaner route logic.
- Add product update UI for sellers/admins.
- Add admin order status management in the UI.
- Add image upload support instead of image URL input.
- Add payment gateway integration.
- Add Jest/Vitest and Supertest coverage for critical auth, product, cart, and order flows.
- Deploy the app and add live demo screenshots to this README.

## Project Summary

FabBuds demonstrates the core building blocks of a production-style e-commerce application: authentication, roles, protected APIs, MongoDB data models, product management, cart logic, and order creation. It is a strong base for interview discussion because it can be explained from both product and engineering perspectives.
