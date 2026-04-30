import React, { useContext, useState } from 'react'
import './Discounts.css'
import { StoreContext } from '../../context/StoreContext'

const Discounts = () => {
    const { discounts } = useContext(StoreContext)
    const [copiedCode, setCopiedCode] = useState(null)

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code)
        setCopiedCode(code)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    return (
        <div className='discounts-container'>
            <div className='discounts-header'>
                <h1>🎉 Amazing Discounts & Offers</h1>
                <p>Save more on your favorite meals with exclusive discounts</p>
            </div>

            <div className='discounts-grid'>
                {discounts.map((discount) => (
                    <div key={discount._id} className='discount-card'>
                        <div className='discount-emoji'>{discount.image}</div>
                        <div className='discount-content'>
                            <h3>{discount.title}</h3>
                            <p className='discount-description'>{discount.description}</p>

                            <div className='discount-details'>
                                <div className='detail-row'>
                                    <span className='detail-label'>Discount:</span>
                                    <span className='discount-badge'>{discount.discount_percentage}% OFF</span>
                                </div>

                                <div className='detail-row'>
                                    <span className='detail-label'>Applicable on:</span>
                                    <span className='detail-value'>{discount.applicable_items}</span>
                                </div>

                                <div className='detail-row'>
                                    <span className='detail-label'>Valid:</span>
                                    <span className='detail-value'>{discount.valid_from} to {discount.valid_till}</span>
                                </div>
                            </div>

                            <div className='code-section'>
                                <div className='code-box'>
                                    <code className='discount-code'>{discount.code}</code>
                                    <button
                                        className='copy-btn'
                                        onClick={() => copyToClipboard(discount.code)}
                                    >
                                        {copiedCode === discount.code ? '✓ Copied' : 'Copy Code'}
                                    </button>
                                </div>
                            </div>

                            <button className='claim-btn'>
                                Apply Discount Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='discount-terms'>
                <h3>Terms & Conditions</h3>
                <ul>
                    <li>Discounts cannot be combined unless specified</li>
                    <li>Each code can be used once per user/account</li>
                    <li>Discounts apply to food items only</li>
                    <li>Minimum order value may apply (as mentioned in offer)</li>
                    <li>Discounts are subject to availability</li>
                </ul>
            </div>
        </div>
    )
}

export default Discounts
