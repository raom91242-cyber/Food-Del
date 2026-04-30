import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { API_BASE_URL } from '../../services/api'
import './SignUp.css'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        age: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(StoreContext)
    const API_URL = `${API_BASE_URL}/auth`

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const { name, email, password, confirmPassword, phone, address, age } = formData

            if (!name || !email || !password || !confirmPassword || !phone || !address) {
                setError('Please fill in all required fields')
                setLoading(false)
                return
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match')
                setLoading(false)
                return
            }

            if (password.length < 6) {
                setError('Password must be at least 6 characters')
                setLoading(false)
                return
            }

            // Call backend API
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone,
                    address,
                    age: age ? parseInt(age) : null
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Sign up failed')
                setLoading(false)
                return
            }

            if (data.success && data.data.token) {
                // Store user and token in localStorage
                const user = {
                    _id: data.data._id,
                    name: data.data.name,
                    email: data.data.email,
                    phone: data.data.phone,
                    address: data.data.address,
                    age: data.data.age,
                    token: data.data.token
                }
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', data.data.token)
                setUser(user)

                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    address: '',
                    age: ''
                })

                navigate('/profile')
            } else {
                setError('Registration failed. Please try again.')
            }
        } catch (err) {
            console.error('Sign up error:', err)
            setError('Sign up failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='signup-container'>
            <div className='signup-wrapper'>
                <div className='signup-content'>
                    <h1 className='signup-title'>Create Account</h1>
                    <p className='signup-subtitle'>Join FoodDel and start ordering</p>

                    {error && <div className='error-message'>{error}</div>}

                    <form className='signup-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>Full Name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder='John Doe'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='your@email.com'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='phone'>Phone Number</label>
                            <input
                                type='tel'
                                id='phone'
                                name='phone'
                                placeholder='+1 234 567 8900'
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='address'>Address</label>
                            <input
                                type='text'
                                id='address'
                                name='address'
                                placeholder='123 Street, City, State'
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='age'>Age (Optional)</label>
                            <input
                                type='number'
                                id='age'
                                name='age'
                                placeholder='Your age'
                                value={formData.age}
                                onChange={handleChange}
                                min='1'
                                max='120'
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='••••••••'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                placeholder='••••••••'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            className='signup-btn'
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className='signup-footer'>
                        Already have an account?{' '}
                        <Link to='/signin' className='signin-link'>
                            Sign In here
                        </Link>
                    </p>

                    <Link to='/' className='back-home-link'>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
