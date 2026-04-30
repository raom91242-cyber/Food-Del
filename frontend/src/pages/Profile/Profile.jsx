import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { API_BASE_URL } from '../../services/api'
import './Profile.css'

const Profile = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(StoreContext)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '')
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        age: user?.age || ''
    })

    useEffect(() => {
        // Check if user is logged in
        if (!user) {
            navigate('/signin')
            return
        }
    }, [user, navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePhoto(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveProfile = async () => {
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const token = localStorage.getItem('token')

            const response = await fetch(`${API_BASE_URL}/auth/profile/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    age: formData.age ? parseInt(formData.age) : null
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Failed to update profile')
                setLoading(false)
                return
            }

            if (data.success) {
                // Update user in context and localStorage
                const updatedUser = {
                    ...user,
                    ...data.data,
                    token: user.token
                }
                localStorage.setItem('user', JSON.stringify(updatedUser))
                setUser(updatedUser)
                setSuccess('Profile updated successfully!')
                setIsEditing(false)

                setTimeout(() => setSuccess(''), 3000)
            }
        } catch (err) {
            console.error('Update error:', err)
            setError('Failed to update profile. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        // Remove user from localStorage and context
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        navigate('/')
    }

    if (!user) {
        return <div className='profile-loading'>Loading...</div>
    }

    return (
        <div className='profile-page'>
            <div className='profile-container'>
                {/* Profile Header */}
                <div className='profile-header'>
                    <h1>My Profile</h1>
                    <p>Manage your account information</p>
                </div>

                {error && <div className='success-message error-message'>{error}</div>}
                {success && <div className='success-message'>{success}</div>}

                <div className='profile-content'>
                    {/* Profile Card */}
                    <div className='profile-card'>
                        {/* Profile Photo Section */}
                        <div className='profile-photo-section'>
                            <div className='profile-photo-container'>
                                {profilePhoto ? (
                                    <img src={profilePhoto} alt='Profile' className='profile-photo' />
                                ) : (
                                    <div className='profile-photo-placeholder'>
                                        <span>{user.name?.charAt(0).toUpperCase()}</span>
                                    </div>
                                )}
                            </div>
                            {isEditing && (
                                <label className='photo-upload-label'>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={handlePhotoChange}
                                        style={{ display: 'none' }}
                                    />
                                    📷 Change Photo
                                </label>
                            )}
                        </div>

                        {/* Profile Info Section */}
                        <div className='profile-info-section'>
                            {isEditing ? (
                                // Edit Mode
                                <div className='edit-mode'>
                                    <div className='form-group'>
                                        <label>Full Name</label>
                                        <input
                                            type='text'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder='Your full name'
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Email Address</label>
                                        <input
                                            type='email'
                                            value={formData.email}
                                            disabled
                                            placeholder='Email'
                                            className='disabled-field'
                                        />
                                        <p className='field-note'>Email cannot be changed</p>
                                    </div>

                                    <div className='form-row'>
                                        <div className='form-group'>
                                            <label>Age</label>
                                            <input
                                                type='number'
                                                name='age'
                                                value={formData.age}
                                                onChange={handleInputChange}
                                                placeholder='Your age'
                                                min='1'
                                                max='120'
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label>Phone Number</label>
                                            <input
                                                type='tel'
                                                name='phone'
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder='Your phone number'
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>Address</label>
                                        <textarea
                                            name='address'
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder='Your address'
                                            rows='3'
                                        ></textarea>
                                    </div>

                                    <div className='edit-buttons'>
                                        <button
                                            className='save-btn'
                                            onClick={handleSaveProfile}
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : '✓ Save Changes'}
                                        </button>
                                        <button
                                            className='cancel-btn'
                                            onClick={() => {
                                                setIsEditing(false)
                                                setFormData({
                                                    name: user.name,
                                                    email: user.email,
                                                    phone: user.phone,
                                                    address: user.address,
                                                    age: user.age
                                                })
                                            }}
                                            disabled={loading}
                                        >
                                            ✕ Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <div className='view-mode'>
                                    <h2>{user.name}</h2>

                                    <div className='info-row'>
                                        <span className='info-label'>📧 Email:</span>
                                        <span className='info-value'>{user.email}</span>
                                    </div>

                                    <div className='info-row'>
                                        <span className='info-label'>📱 Phone:</span>
                                        <span className='info-value'>{user.phone || 'Not provided'}</span>
                                    </div>

                                    <div className='info-row'>
                                        <span className='info-label'>🎂 Age:</span>
                                        <span className='info-value'>{user.age || 'Not provided'}</span>
                                    </div>

                                    <div className='info-row'>
                                        <span className='info-label'>📍 Address:</span>
                                        <span className='info-value'>{user.address || 'Not provided'}</span>
                                    </div>

                                    <div className='info-row'>
                                        <span className='info-label'>👤 Role:</span>
                                        <span className='info-value' style={{ textTransform: 'capitalize' }}>
                                            {user.role || 'User'}
                                        </span>
                                    </div>

                                    <div className='profile-actions'>
                                        <button
                                            className='edit-btn'
                                            onClick={() => setIsEditing(true)}
                                        >
                                            ✏️ Edit Profile
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className='account-settings'>
                        <h3>Account Settings</h3>

                        <button className='logout-btn' onClick={handleLogout}>
                            🚪 Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
