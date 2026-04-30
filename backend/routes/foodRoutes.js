const express = require('express');
const router = express.Router();
const Food = require('../models/Food');


/* ================================
   RATE FOOD (PUT THIS FIRST)
================================ */
router.post('/:id/rate', async (req, res) => {
    try {
        const { rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Food not found'
            });
        }

        // Safe defaults (IMPORTANT)
        const currentRating = food.rating || 0;
        const currentReviews = food.reviews || 0;

        const totalRating = (currentRating * currentReviews) + rating;
        const newReviews = currentReviews + 1;
        const newRating = totalRating / newReviews;

        food.rating = newRating;
        food.reviews = newReviews;

        await food.save();

        res.json({
            success: true,
            data: {
                rating: food.rating,
                reviews: food.reviews
            },
            message: 'Thanks for rating!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});


/* ================================
   GET ALL FOODS
================================ */
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        const foods = await Food.find(query);

        res.json({
            success: true,
            data: foods
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching foods' });
    }
});


/* ================================
   GET SINGLE FOOD
================================ */
router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        res.json({ success: true, data: food });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching food' });
    }
});


/* ================================
   ADD FOOD
================================ */
router.post('/', async (req, res) => {
    try {
        const { name, price, category, size, description, image } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const food = new Food({
            name,
            price,
            category,
            size: size || 'Medium',
            description: description || '',
            image: image || '',
            rating: 0,
            reviews: 0
        });

        const saved = await food.save();

        res.status(201).json({
            success: true,
            data: saved
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding food' });
    }
});


/* ================================
   UPDATE FOOD
================================ */
router.put('/:id', async (req, res) => {
    try {
        const updated = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        res.json({ success: true, data: updated });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating food' });
    }
});


/* ================================
   DELETE FOOD
================================ */
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Food.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        res.json({ success: true, message: 'Deleted successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting food' });
    }
});


module.exports = router;