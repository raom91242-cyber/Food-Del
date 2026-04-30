import React, { useState } from 'react'
import './ContactUs.css'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const [submitStatus, setSubmitStatus] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus('error')
            alert('Please fill in all required fields')
            return
        }

        setIsSubmitting(true)

        try {
            const submitData = {
                ...formData,
                access_key: "ee772195-512a-4811-861a-22bbd8178c8a"
            };

            const url = 'https://api.web3forms.com/submit';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                })

                // Reset status after 3 seconds
                setTimeout(() => {
                    setSubmitStatus(null)
                }, 3000)
            } else {
                console.error("Web3Forms error:", result);
                setSubmitStatus('error')
            }
        } catch (error) {
            console.error('Contact submission error:', error);
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='contact-us-page'>
            {/* Header Section */}
            <div className='contact-header'>
                <h1>Get In Touch</h1>
                <p>We'd love to hear from you. Send us a message!</p>
            </div>

            <div className='contact-container'>
                {/* Contact Info Section */}
                <div className='contact-info-section'>
                    <div className='contact-info-box'>
                        <h2>Contact Information</h2>
                        <p className='info-description'>
                            Have a question or feedback? We're here to help. Reach out to us through any of the following methods.
                        </p>

                        <div className='info-item'>
                            <div className='info-icon'>📞</div>
                            <div className='info-content'>
                                <h3>Phone</h3>
                                <p>+1 (555) 123-4567</p>
                                <p className='info-detail'>Monday - Friday, 9 AM - 6 PM EST</p>
                            </div>
                        </div>

                        <div className='info-item'>
                            <div className='info-icon'>✉️</div>
                            <div className='info-content'>
                                <h3>Email</h3>
                                <p>support@fooddel.com</p>
                                <p className='info-detail'>We'll respond within 24 hours</p>
                            </div>
                        </div>

                        <div className='info-item'>
                            <div className='info-icon'>📍</div>
                            <div className='info-content'>
                                <h3>Address</h3>
                                <p>123 Food Street</p>
                                <p>New York, NY 10001</p>
                                <p className='info-detail'>Open 24/7 for orders</p>
                            </div>
                        </div>

                        <div className='info-item'>
                            <div className='info-icon'>💬</div>
                            <div className='info-content'>
                                <h3>Live Chat</h3>
                                <p>Available in the mobile app</p>
                                <p className='info-detail'>Instant support from our team</p>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className='social-links'>
                            <h3>Follow Us</h3>
                            <div className='social-icons'>
                                <a href='#' className='social-icon' title='Facebook'>f</a>
                                <a href='#' className='social-icon' title='Twitter'>𝕏</a>
                                <a href='#' className='social-icon' title='LinkedIn'>in</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className='contact-form-section'>
                    <div className='form-box'>
                        <h2>Send us a Message</h2>
                        <form onSubmit={handleSubmit} className='contact-form'>
                            <div className='form-group'>
                                <label htmlFor='name'>Name *</label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    placeholder='Your full name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>Email *</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='your@email.com'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='phone'>Phone</label>
                                <input
                                    type='tel'
                                    id='phone'
                                    name='phone'
                                    placeholder='(555) 123-4567'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='subject'>Subject</label>
                                <input
                                    type='text'
                                    id='subject'
                                    name='subject'
                                    placeholder='How can we help?'
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='message'>Message *</label>
                                <textarea
                                    id='message'
                                    name='message'
                                    placeholder='Your message...'
                                    rows='6'
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>

                            {submitStatus === 'success' && (
                                <div className='status-message success'>
                                    ✓ Thank you! Your message has been sent successfully. We'll get back to you soon!
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className='status-message error'>
                                    ✕ Oops! Something went wrong. Please try again.
                                </div>
                            )}

                            <button
                                type='submit'
                                className='submit-btn'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <section className='faq-section'>
                <div className='faq-container'>
                    <h2>Frequently Asked Questions</h2>
                    <p className='faq-subtitle'>Find answers to common questions</p>

                    <div className='faq-grid'>
                        <div className='faq-item'>
                            <h3>How do I place an order?</h3>
                            <p>You can place an order through our website or mobile app. Browse the menu, select items, add them to cart, and proceed to checkout.</p>
                        </div>

                        <div className='faq-item'>
                            <h3>What is your delivery time?</h3>
                            <p>Typical delivery time is 30-45 minutes depending on your location and order volume. You can track your order in real-time.</p>
                        </div>

                        <div className='faq-item'>
                            <h3>Do you accept all payment methods?</h3>
                            <p>Yes! We accept credit cards, debit cards, digital wallets (Apple Pay, Google Pay), and cash on delivery in select areas.</p>
                        </div>

                        <div className='faq-item'>
                            <h3>Can I modify my order after placing it?</h3>
                            <p>You can modify your order within a few minutes of placing it. After that, please contact our support team immediately.</p>
                        </div>

                        <div className='faq-item'>
                            <h3>What if my food arrives cold?</h3>
                            <p>We strive for quality, but if there's an issue, contact us immediately with photos. We'll make it right with a refund or replacement.</p>
                        </div>

                        <div className='faq-item'>
                            <h3>Is there a minimum order requirement?</h3>
                            <p>The minimum order is ₹100 plus delivery fees. Some restaurants may have higher minimums. Check the restaurant details for specifics.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactUs
