import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { API_BASE_URL } from '../../services/api'

const PlaceOrder = () => {
    const { user, getTotalAmount, clearCart, cartItems, food_list, appliedDiscount, applyDiscount, removeDiscount, getDiscountAmount } = useContext(StoreContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        street: user?.address || '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: user?.phone || ''
    })
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [loading, setLoading] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const [couponError, setCouponError] = useState('')
    const [couponSuccess, setCouponSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code')
            setCouponSuccess('')
            return
        }
        const result = applyDiscount(couponCode)
        if (result.success) {
            setCouponSuccess(`Coupon "${couponCode}" applied successfully! You save ₹${getDiscountAmount().toFixed(0)}`)
            setCouponError('')
            setCouponCode('')
        } else {
            setCouponError('Invalid coupon code. Please try again.')
            setCouponSuccess('')
        }
    }

    const handleRemoveCoupon = () => {
        removeDiscount()
        setCouponSuccess('')
        setCouponError('')
        setCouponCode('')
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Prepare order data with complete item information
            const orderData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zipcode: formData.zipcode,
                country: formData.country,
                items: Object.keys(cartItems).map(itemId => {
                    const food = food_list.find(f => f._id === itemId)
                    return {
                        id: itemId,
                        quantity: cartItems[itemId],
                        name: food?.name,
                        price: food?.price
                    }
                }),
                totalAmount: (getTotalAmount() + getTotalAmount() * 0.1 + 2.5) - getDiscountAmount(),
                discountApplied: appliedDiscount ? appliedDiscount.code : null,
                discountAmount: getDiscountAmount(),
                paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'wallet' ? 'Digital Wallet' : 'Cash on Delivery'
            }

            // Send order to backend API
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })

            if (!response.ok) {
                throw new Error('Failed to place order')
            }

            const result = await response.json()
            setOrderPlaced(true)
            clearCart()

            setTimeout(() => {
                navigate('/')
            }, 3000)
        } catch (err) {
            console.error('Order placement failed:', err)
            alert('Failed to place order. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!user) {
        return (
            <div className='place-order-error'>
                <p>Please sign in to place an order</p>
                <button onClick={() => navigate('/signin')}>Sign In</button>
            </div>
        )
    }

    if (orderPlaced) {
        return (
            <div className='order-success'>
                <div className='success-content'>
                    <div className='success-icon'>✓</div>
                    <h1>Order Placed Successfully!</h1>
                    <p>Your order has been confirmed and will be delivered soon.</p>
                    <p className='order-number'>Order ID: #{Math.floor(Math.random() * 1000000)}</p>
                    <p className='redirecting-text'>Redirecting to home page...</p>
                </div>
            </div>
        )
    }

    const totalItems = Object.values(cartItems).reduce((acc, val) => acc + val, 0)
    const subtotal = getTotalAmount()
    const discountAmount = getDiscountAmount()
    const tax = subtotal * 0.1
    const deliveryFee = subtotal > 0 ? 50 : 0
    const total = subtotal + tax + deliveryFee - discountAmount

    return (
        <div className='place-order'>
            <div className='place-order-container'>
                <div className='order-form-section'>
                    <h1>Delivery Information</h1>

                    <form onSubmit={handlePlaceOrder} className='order-form'>
                        <div className='form-section'>
                            <h3>Personal Details</h3>
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>First Name</label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Last Name</label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='form-group'>
                                <label>Email Address</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label>Phone Number</label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-section'>
                            <h3>Delivery Address</h3>

                            <div className='form-group'>
                                <label>Street Address</label>
                                <input
                                    type='text'
                                    name='street'
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>City</label>
                                    <input
                                        type='text'
                                        name='city'
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>State</label>
                                    <input
                                        type='text'
                                        name='state'
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>Zip Code</label>
                                    <input
                                        type='text'
                                        name='zipcode'
                                        value={formData.zipcode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Country</label>
                                    <input
                                        type='text'
                                        name='country'
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-section'>
                            <h3>Payment Method</h3>
                            <div className='payment-options'>
                                <label className='payment-option'>
                                    <input
                                        type='radio'
                                        name='payment'
                                        value='card'
                                        checked={paymentMethod === 'card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span>Credit/Debit Card</span>
                                </label>
                                <label className='payment-option'>
                                    <input
                                        type='radio'
                                        name='payment'
                                        value='wallet'
                                        checked={paymentMethod === 'wallet'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span>Digital Wallet</span>
                                </label>
                                <label className='payment-option'>
                                    <input
                                        type='radio'
                                        name='payment'
                                        value='cod'
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span>Cash on Delivery</span>
                                </label>
                            </div>
                        </div>

                        <button type='submit' className='place-order-btn' disabled={loading}>
                            {loading ? 'Placing Order...' : `Place Order - ₹${total.toFixed(0)}`}
                        </button>
                    </form>
                </div>

                <div className='order-summary-section'>
                    <h2>Order Summary</h2>

                    <div className='order-items-list'>
                        <div className='summary-header'>
                            <span>Item</span>
                            <span>Qty</span>
                            <span>Total</span>
                        </div>

                        {food_list.map((food) => {
                            if (cartItems[food._id]) {
                                return (
                                    <div key={food._id} className='order-item'>
                                        <span className='item-name'>
                                            {food.name} x{cartItems[food._id]}
                                        </span>
                                        <span className='item-qty'>{cartItems[food._id]}</span>
                                        <span className='item-total'>
                                            ₹{(food.price * cartItems[food._id]).toFixed(0)}
                                        </span>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <hr className='summary-divider' />

                    <div className='summary-detail'>
                        <span>Subtotal ({totalItems} items)</span>
                        <span>₹{subtotal.toFixed(0)}</span>
                    </div>

                    <div className='summary-detail'>
                        <span>Delivery Fee</span>
                        <span>₹{deliveryFee.toFixed(0)}</span>
                    </div>

                    <div className='summary-detail'>
                        <span>Tax (10%)</span>
                        <span>₹{tax.toFixed(0)}</span>
                    </div>

                    <hr className='summary-divider' />

                    {/* Coupon Section */}
                    <div className='coupon-section'>
                        {appliedDiscount ? (
                            <div className='applied-coupon'>
                                <div className='coupon-info'>
                                    <p className='coupon-code'>✓ Coupon Applied: <strong>{appliedDiscount.code}</strong></p>
                                    <p className='coupon-desc'>{appliedDiscount.title}</p>
                                </div>
                                <button
                                    type='button'
                                    className='remove-coupon-btn'
                                    onClick={handleRemoveCoupon}
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className='coupon-input-group'>
                                <input
                                    type='text'
                                    placeholder='Enter coupon code'
                                    value={couponCode}
                                    onChange={(e) => {
                                        setCouponCode(e.target.value)
                                        setCouponError('')
                                        setCouponSuccess('')
                                    }}
                                    className='coupon-input'
                                />
                                <button
                                    type='button'
                                    className='apply-coupon-btn'
                                    onClick={handleApplyCoupon}
                                >
                                    Apply
                                </button>
                            </div>
                        )}
                        {couponError && <p className='coupon-error'>{couponError}</p>}
                        {couponSuccess && <p className='coupon-success'>{couponSuccess}</p>}
                    </div>

                    {appliedDiscount && (
                        <div className='summary-detail discount-detail'>
                            <span>Discount ({appliedDiscount.discount_percentage}%)</span>
                            <span>-₹{discountAmount.toFixed(0)}</span>
                        </div>
                    )}

                    <hr className='summary-divider' />

                    <div className='summary-detail total-detail'>
                        <span>Total</span>
                        <span>₹{total.toFixed(0)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
