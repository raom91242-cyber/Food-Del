# FoodDel Backend API

RESTful API for FoodDel food delivery application built with Node.js and Express.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables**
   ```
   PORT=5000
   JWT_SECRET=your_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ADMIN_EMAIL=admin@fooddel.com
   ADMIN_PASSWORD=admin123
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

Server runs on `http://localhost:5000`

## 📚 API Documentation

### Food Items

#### Get All Foods
```
GET /api/food
Query params: category (optional)
Response: { success: true, data: [...] }
```

#### Get Single Food
```
GET /api/food/:id
Response: { success: true, data: {...} }
```

#### Add Food (Admin)
```
POST /api/food
Body: {
  name: string,
  price: number,
  category: string,
  description: string,
  image: string (URL or base64)
}
```

#### Update Food (Admin)
```
PUT /api/food/:id
Body: { name?, price?, category?, description?, image? }
```

#### Delete Food (Admin)
```
DELETE /api/food/:id
```

### Orders

#### Get All Orders
```
GET /api/orders
Response: { success: true, data: [...] }
```

#### Get User Orders
```
GET /api/orders/user/:email
```

#### Create Order
```
POST /api/orders
Body: {
  firstName: string,
  lastName: string,
  email: string,
  street: string,
  city: string,
  state: string,
  zipcode: string,
  country: string,
  phone: string,
  items: [...],
  totalAmount: number,
  paymentMethod: string
}
```

#### Update Order Status
```
PUT /api/orders/:id
Body: { status: string }
Status values: Pending, Confirmed, Shipped, Delivered, Cancelled
```

#### Cancel Order
```
DELETE /api/orders/:id
```

### Admin

#### Admin Login
```
POST /api/admin/login
Body: {
  email: string,
  password: string
}
Response: {
  success: true,
  data: {
    _id: string,
    email: string,
    name: string,
    role: string,
    token: string
  }
}
```

#### Upload Image
```
POST /api/admin/upload
Body: { image: file or base64 }
Note: Ready for Cloudinary integration
```

#### Get Admin Profile
```
GET /api/admin/profile/:id
```

### Authentication

#### Register User
```
POST /api/auth/register
Body: {
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string
}
```

#### Login User
```
POST /api/auth/login
Body: {
  email: string,
  password: string
}
```

#### Get User Profile
```
GET /api/auth/profile/:id
```

#### Update User Profile
```
PUT /api/auth/profile/:id
Body: { name?, phone?, address? }
```

## 📁 Project Structure

```
backend/
├── routes/
│   ├── foodRoutes.js      # Food CRUD operations
│   ├── orderRoutes.js     # Order management
│   ├── adminRoutes.js     # Admin operations
│   └── authRoutes.js      # User authentication
├── server.js              # Express app setup
├── package.json           # Dependencies
└── .env.example          # Environment variables template
```

## 🔑 Default Credentials

**Admin Account:**
- Email: `admin@fooddel.com`
- Password: `admin123`

## 🗄️ Data Models

### Food
```javascript
{
  _id: string,
  name: string,
  price: number,
  category: string,
  description: string,
  image: string (URL)
}
```

### Order
```javascript
{
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  address: {
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string
  },
  phone: string,
  items: [{
    _id: string,
    quantity: number,
    name: string
  }],
  totalAmount: number,
  paymentMethod: string,
  status: string,
  orderDate: Date,
  deliveryDate: Date
}
```

### User
```javascript
{
  _id: string,
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string,
  createdAt: Date
}
```

## 🔐 Security Considerations

Current Implementation:
- Basic email/password authentication
- CORS enabled for frontend origin
- JSON payload validation

Future Enhancements:
- [ ] JWT token authentication
- [ ] Password hashing with bcryptjs
- [ ] Rate limiting
- [ ] Request validation middleware
- [ ] Error handling middleware
- [ ] Database integration
- [ ] API key authentication for admin routes

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "multer": "^1.4.5-lts.1",
  "cloudinary": "^1.37.0",
  "stripe": "^11.8.0"
}
```

## 🚀 Features Overview

### Current Features
- ✅ Food CRUD operations
- ✅ Order management
- ✅ Admin authentication
- ✅ User registration/login
- ✅ Order status tracking
- ✅ CORS enabled
- ✅ Error handling
- ✅ RESTful API design

### Future Features
- [ ] Database integration (MongoDB)
- [ ] JWT authentication
- [ ] Password hashing
- [ ] Email notifications
- [ ] Payment processing (Stripe)
- [ ] Image upload (Cloudinary)
- [ ] Admin analytics
- [ ] User reviews

## 🔗 Integration Guide

### With Cloudinary

1. Create Cloudinary account at cloudinary.com
2. Get your credentials
3. Add to .env:
   ```
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```
4. Install cloudinary package:
   ```bash
   npm install cloudinary
   ```

### With Stripe

1. Create Stripe account
2. Get API keys
3. Add to .env:
   ```
   STRIPE_SECRET_KEY=your_key
   STRIPE_PUBLIC_KEY=your_key
   ```
4. Install stripe package:
   ```bash
   npm install stripe
   ```

### With MongoDB

1. Create MongoDB cluster
2. Get connection string
3. Add to .env:
   ```
   MONGODB_URI=your_connection_string
   ```
4. Install mongoose:
   ```bash
   npm install mongoose
   ```

## 📝 Development Tips

### Adding New Routes
1. Create route file in `/routes`
2. Define endpoints with request handlers
3. Import in `server.js`
4. Add route: `app.use('/api/path', require('./routes/...'))`

### Error Handling
All endpoints return standardized response:
```javascript
{
  success: boolean,
  message: string,
  data: any
}
```

### Testing Endpoints
Use Postman or curl:
```bash
# Example: Get all foods
curl http://localhost:5000/api/food

# Example: Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","...":"..."}'
```

## 🐛 Debugging

Enable detailed logging by checking console output:
```bash
npm run dev
```

Check for:
- 404 Not Found - Route doesn't exist
- 400 Bad Request - Missing or invalid data
- 500 Server Error - Server-side issue
- CORS errors - Check FRONTEND_URL in .env

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)
- [Cloudinary API](https://cloudinary.com/documentation)
- [Stripe API](https://stripe.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

**Built with ❤️ for FoodDel**
