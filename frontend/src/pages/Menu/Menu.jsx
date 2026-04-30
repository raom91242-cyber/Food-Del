import React, { useContext, useState } from 'react'
import './Menu.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const Menu = () => {
    const { food_list, cartItems, addToCart, removeFromCart } = useContext(StoreContext)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchTerm, setSearchTerm] = useState("")

    // Get unique categories from food_list
    const categories = ["All", ...new Set(food_list.map(food => food.category))]

    // Filter foods based on category and search term
    const filteredFoods = food_list.filter(food => {
        const categoryMatch = selectedCategory === "All" || food.category === selectedCategory
        const searchMatch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            food.description.toLowerCase().includes(searchTerm.toLowerCase())
        return categoryMatch && searchMatch
    })

    return (
        <div className='menu-page'>
            <div className='menu-container'>
                <h1 className='menu-title'>Our Complete Menu</h1>
                <p className='menu-subtitle'>Explore our delicious food items</p>

                {/* Search Bar */}
                <div className='menu-search-bar'>
                    <img src={assets.search_icon} alt="Search" />
                    <input
                        type="text"
                        placeholder="Search food items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Category Filter */}
                <div className='menu-categories'>
                    <h3>Filter by Category</h3>
                    <div className='category-buttons'>
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Food Items Display */}
                <div className='menu-items-section'>
                    <h3 className='items-count'>
                        {filteredFoods.length} item{filteredFoods.length !== 1 ? 's' : ''} found
                    </h3>

                    {filteredFoods.length > 0 ? (
                        <div className='food-items-grid'>
                            {filteredFoods.map(food => (
                                <div key={food._id} className='menu-food-item'>
                                    <div className='item-image-container'>
                                        <img src={food.image} alt={food.name} className='item-image' />
                                        <div className='item-overlay'>
                                            <p className='item-category-badge'>{food.category}</p>
                                        </div>
                                    </div>

                                    <div className='item-content'>
                                        <h4 className='item-name'>{food.name}</h4>
                                        <p className='item-description'>{food.description}</p>

                                        <div className='item-footer'>
                                            <span className='item-price'>₹{food.price}</span>
                                            <div className='item-controls'>
                                                {!cartItems[food._id] ? (
                                                    <button
                                                        className='add-btn'
                                                        onClick={() => addToCart(food._id)}
                                                    >
                                                        <img src={assets.add_icon_white} alt="Add" />
                                                        Add
                                                    </button>
                                                ) : (
                                                    <div className='quantity-control'>
                                                        <button
                                                            className='qty-btn'
                                                            onClick={() => removeFromCart(food._id)}
                                                        >
                                                            <img src={assets.remove_icon_red} alt="Remove" />
                                                        </button>
                                                        <span className='qty-display'>{cartItems[food._id]}</span>
                                                        <button
                                                            className='qty-btn'
                                                            onClick={() => addToCart(food._id)}
                                                        >
                                                            <img src={assets.add_icon_green} alt="Add" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='no-items-found'>
                            <img src={assets.basket_icon} alt="No items" />
                            <h3>No items found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menu
