# Food-Del

Food-Del is a full-stack food delivery application with a customer-facing storefront, an admin dashboard, and an Express/MongoDB backend API. Customers can browse menu items, manage a cart, sign in, place orders, and view profile information. Admin users can manage food items, review orders, view users, and track dashboard metrics.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios
- Admin dashboard: React, Vite, React Router, Axios, Recharts
- Backend: Node.js, Express, MongoDB, Mongoose
- Services: Cloudinary for image uploads, Nodemailer/SMTP for email, Stripe-ready payment configuration
- Deployment: Vercel static output for the frontend and admin builds

## Project Structure

```text
Food-Del/
|-- frontend/              # Customer-facing React app
|-- admin/                 # Admin dashboard React app
|-- backend/               # Express API, routes, models, config, seeds
|-- scripts/               # Build helpers
|-- vercel.json            # Vercel routing and output config
|-- package.json           # Root build command
`-- README.md
```

## Prerequisites

- Node.js 18 to 24
- npm
- MongoDB connection string, either local or Atlas
- Cloudinary account for image uploads

## Environment Variables

Create `backend/.env` from `backend/.env.example`:

```env
MONGODB_URI=mongodb://localhost:27017/fooddel
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
NODE_ENV=development
```

For the frontend and admin apps, add a local `.env` file when you need to point them at a non-default backend:

```env
VITE_API_URL=http://localhost:5000
```

The clients automatically append `/api` if the value does not already end with `/api`.

## Local Development

Install dependencies in each app:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

Start the backend:

```bash
cd backend
npm run dev
```

The API starts on `http://localhost:5000` by default. If the port is busy, the server tries the next available ports.

Start the customer app:

```bash
cd frontend
npm run dev
```

Start the admin app:

```bash
cd admin
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Admin: `http://localhost:5174` or the next Vite port shown in the terminal
- Backend health check: `http://localhost:5000/api/health`

## Available Scripts

Root:

```bash
npm run build
```

The root build installs frontend and admin dependencies, builds both Vite apps, and copies the output into `dist/` with the admin dashboard under `dist/admin`.

Backend:

```bash
npm start      # Start server.js
npm run dev    # Start with nodemon
npm run seed   # Seed sample data
```

Frontend and admin:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## API Overview

Base URL: `http://localhost:5000/api`

- `GET /health` - Check backend status
- `GET /food` - List food items, optionally filtered by `category`
- `GET /food/:id` - Get one food item
- `POST /food` - Create a food item
- `PUT /food/:id` - Update a food item
- `DELETE /food/:id` - Delete a food item
- `POST /food/:id/rate` - Rate a food item
- `POST /auth/register` - Register a user
- `POST /auth/login` - Log in a user
- `GET /auth/profile/:id` - Get a user profile
- `PUT /auth/profile/:id` - Update a user profile
- `POST /orders` - Place an order
- `GET /orders` - List all orders
- `GET /orders/user/:email` - List orders for a user
- `GET /orders/:id` - Get one order
- `PUT /orders/:id` - Update order status
- `DELETE /orders/:id` - Cancel an order
- `POST /admin/login` - Admin login
- `GET /admin/stats` - Dashboard statistics
- `GET /admin/users` - List users
- `POST /upload/upload` - Upload an image to Cloudinary
- `DELETE /upload/delete/:publicId` - Delete an image from Cloudinary

Default admin credentials are read from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. If those variables are not set, the backend falls back to:

```text
admin@fooddel.com
admin123
```

## Deployment

This repository includes a Vercel-oriented static build setup:

1. `npm run build` builds `frontend/` and `admin/`.
2. `scripts/prepare-vercel-output.js` copies `frontend/dist` into root `dist`.
3. The same script copies `admin/dist` into `dist/admin`.
4. `vercel.json` routes `/admin/*` to the admin dashboard and all other frontend routes to the customer app.

The Express backend is a separate Node server and needs its own hosting environment with the backend environment variables configured.

## Notes

- Do not commit real `.env` files or service credentials.
- `backend/.env.example` is the source of truth for backend configuration.
- The backend CORS configuration allows localhost development and this project's Vercel preview/production URL pattern.
