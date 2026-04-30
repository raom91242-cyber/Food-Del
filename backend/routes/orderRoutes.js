// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create order
router.post('/', async (req, res) => {
    try {
        console.log('Order request received:', JSON.stringify(req.body, null, 2));

        const { firstName, lastName, email, street, city, state, zipcode, country, phone, items, totalAmount, paymentMethod } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone || !items || !totalAmount) {
            console.log('Missing fields:', { firstName, lastName, email, street, city, state, zipcode, country, phone, items, totalAmount });
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (items.length === 0) {
            return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
        }

        const newOrder = new Order({
            firstName,
            lastName,
            email,
            address: {
                street,
                city,
                state,
                zipcode,
                country
            },
            phone,
            items,
            totalAmount,
            paymentMethod,
            status: 'Pending',
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        });

        console.log('Attempting to save order...');
        const savedOrder = await newOrder.save();
        console.log('Order saved successfully:', savedOrder._id);

        res.status(201).json({ success: true, data: savedOrder, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error creating order:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all orders (admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get user orders
router.get('/user/:email', async (req, res) => {
    try {
        const userOrders = await Order.find({ email: req.params.email });
        res.json({ success: true, data: userOrders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update order status (admin)
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, data: order, message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cancel order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, data: order, message: 'Order cancelled' });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
