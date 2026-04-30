import React, { useState } from 'react'
import './MobileApp.css'
import { assets } from '../../assets/assets'

const MobileApp = () => {
    const [activeFeature, setActiveFeature] = useState(0)

    const mobileAppFeatures = [
        {
            id: 1,
            title: "Easy Ordering",
            description: "Order your favorite food in just a few taps. Browse our extensive menu and customize your meals according to your preferences.",
            icon: "🛒"
        },
        {
            id: 2,
            title: "Real-time Tracking",
            description: "Track your order in real-time from the restaurant kitchen to your doorstep. Know exactly when your food will arrive.",
            icon: "📍"
        },
        {
            id: 3,
            title: "Exclusive Deals",
            description: "Get access to exclusive mobile-only deals and discounts. Save more with our loyalty rewards program.",
            icon: "🎁"
        },
        {
            id: 4,
            title: "Saved Favorites",
            description: "Save your favorite orders and reorder them with one click. Manage your favorite restaurants easily.",
            icon: "❤️"
        },
        {
            id: 5,
            title: "Secure Payments",
            description: "Multiple payment options with secure encryption. Pay using credit card, debit card, or digital wallets.",
            icon: "💳"
        },
        {
            id: 6,
            title: "24/7 Support",
            description: "Dedicated customer support team available 24/7. Get instant help for any issues or concerns.",
            icon: "📞"
        }
    ]

    const mobileFeatures = [
        {
            label: "Order Tracking",
            subLabel: "Real-time GPS tracking",
            implementation: "Uses GPS and WebSocket for live updates"
        },
        {
            label: "Push Notifications",
            subLabel: "Order status updates",
            implementation: "Integrated notification system for order changes"
        },
        {
            label: "Offline Mode",
            subLabel: "Browse menu offline",
            implementation: "Caches menu data locally on device"
        },
        {
            label: "Biometric Login",
            subLabel: "Fingerprint/Face ID",
            implementation: "Secure authentication with device biometrics"
        },
        {
            label: "Quick Reorder",
            subLabel: "One-click ordering",
            implementation: "API call to fetch last order and place new one"
        },
        {
            label: "Rating & Reviews",
            subLabel: "Share your experience",
            implementation: "Submit ratings and photos directly from app"
        }
    ]

    return (
        <div className='mobile-app-page'>
            {/* Header Section */}
            <div className='mobile-app-header'>
                <div className='header-content'>
                    <h1>Download FoodDel App</h1>
                    <p>Get delicious food with just a few taps!</p>
                </div>
                <div className='header-images'>
                    <div className='store-buttons'>
                        <button className='store-btn'>
                            <img src={assets.play_store} alt="Play Store" />
                        </button>
                        <button className='store-btn'>
                            <img src={assets.app_store} alt="App Store" />
                        </button>
                    </div>
                </div>
            </div>

            {/* App Features Section */}
            <section className='features-section'>
                <div className='container'>
                    <h2 className='section-title'>Why Download Our App?</h2>
                    <p className='section-subtitle'>Experience the best food delivery service with our mobile app</p>

                    <div className='features-grid'>
                        {mobileAppFeatures.map((feature) => (
                            <div
                                key={feature.id}
                                className='feature-card'
                                onClick={() => setActiveFeature(feature.id - 1)}
                            >
                                <div className='feature-icon'>{feature.icon}</div>
                                <h3 className='feature-title'>{feature.title}</h3>
                                <p className='feature-description'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Features Section */}
            <section className='technical-features-section'>
                <div className='container'>
                    <h2 className='section-title'>App Capabilities</h2>
                    <p className='section-subtitle'>Advanced features to enhance your food delivery experience</p>

                    <div className='technical-features-grid'>
                        {mobileFeatures.map((feature, index) => (
                            <div key={index} className='tech-feature-card'>
                                <div className='tech-feature-header'>
                                    <h3>{feature.label}</h3>
                                    <p className='sub-label'>{feature.subLabel}</p>
                                </div>
                                <div className='tech-feature-body'>
                                    <p className='implementation'>{feature.implementation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className='how-it-works-section'>
                <div className='container'>
                    <h2 className='section-title'>How It Works</h2>

                    <div className='steps-container'>
                        <div className='step'>
                            <div className='step-number'>1</div>
                            <h3>Download & Install</h3>
                            <p>Download the FoodDel app from Play Store or App Store and create your account.</p>
                        </div>
                        <div className='step'>
                            <div className='step-number'>2</div>
                            <h3>Browse & Select</h3>
                            <p>Browse through our extensive menu and select your favorite food items.</p>
                        </div>
                        <div className='step'>
                            <div className='step-number'>3</div>
                            <h3>Place Order</h3>
                            <p>Add items to cart, review order details, and proceed to checkout securely.</p>
                        </div>
                        <div className='step'>
                            <div className='step-number'>4</div>
                            <h3>Track & Receive</h3>
                            <p>Get real-time notifications and track your delivery until it reaches your door.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='testimonials-section'>
                <div className='container'>
                    <h2 className='section-title'>What Users Say</h2>

                    <div className='testimonials-grid'>
                        <div className='testimonial-card'>
                            <div className='rating'>⭐⭐⭐⭐⭐</div>
                            <p className='testimonial-text'>"The app is super fast and easy to use. Food delivery is quick and items are always in perfect condition!"</p>
                            <p className='testimonial-author'>- Sarah M.</p>
                        </div>
                        <div className='testimonial-card'>
                            <div className='rating'>⭐⭐⭐⭐⭐</div>
                            <p className='testimonial-text'>"Love the real-time tracking feature. I can see exactly where my delivery is and when it will arrive."</p>
                            <p className='testimonial-author'>- John D.</p>
                        </div>
                        <div className='testimonial-card'>
                            <div className='rating'>⭐⭐⭐⭐⭐</div>
                            <p className='testimonial-text'>"Great deals on the mobile app! The exclusive discounts make food ordering very affordable."</p>
                            <p className='testimonial-author'>- Emma L.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='cta-section'>
                <div className='container'>
                    <h2>Ready to Download?</h2>
                    <p>Join thousands of satisfied customers enjoying FoodDel today!</p>
                    <div className='cta-buttons'>
                        <button className='cta-btn primary'>
                            <img src={assets.play_store} alt="Play Store" />
                            <span>Google Play</span>
                        </button>
                        <button className='cta-btn'>
                            <img src={assets.app_store} alt="App Store" />
                            <span>App Store</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MobileApp
