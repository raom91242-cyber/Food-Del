// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// Connect to MongoDB
connectDB();

// CORS Configuration
const envOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URLS
]
    .filter(Boolean)
    .flatMap(origin => origin.split(','))
    .map(origin => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

const allowedOrigins = [
    ...envOrigins,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000'
];

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.replace(/\/$/, '');

        // Check if origin is in allowed list
        if (allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        }

        // Also allow any localhost during development
        if (normalizedOrigin.includes('localhost') || normalizedOrigin.includes('127.0.0.1')) {
            return callback(null, true);
        }

        // Optional: allow Vercel preview deployments for this project.
        if (
            process.env.ALLOW_VERCEL_PREVIEWS === 'true' &&
            /^https:\/\/food-del-[a-z0-9-]+\.vercel\.app$/i.test(normalizedOrigin)
        ) {
            return callback(null, true);
        }

        callback(new Error('CORS not allowed'));
    },
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/food', require('./routes/foodRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const http = require('http');
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

const server = http.createServer(app);

const MAX_PORT_TRIES = 10;

let tryPort = DEFAULT_PORT;
let attempts = 0;

server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.warn(`Port ${tryPort} in use. Attempting port ${tryPort + 1}...`);
        attempts += 1;
        if (attempts > MAX_PORT_TRIES) {
            console.error(`Failed to bind server after ${attempts} attempts. Exiting.`);
            process.exit(1);
        }
        tryPort += 1;
        setTimeout(() => server.listen(tryPort), 200);
        return;
    }
    console.error('Server error:', err);
    process.exit(1);
});

server.on('listening', () => {
    const addr = server.address();
    const port = addr && addr.port ? addr.port : tryPort;
    console.log(`Server running on http://localhost:${port}`);
});

server.listen(tryPort);

module.exports = app;
