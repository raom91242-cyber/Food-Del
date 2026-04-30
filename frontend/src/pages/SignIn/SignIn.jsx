import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import './SignIn.css'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(StoreContext)
    const API_URL = 'http://localhost:5000/api/auth'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!email || !password) {
                setError('Please fill in all fields')
                setLoading(false)
                return
            }

            // Call backend API
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Login failed')
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
                    role: data.data.role,
                    token: data.data.token
                }
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', data.data.token)
                setUser(user)

                setEmail('')
                setPassword('')
                navigate('/profile')
            } else {
                setError('Login failed. Please try again.')
            }
        } catch (err) {
            console.error('Login error:', err)
            setError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='signin-container'>
            <div className='signin-wrapper'>
                <div className='signin-content'>
                    <h1 className='signin-title'>Sign In</h1>
                    <p className='signin-subtitle'>Welcome back to FoodDel</p>

                    {error && <div className='error-message'>{error}</div>}

                    <form className='signin-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='your@email.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                placeholder='••••••••'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            className='signin-btn'
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className='signin-footer'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='signup-link'>
                            Sign Up here
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

export default SignIn
