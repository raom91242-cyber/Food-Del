import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const Cart = () => {
    const { food_list, cartItems, removeFromCart, addToCart, getTotalAmount, user } = useContext(StoreContext)
    const navigate = useNavigate()

    const cartFoods = food_list.filter((food) => cartItems[food._id])

    const handleCheckout = () => {
        if (!user) {
            navigate('/signin')
            return
        }
        navigate('/order')
    }

    if (cartFoods.length === 0) {
        return (
            <div className='cart-empty'>
                <div className='empty-cart-content'>
                    <img src={assets.basket_icon} alt="Empty Cart" />
                    <h2>Your cart is empty</h2>
                    <p>Add some delicious food from our menu</p>
                    <button onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        )
    }

    return (
        <div className='cart'>
            <div className='cart-container'>
                <h1 className='cart-title'>Your Cart</h1>

                <div className='cart-content'>
                    <div className='cart-items-section'>
                        <table className='cart-items-table'>
                            <thead>
                                <tr>
                                    <th className='item-col'>Items</th>
                                    <th className='price-col'>Price</th>
                                    <th className='quantity-col'>Quantity</th>
                                    <th className='total-col'>Total</th>
                                    <th className='action-col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartFoods.map((food) => (
                                    <tr key={food._id} className='cart-item-row'>
                                        <td className='item-cell'>
                                            <div className='item-info'>
                                                <img src={food.image} alt={food.name} className='item-image' />
                                                <div className='item-details'>
                                                    <p className='item-name'>{food.name}</p>
                                                    <p className='item-category'>{food.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='price-cell'>₹{food.price}</td>
                                        <td className='quantity-cell'>
                                            <div className='quantity-control'>
                                                <button
                                                    className='qty-btn'
                                                    onClick={() => removeFromCart(food._id)}
                                                >
                                                    −
                                                </button>
                                                <span className='qty-display'>{cartItems[food._id]}</span>
                                                <button
                                                    className='qty-btn'
                                                    onClick={() => addToCart(food._id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className='total-cell'>
                                            ₹{(food.price * cartItems[food._id]).toFixed(0)}
                                        </td>
                                        <td className='action-cell'>
                                            <button
                                                className='remove-btn'
                                                onClick={() => removeFromCart(food._id)}
                                                title='Remove item'
                                            >
                                                ×
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='cart-summary-section'>
                        <div className='cart-summary'>
                            <h2>Order Summary</h2>

                            <div className='summary-item'>
                                <span>Items ({cartFoods.reduce((acc, food) => acc + cartItems[food._id], 0)})</span>
                                <span>₹{getTotalAmount().toFixed(0)}</span>
                            </div>

                            <div className='summary-item'>
                                <span>Delivery Fee</span>
                                <span>₹{getTotalAmount() > 0 ? (50).toFixed(0) : '0'}</span>
                            </div>

                            <div className='summary-item'>
                                <span>Tax (10%)</span>
                                <span>₹{(getTotalAmount() * 0.1).toFixed(0)}</span>
                            </div>

                            <hr className='summary-divider' />

                            <div className='summary-item total-item'>
                                <span>Total Amount</span>
                                <span>₹{(getTotalAmount() + getTotalAmount() * 0.1 + (getTotalAmount() > 0 ? 50 : 0)).toFixed(0)}</span>
                            </div>

                            <button className='checkout-btn' onClick={handleCheckout}>
                                Proceed to Checkout
                            </button>

                            <button className='continue-shopping-btn' onClick={() => navigate('/')}>
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
