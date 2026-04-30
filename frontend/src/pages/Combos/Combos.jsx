import React, { useContext, useState } from 'react'
import './Combos.css'
import { StoreContext } from '../../context/StoreContext'

const Combos = () => {
    const { combos, addToCart, food_list } = useContext(StoreContext)
    const [addedCombo, setAddedCombo] = useState(null)

    const handleAddCombo = (combo) => {
        // Add each item in the combo to cart
        combo.itemIds.forEach(itemId => {
            addToCart(itemId)
        })

        setAddedCombo(combo._id)
        setTimeout(() => setAddedCombo(null), 2000)
    }

    const getSavingsAmount = (combo) => {
        return combo.original_price - combo.combo_price
    }

    const getComboImage = (itemIds) => {
        const images = []
        itemIds.forEach(id => {
            const food = food_list.find(f => f._id === id)
            if (food) images.push(food.image)
        })
        return images.slice(0, 3)
    }

    return (
        <div className='combos-container'>
            <div className='combos-header'>
                <h1>🍽️ Combo Deals</h1>
                <p>Get more value for your money with our special combo packages</p>
            </div>

            <div className='combos-grid'>
                {combos.map((combo) => (
                    <div key={combo._id} className='combo-card'>
                        {/* Save Badge */}
                        <div className='save-badge'>
                            <div className='save-content'>
                                <span className='save-percent'>{combo.discount_percentage}%</span>
                                <span className='save-text'>OFF</span>
                            </div>
                        </div>

                        {/* Combo Images */}
                        <div className='combo-image-section'>
                            <div className='combo-images'>
                                {getComboImage(combo.itemIds).map((img, idx) => (
                                    <img key={idx} src={img} alt={`item-${idx}`} className='combo-item-img' />
                                ))}
                                {combo.itemIds.length > 3 && (
                                    <div className='more-items'>+{combo.itemIds.length - 3}</div>
                                )}
                            </div>
                        </div>

                        {/* Combo Details */}
                        <div className='combo-details'>
                            <h3>{combo.title}</h3>
                            <p className='combo-desc'>{combo.description}</p>

                            {/* Items List */}
                            <div className='items-list'>
                                {combo.items.map((item, idx) => (
                                    <div key={idx} className='list-item'>
                                        <span className='checkmark'>✓</span>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Rating and Info */}
                            <div className='combo-meta'>
                                <div className='rating-box'>
                                    <span className='stars'>⭐ {combo.rating}</span>
                                    <span className='reviews'>({combo.reviews})</span>
                                </div>
                                <div className='time-box'>
                                    <span className='icon'>⏱️</span>
                                    <span>{combo.time}</span>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className='pricing-section'>
                                <div className='price-info'>
                                    <div className='price-row'>
                                        <span className='original-price'>₹{combo.original_price}</span>
                                        <span className='combo-price'>₹{combo.combo_price}</span>
                                    </div>
                                    <span className='save-amount'>Save ₹{getSavingsAmount(combo)}</span>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                className={`add-btn ${addedCombo === combo._id ? 'added' : ''}`}
                                onClick={() => handleAddCombo(combo)}
                            >
                                {addedCombo === combo._id ? '✓ Added to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Why Choose Section */}
            <div className='why-choose'>
                <h2>Why Choose Combos?</h2>
                <div className='benefits-row'>
                    <div className='benefit'>
                        <div className='benefit-icon'>💰</div>
                        <h4>Save Money</h4>
                        <p>Save up to 37% compared to individual orders</p>
                    </div>
                    <div className='benefit'>
                        <div className='benefit-icon'>⚡</div>
                        <h4>Quick Delivery</h4>
                        <p>Pre-packed combos delivered fast</p>
                    </div>
                    <div className='benefit'>
                        <div className='benefit-icon'>👌</div>
                        <h4>Best Pairing</h4>
                        <p>Carefully selected items that go perfectly together</p>
                    </div>
                    <div className='benefit'>
                        <div className='benefit-icon'>🎯</div>
                        <h4>Perfect Portions</h4>
                        <p>Right amount of food for 1-4 people</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Combos
