import React, { useState, useEffect } from 'react'
import '../Pages.css'

const ListItems = () => {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [editData, setEditData] = useState({})
    const [error, setError] = useState('')

    useEffect(() => {
        fetchFoods()
    }, [])

    const fetchFoods = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/food')
            const data = await response.json()
            if (data.success) {
                setFoods(data.data)
            }
        } catch (err) {
            setError('Failed to fetch foods')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return

        try {
            const response = await fetch(`http://localhost:5000/api/food/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            if (data.success) {
                setFoods(foods.filter(f => f._id !== id))
            }
        } catch (err) {
            setError('Failed to delete food')
            console.error(err)
        }
    }

    const handleEdit = (food) => {
        setEditingId(food._id)
        setEditData(food)
    }

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/food/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            })
            const data = await response.json()
            if (data.success) {
                setFoods(foods.map(f => f._id === id ? editData : f))
                setEditingId(null)
            }
        } catch (err) {
            setError('Failed to update food')
            console.error(err)
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setEditData({})
    }

    if (loading) return <div className='admin-page-loading'>Loading items...</div>

    return (
        <div className='admin-page'>
            <div className='page-header'>
                <h1>Food Items List</h1>
                <p>Total Items: {foods.length}</p>
            </div>

            {error && <div className='admin-error-msg'>{error}</div>}

            <div className='admin-table-container'>
                <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map(food => (
                            <tr key={food._id}>
                                <td className='image-cell'>
                                    <img src={food.image} alt={food.name} />
                                </td>
                                <td>
                                    {editingId === food._id ? (
                                        <input
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                            className='edit-input'
                                        />
                                    ) : (
                                        food.name
                                    )}
                                </td>
                                <td>
                                    {editingId === food._id ? (
                                        <input
                                            value={editData.category}
                                            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                            className='edit-input'
                                        />
                                    ) : (
                                        food.category
                                    )}
                                </td>
                                <td>
                                    {editingId === food._id ? (
                                        <select
                                            value={editData.size}
                                            onChange={(e) => setEditData({ ...editData, size: e.target.value })}
                                            className='edit-input'
                                        >
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </select>
                                    ) : (
                                        food.size || '-'
                                    )}
                                </td>
                                <td>
                                    {editingId === food._id ? (
                                        <input
                                            type='number'
                                            value={editData.price}
                                            onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
                                            className='edit-input'
                                        />
                                    ) : (
                                        `$${food.price}`
                                    )}
                                </td>
                                <td className='description-cell'>
                                    {editingId === food._id ? (
                                        <input
                                            value={editData.description}
                                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                            className='edit-input'
                                        />
                                    ) : (
                                        food.description.substring(0, 30) + '...'
                                    )}
                                </td>
                                <td className='actions-cell'>
                                    {editingId === food._id ? (
                                        <>
                                            <button className='save-btn' onClick={() => handleSave(food._id)}>
                                                Save
                                            </button>
                                            <button className='cancel-btn' onClick={handleCancel}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='edit-btn' onClick={() => handleEdit(food)}>
                                                Edit
                                            </button>
                                            <button className='delete-btn' onClick={() => handleDelete(food._id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListItems
