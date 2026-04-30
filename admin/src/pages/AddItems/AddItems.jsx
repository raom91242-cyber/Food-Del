import React, { useState } from 'react'
import '../Pages.css'
import { uploadAPI, foodAPI } from '../../services/api'
import CloudinaryUpload from '../../components/CloudinaryUpload/CloudinaryUpload'

const AddItems = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        size: 'Medium',
        category: 'Salad',
        description: '',
        image: '',
        cloudinary_public_id: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const categories = ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles']

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageUpload = (imageData) => {
        setFormData(prev => ({
            ...prev,
            image: imageData.url,
            cloudinary_public_id: imageData.publicId
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        setLoading(true)

        try {
            if (!formData.name || !formData.price || !formData.category) {
                throw new Error('Please fill in all required fields')
            }

            if (!formData.image) {
                throw new Error('Please upload an image')
            }

            const response = await foodAPI.create(formData)

            if (response.data.success) {
                setSuccess(true)
                setFormData({
                    name: '',
                    price: '',
                    size: 'Medium',
                    category: 'Salad',
                    description: '',
                    image: '',
                    cloudinary_public_id: ''
                })

                setTimeout(() => setSuccess(false), 3000)
            } else {
                throw new Error(response.data.message || 'Failed to add item')
            }
        } catch (err) {
            setError(err.message || 'Error adding item')
            console.error('Add item error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='admin-page'>
            <div className='page-header'>
                <h1>➕ Add New Item</h1>
                <p>Add a new food item to your menu with Cloudinary image upload</p>
            </div>

            {error && <div className='admin-error-msg'>❌ {error}</div>}
            {success && <div className='admin-success-msg'>✅ Item added successfully!</div>}

            <div className='admin-form-container'>
                <form onSubmit={handleSubmit} className='admin-form'>
                    <div className='form-section'>
                        <h3>Basic Information</h3>

                        <div className='form-row'>
                            <div className='form-group'>
                                <label>Food Name *</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder='e.g. Greek Salad'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Price (₹) *</label>
                                <input
                                    type='number'
                                    step='1'
                                    name='price'
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder='120'
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group'>
                                <label>Category *</label>
                                <select
                                    name='category'
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='form-group'>
                                <label>Size *</label>
                                <select
                                    name='size'
                                    value={formData.size}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='form-section'>
                        <h3>Description</h3>
                        <div className='form-group'>
                            <label>Description</label>
                            <textarea
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Write a brief description about this food item...'
                                rows='4'
                            ></textarea>
                        </div>
                    </div>

                    <div className='form-section'>
                        <h3>Upload Image (Cloudinary)</h3>
                        <CloudinaryUpload
                            onImageUpload={handleImageUpload}
                            existingImage={formData.image}
                        />
                    </div>

                    <button type='submit' className='submit-btn' disabled={loading}>
                        {loading ? '⏳ Adding Item...' : '✅ Add Item'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddItems
