// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Food = require('../models/Food');

// Mock admin data and authentication
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@fooddel.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

let adminUsers = [
    {
        _id: '1',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD, // In production, this should be hashed
        name: 'Admin User',
        role: 'admin'
    }
];

// Admin login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = adminUsers.find(u => u.email === email && u.password === password);

    if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    res.json({
        success: true,
        message: 'Login successful',
        data: {
            _id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            token
        }
    });
});

// Cloudinary upload (for admin to upload food images)
router.post('/upload', (req, res) => {
    // In production, integrate with Cloudinary
    // For now, return a placeholder

    if (!req.body.image) {
        return res.status(400).json({ success: false, message: 'Image is required' });
    }

    res.json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
            imageUrl: 'https://via.placeholder.com/150',
            publicId: 'placeholder_' + Date.now()
        }
    });
});

// Get admin profile
router.get('/profile/:id', (req, res) => {
    const admin = adminUsers.find(u => u._id === req.params.id);

    if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.json({
        success: true,
        data: {
            _id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role
        }
    });
});

// Admin stats for dashboard
router.get('/stats', async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const ordersCount = await Order.countDocuments();
        const foodsCount = await Food.countDocuments();

        const orders = await Order.find();
        const revenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        res.json({
            success: true,
            data: {
                usersCount,
                ordersCount,
                foodsCount,
                revenue
            }
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ success: false, message: 'Server error fetching stats' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error fetching users' });
    }
});

module.exports = router;
