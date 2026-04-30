// models/Food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a food name']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        default: 'Medium'
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/300'
    },
    cloudinary_public_id: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);
