import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Call backend API
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            // Store admin user
            localStorage.setItem('adminUser', JSON.stringify(data.data))
            navigate('/admin')
        } catch (err) {
            setError(err.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='admin-login-container'>
            <div className='admin-login-wrapper'>
                <div className='admin-login-content'>
                    <div className='admin-login-header'>
                        <h1>Admin Panel</h1>
                        <p>FoodDel Administration</p>
                    </div>

                    {error && <div className='admin-error-message'>{error}</div>}

                    <form className='admin-login-form' onSubmit={handleSubmit}>
                        <div className='admin-form-group'>
                            <label htmlFor='email'>Admin Email</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='admin@fooddel.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className='admin-form-group'>
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
                            className='admin-login-btn'
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login to Admin Panel'}
                        </button>
                    </form>

                    <div className='default-credentials'>
                        <p><strong>Demo Credentials:</strong></p>
                        <p>Email: admin@fooddel.com</p>
                        <p>Password: admin123</p>
                    </div>

                    <a href='/' className='back-home-link'>Back to Home</a>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
