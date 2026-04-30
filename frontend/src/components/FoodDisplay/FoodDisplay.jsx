import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const FoodDisplay = ({ category }) => {
    const { food_list, cartItems, addToCart, removeFromCart } = useContext(StoreContext)

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <div key={index} className='food-item'>
                                <div className='food-item-image-container'>
                                    <img src={item.image} alt={item.name} className='food-item-image' />
                                    {!cartItems[item._id] ? (
                                        <img
                                            className='add-icon'
                                            src={assets.add_icon_white}
                                            onClick={() => addToCart(item._id)}
                                            alt="Add to cart"
                                        />
                                    ) : (
                                        <div className='food-item-counter'>
                                            <img
                                                src={assets.remove_icon_red}
                                                onClick={() => removeFromCart(item._id)}
                                                alt="Remove"
                                            />
                                            <p>{cartItems[item._id]}</p>
                                            <img
                                                src={assets.add_icon_green}
                                                onClick={() => addToCart(item._id)}
                                                alt="Add"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className='food-item-info'>
                                    <div className='food-item-name-rating'>
                                        <p className='food-item-name'>{item.name}</p>
                                        <img src={assets.rating_starts} alt="rating" className='food-item-rating' />
                                    </div>
                                    <p className='food-item-description'>{item.description}</p>
                                    <p className='food-item-price'>₹{item.price}</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay