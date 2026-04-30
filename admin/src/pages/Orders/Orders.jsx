import React, { useState, useEffect } from 'react'
import '../Pages.css'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [error, setError] = useState('')

    const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders')
            const data = await response.json()
            if (data.success) {
                setOrders(data.data)
            }
        } catch (err) {
            setError('Failed to fetch orders')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            const data = await response.json()
            if (data.success) {
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ))
            }
        } catch (err) {
            setError('Failed to update order status')
            console.error(err)
        }
    }

    const filteredOrders = selectedStatus === 'all'
        ? orders
        : orders.filter(order => order.status === selectedStatus)

    if (loading) return <div className='admin-page-loading'>Loading orders...</div>

    return (
        <div className='admin-page'>
            <div className='page-header'>
                <h1>Orders Management</h1>
                <p>Total Orders: {filteredOrders.length}</p>
            </div>

            {error && <div className='admin-error-msg'>{error}</div>}

            <div className='filter-section'>
                <label>Filter by Status:</label>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value='all'>All Orders</option>
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <div className='admin-table-container'>
                <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id}>
                                <td className='order-id'>{order._id.substring(0, 10)}...</td>
                                <td>{`${order.firstName} ${order.lastName}`}</td>
                                <td className='email-cell'>{order.email}</td>
                                <td className='price'>${order.totalAmount.toFixed(2)}</td>
                                <td className='items-count'>{order.items.length}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className='status-select'
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className='date-cell'>
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </td>
                                <td className='date-cell'>
                                    {new Date(order.deliveryDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredOrders.length === 0 && (
                    <div className='no-data'>
                        <p>No orders found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders
