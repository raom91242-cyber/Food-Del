import React, { useState } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    // Scroll to top when clicking links
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className='footer'>
            {/* Top Wave Decoration */}
            <div className='wave-decoration'></div>

            <div className='footer-container'>
                {/* Brand Section */}
                <div className='footer-section footer-brand'>
                    <Link to='/' className='footer-logo-link' onClick={scrollToTop}>
                        <h2 className='footer-logo'>🍔 FoodDel</h2>
                    </Link>
                    <p className='footer-tagline'>Delicious food delivered to your doorstep, fresh and fast!</p>
                    <div className='footer-social'>
                        <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='social-link facebook' title='Facebook'>
                            📘
                        </a>
                        <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='social-link twitter' title='Twitter'>
                            𝕏
                        </a>
                        <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='social-link instagram' title='Instagram'>
                            📷
                        </a>
                        <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='social-link linkedin' title='LinkedIn'>
                            💼
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className='footer-section footer-links'>
                    <h3>✨ Quick Links</h3>
                    <ul>
                        <li><Link to='/' onClick={scrollToTop}>🏠 Home</Link></li>
                        <li><Link to='/menu' onClick={scrollToTop}>🍽️ Shop/Menu</Link></li>
                        <li><Link to='/discounts' onClick={scrollToTop}>🎉 Discounts</Link></li>
                        <li><Link to='/combos' onClick={scrollToTop}>📦 Combos</Link></li>
                        <li><Link to='/mobile-app' onClick={scrollToTop}>📱 Mobile App</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div className='footer-section footer-company'>
                    <h3>🏢 Company</h3>
                    <ul>
                        <li><Link to='/' onClick={scrollToTop}>About Us</Link></li>
                        <li><a href='#careers'>Careers</a></li>
                        <li><a href='#press'>Press</a></li>
                        <li><a href='#blog'>Blog</a></li>
                        <li><a href='#partners'>Partners</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div className='footer-section footer-support'>
                    <h3>💬 Support</h3>
                    <ul>
                        <li><a href='#faq'>FAQ</a></li>
                        <li><a href='#guide'>Delivery Guide</a></li>
                        <li><Link to='/contact-us' onClick={scrollToTop}>📧 Contact Us</Link></li>
                        <li><a href='#terms'>Terms & Conditions</a></li>
                        <li><a href='#privacy'>Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className='footer-section footer-contact'>
                    <h3>📞 Get In Touch</h3>
                    <div className='contact-item'>
                        <span className='contact-icon'>📍</span>
                        <p>123 City Plaza New Delhi 110021</p>
                    </div>
                    <div className='contact-item'>
                        <span className='contact-icon'>📞</span>
                        <p><a href='tel: +919990021564'>+91 (999) 002 -1564 </a></p>
                    </div>
                    <div className='contact-item'>
                        <span className='contact-icon'>📧</span>
                        <p><a href='mailto:support@fooddel.com'>support@fooddel.com</a></p>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className='footer-newsletter'>
                <div className='newsletter-content'>
                    <h3>📬 Subscribe to Our Newsletter</h3>
                    <p>Get exclusive offers and updates delivered to your inbox!</p>
                    <div className='newsletter-form'>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button onClick={handleSubscribe}>Subscribe</button>
                    </div>
                    {subscribed && <div className='newsletter-success'>✅ Thanks for subscribing!</div>}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='footer-bottom'>
                <div className='footer-bottom-content'>
                    <p>&copy; {currentYear} FoodDel. All rights reserved.</p>
                    <div className='footer-badges'>
                        <span>🔒 Secure</span>
                        <span>🚚 Fast</span>
                        <span>⭐ Quality</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
