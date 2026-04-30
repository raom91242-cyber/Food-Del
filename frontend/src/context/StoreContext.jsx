import { createContext, useState, useEffect } from "react";
import { food_list as initialFoodList } from "../assets/assets";

export const StoreContext = createContext(null)

// Mock discounts data
const discounts = [
    {
        _id: "discount_1",
        title: "Weekend Special - 20% Off",
        description: "Get 20% discount on all items every Friday to Sunday",
        discount_percentage: 20,
        code: "WEEKEND20",
        applicable_items: "All",
        valid_from: "Every Friday",
        valid_till: "Every Sunday",
        image: "🎉"
    },
    {
        _id: "discount_2",
        title: "First Order - 30% Off",
        description: "New users get 30% discount on their first order",
        discount_percentage: 30,
        code: "FIRST30",
        applicable_items: "All",
        valid_from: "Anytime",
        valid_till: "One time use",
        image: "🎁"
    },
    {
        _id: "discount_3",
        title: "Evening Hours - 15% Off",
        description: "Get 15% discount on orders between 6 PM to 11 PM",
        discount_percentage: 15,
        code: "EVENING15",
        applicable_items: "All",
        valid_from: "6:00 PM",
        valid_till: "11:00 PM",
        image: "🌙"
    },
    {
        _id: "discount_4",
        title: "Bulk Order - 25% Off",
        description: "Order more than 4 items and get 25% discount",
        discount_percentage: 25,
        code: "BULK25",
        applicable_items: "Orders above 4 items",
        valid_from: "Anytime",
        valid_till: "Ongoing",
        image: "📦"
    }
];

// Mock combos data
const combos = [
    {
        _id: "combo_1",
        title: "Salad Lovers",
        description: "Greek Salad + Veg Salad + Caesar Salad",
        items: [
            { name: "Greek Salad", price: 120 },
            { name: "Veg Salad", price: 180 },
            { name: "Caesar Salad", price: 130 }
        ],
        itemIds: ["1", "2", "45"],
        original_price: 430,
        combo_price: 290,
        discount_percentage: 33,
        rating: 4.5,
        reviews: 234,
        serves: 2,
        time: "20 mins"
    },
    {
        _id: "combo_2",
        title: "Budget Meal",
        description: "Veg Rolls + Spring Rolls + Fresh Lemonade",
        items: [
            { name: "Veg Rolls", price: 150 },
            { name: "Spring Rolls", price: 90 },
            { name: "Fresh Lemonade", price: 40 }
        ],
        itemIds: ["8", "47", "51"],
        original_price: 280,
        combo_price: 180,
        discount_percentage: 36,
        rating: 4.3,
        reviews: 189,
        serves: 1,
        time: "15 mins"
    },
    {
        _id: "combo_3",
        title: "Pizza Night",
        description: "Margherita Pizza + Pepperoni Pizza + Iced Tea",
        items: [
            { name: "Margherita Pizza", price: 140 },
            { name: "Pepperoni Pizza", price: 160 },
            { name: "Iced Tea", price: 50 }
        ],
        itemIds: ["41", "42", "52"],
        original_price: 350,
        combo_price: 240,
        discount_percentage: 31,
        rating: 4.6,
        reviews: 412,
        serves: 2,
        time: "25 mins"
    },
    {
        _id: "combo_4",
        title: "Asian Express",
        description: "Hakka Noodles + Vegetable Fried Rice + Cappuccino",
        items: [
            { name: "Hakka Noodles", price: 110 },
            { name: "Veggie Fried Rice", price: 100 },
            { name: "Cappuccino", price: 60 }
        ],
        itemIds: ["62", "56", "50"],
        original_price: 270,
        combo_price: 170,
        discount_percentage: 37,
        rating: 4.4,
        reviews: 298,
        serves: 1,
        time: "18 mins"
    },
    {
        _id: "combo_5",
        title: "Burger Bliss",
        description: "Cheeseburger + Veggie Burger + Coleslaw + Fries",
        items: [
            { name: "Cheeseburger", price: 120 },
            { name: "Veggie Burger", price: 100 },
            { name: "Mix Veg Pulao", price: 100 },
            { name: "Mango Lassi", price: 50 }
        ],
        itemIds: ["43", "44", "23", "49"],
        original_price: 370,
        combo_price: 240,
        discount_percentage: 35,
        rating: 4.5,
        reviews: 356,
        serves: 2,
        time: "22 mins"
    },
    {
        _id: "combo_6",
        title: "Pasta Paradise",
        description: "Cheese Pasta + Baked Ziti + Cappuccino",
        items: [
            { name: "Cheese Pasta", price: 120 },
            { name: "Baked Ziti", price: 150 },
            { name: "Cappuccino", price: 60 }
        ],
        itemIds: ["25", "59", "50"],
        original_price: 330,
        combo_price: 220,
        discount_percentage: 33,
        rating: 4.4,
        reviews: 267,
        serves: 2,
        time: "20 mins"
    },
    {
        _id: "combo_7",
        title: "Indian Feast",
        description: "Paneer Tikka + Dal Makhani + Samosa + Garlic Naan",
        items: [
            { name: "Paneer Tikka", price: 160 },
            { name: "Dal Makhani", price: 140 },
            { name: "Samosa", price: 80 },
            { name: "Garlic Naan", price: 60 }
        ],
        itemIds: ["33", "37", "38", "39"],
        original_price: 440,
        combo_price: 290,
        discount_percentage: 34,
        rating: 4.7,
        reviews: 523,
        serves: 2,
        time: "28 mins"
    },
    {
        _id: "combo_8",
        title: "Sweet Tooth",
        description: "Cup Cake + Vanilla Ice Cream + Mango Lassi",
        items: [
            { name: "Cup Cake", price: 140 },
            { name: "Vanilla Ice Cream", price: 120 },
            { name: "Mango Lassi", price: 50 }
        ],
        itemIds: ["17", "12", "49"],
        original_price: 310,
        combo_price: 200,
        discount_percentage: 35,
        rating: 4.5,
        reviews: 145,
        serves: 1,
        time: "10 mins"
    },
    {
        _id: "combo_9",
        title: "Seafood Special",
        description: "Sushi Roll + Seafood Pasta + Iced Tea",
        items: [
            { name: "Sushi Roll", price: 190 },
            { name: "Seafood Pasta", price: 180 },
            { name: "Iced Tea", price: 50 }
        ],
        itemIds: ["46", "57", "52"],
        original_price: 420,
        combo_price: 280,
        discount_percentage: 33,
        rating: 4.6,
        reviews: 198,
        serves: 2,
        time: "25 mins"
    },
    {
        _id: "combo_10",
        title: "Family Feast",
        description: "Chicken Biryani + Butter Chicken + Garlic Naan + Mango Lassi + Gulab Jamun",
        items: [
            { name: "Chicken Biryani", price: 220 },
            { name: "Butter Chicken", price: 180 },
            { name: "Garlic Naan", price: 60 },
            { name: "Mango Lassi", price: 50 },
            { name: "Cup Cake", price: 140 }
        ],
        itemIds: ["34", "40", "39", "49", "17"],
        original_price: 650,
        combo_price: 420,
        discount_percentage: 35,
        rating: 4.8,
        reviews: 687,
        serves: 4,
        time: "35 mins"
    }
];

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState(() => {
        const savedItems = localStorage.getItem('food_items');
        if (savedItems) {
            try {
                return JSON.parse(savedItems);
            } catch (error) {
                console.error('Error parsing stored food items:', error);
            }
        }
        return initialFoodList.map((food) => ({
            ...food,
            rating: food.rating ?? 4.5,
            reviews: food.reviews ?? 0,
        }));
    });
    const [cartItems, setCartItems] = useState({});
    const [user, setUser] = useState(null);
    const [appliedDiscount, setAppliedDiscount] = useState(null);

    // Persist rated food items in localStorage
    useEffect(() => {
        localStorage.setItem('food_items', JSON.stringify(food_list));
    }, [food_list]);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const rateFood = (itemId, rating) => {
        setFoodList((prevFoods) => {
            return prevFoods.map((food) => {
                if (food._id !== itemId) return food;

                const previousReviews = food.reviews || 0;
                const previousRating = food.rating || 4.5;
                const totalRating = previousRating * previousReviews + rating;
                const newReviews = previousReviews + 1;
                const newAverage = parseFloat((totalRating / newReviews).toFixed(1));

                return {
                    ...food,
                    rating: newAverage,
                    reviews: newReviews,
                };
            });
        });
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            newCart[itemId] = (newCart[itemId] || 0) + 1;
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 0) {
                newCart[itemId] -= 1;
            }
            if (newCart[itemId] === 0) {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const getTotalAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const food = food_list.find((f) => f._id === itemId);
            if (food) {
                total += food.price * cartItems[itemId];
            }
        }
        return total;
    };

    const getTotalItems = () => {
        let total = 0;
        for (const itemId in cartItems) {
            total += cartItems[itemId];
        }
        return total;
    };

    const clearCart = () => {
        setCartItems({});
    };

    const applyDiscount = (code) => {
        const discount = discounts.find((d) => d.code.toUpperCase() === code.toUpperCase());
        if (discount) {
            setAppliedDiscount(discount);
            return { success: true, discount };
        }
        return { success: false, message: 'Invalid discount code' };
    };

    const removeDiscount = () => {
        setAppliedDiscount(null);
    };

    const getDiscountAmount = () => {
        if (!appliedDiscount) return 0;
        const subtotal = getTotalAmount();
        return (subtotal * appliedDiscount.discount_percentage) / 100;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
        getTotalItems,
        clearCart,
        user,
        setUser,
        discounts,
        combos,
        appliedDiscount,
        applyDiscount,
        removeDiscount,
        getDiscountAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;