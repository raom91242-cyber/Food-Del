// seeds/seedData.js
const mongoose = require('mongoose');
const Food = require('../models/Food');
const dotenv = require('dotenv');

dotenv.config();

// Sample food data with Cloudinary URLs (using placeholder service)
const sampleFoods = [
    {
        name: "Greek Salad",
        price: 120,
        category: "Salad",
        description: "Fresh Greek salad with tomatoes, cucumbers, olives, and feta cheese",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Greek+Salad",
        rating: 4.5,
        reviews: 245
    },
    {
        name: "Veg Salad",
        price: 180,
        category: "Salad",
        description: "Mixed vegetable salad with fresh greens and house dressing",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Veg+Salad",
        rating: 4.3,
        reviews: 189
    },
    {
        name: "Clover Salad",
        price: 160,
        category: "Salad",
        description: "Nutritious salad with clover sprouts and seasonal vegetables",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Clover+Salad",
        rating: 4.4,
        reviews: 156
    },
    {
        name: "Chicken Salad",
        price: 240,
        category: "Salad",
        description: "Grilled chicken with mixed greens and light vinaigrette",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Chicken+Salad",
        rating: 4.6,
        reviews: 312
    },
    {
        name: "Veg Rolls",
        price: 150,
        category: "Rolls",
        description: "Crispy vegetable rolls with sweet and spicy dipping sauce",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Veg+Rolls",
        rating: 4.4,
        reviews: 278
    },
    {
        name: "Egg Rolls",
        price: 120,
        category: "Rolls",
        description: "Traditional egg rolls filled with vegetables and meat",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Egg+Rolls",
        rating: 4.3,
        reviews: 201
    },
    {
        name: "Spring Rolls",
        price: 90,
        category: "Rolls",
        description: "Light and fresh spring rolls with peanut dipping sauce",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Spring+Rolls",
        rating: 4.2,
        reviews: 167
    },
    {
        name: "Brownie",
        price: 130,
        category: "Deserts",
        description: "Rich chocolate brownie with fudgy center",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Brownie",
        rating: 4.7,
        reviews: 389
    },
    {
        name: "Chocolate Cake",
        price: 200,
        category: "Deserts",
        description: "Delicious multi-layered chocolate cake with cream filling",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Chocolate+Cake",
        rating: 4.8,
        reviews: 456
    },
    {
        name: "Cheesecake",
        price: 180,
        category: "Deserts",
        description: "Creamy New York style cheesecake with berry topping",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Cheesecake",
        rating: 4.6,
        reviews: 334
    },
    {
        name: "Veg Sandwich",
        price: 140,
        category: "Sandwich",
        description: "Fresh vegetable sandwich with whole wheat bread",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Veg+Sandwich",
        rating: 4.2,
        reviews: 145
    },
    {
        name: "Chicken Sandwich",
        price: 180,
        category: "Sandwich",
        description: "Grilled chicken breast sandwich with lettuce and tomato",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Chicken+Sandwich",
        rating: 4.4,
        reviews: 223
    },
    {
        name: "Margherita Pizza",
        price: 140,
        category: "Pasta",
        description: "Classic margherita pizza with fresh mozzarella and basil",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Margherita+Pizza",
        rating: 4.5,
        reviews: 267
    },
    {
        name: "Pepperoni Pizza",
        price: 160,
        category: "Pasta",
        description: "Loaded with pepperoni and mozzarella cheese",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Pepperoni+Pizza",
        rating: 4.6,
        reviews: 301
    },
    {
        name: "Garlic Bread",
        price: 80,
        category: "Sandwich",
        description: "Toasted bread with garlic butter and herbs",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Garlic+Bread",
        rating: 4.3,
        reviews: 156
    },
    {
        name: "Veggie Cake",
        price: 170,
        category: "Cake",
        description: "Healthy vegetable-based cake with no refined sugar",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Veggie+Cake",
        rating: 4.1,
        reviews: 98
    },
    {
        name: "Black Forest Cake",
        price: 210,
        category: "Cake",
        description: "Traditional black forest cake with cherries and whipped cream",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Black+Forest",
        rating: 4.7,
        reviews: 412
    },
    {
        name: "Veg Noodles",
        price: 110,
        category: "Noodles",
        description: "Stir-fried noodles with fresh vegetables",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Veg+Noodles",
        rating: 4.2,
        reviews: 189
    },
    {
        name: "Hakka Noodles",
        price: 130,
        category: "Noodles",
        description: "Indo-Chinese style hakka noodles with gravy",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Hakka+Noodles",
        rating: 4.4,
        reviews: 234
    },
    {
        name: "Paneer Tikka",
        price: 200,
        category: "Pure Veg",
        description: "Grilled paneer cubes marinated in yogurt and spices",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Paneer+Tikka",
        rating: 4.6,
        reviews: 345
    },
    {
        name: "Vegetable Biryani",
        price: 160,
        category: "Pure Veg",
        description: "Aromatic rice cooked with vegetables and spices",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Veg+Biryani",
        rating: 4.5,
        reviews: 267
    },
    {
        name: "Mushroom Pasta",
        price: 150,
        category: "Pasta",
        description: "Creamy pasta with fresh mushrooms and herbs",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Mushroom+Pasta",
        rating: 4.3,
        reviews: 198
    },
    {
        name: "Alfredo Pasta",
        price: 170,
        category: "Pasta",
        description: "Classic pasta alfredo with parmesan cheese",
        image: "https://res.cloudinary.com/demo/image/fetch/https://via.placeholder.com/300x300?text=Alfredo+Pasta",
        rating: 4.5,
        reviews: 289
    }
];

// Seed data function
const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Clear existing food items
        await Food.deleteMany({});
        console.log('Cleared existing food items');

        // Insert sample food items
        const insertedFoods = await Food.insertMany(sampleFoods);
        console.log(`${insertedFoods.length} food items seeded successfully!`);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

// Run seed if this file is executed directly
if (require.main === module) {
    seedData();
}

module.exports = seedData;
