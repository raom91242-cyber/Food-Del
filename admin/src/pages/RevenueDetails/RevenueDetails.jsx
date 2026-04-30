import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './RevenueDetails.css';

const RevenueDetails = ({ setCurrentPage }) => {
    const [orders, setOrders] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                if (response.data.success) {
                    const fetchedOrders = response.data.data;
                    setOrders(fetchedOrders);
                    
                    // Aggregate revenue by food name
                    const foodRevenue = {};
                    fetchedOrders.forEach(order => {
                        if (order.items && Array.isArray(order.items)) {
                            order.items.forEach(item => {
                                if (foodRevenue[item.name]) {
                                    foodRevenue[item.name] += (item.price * item.quantity);
                                } else {
                                    foodRevenue[item.name] = (item.price * item.quantity);
                                }
                            });
                        }
                    });

                    // Format for recharts
                    const formattedData = Object.keys(foodRevenue).map(name => ({
                        name,
                        revenue: foodRevenue[name]
                    })).sort((a, b) => b.revenue - a.revenue);

                    setRevenueData(formattedData);
                }
            } catch (error) {
                console.error("Error fetching orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const colors = ['#ff416c', '#ff4b2b', '#667eea', '#764ba2', '#ff9966', '#00c6ff', '#0072ff'];

    return (
        <div className="admin-page fade-in">
            <div className="page-header">
                <div>
                    <button className="back-btn" onClick={() => setCurrentPage('dashboard')}>← Back</button>
                    <h1>Revenue Insights</h1>
                    <p>Deep dive into which items generate the most revenue.</p>
                </div>
            </div>

            {loading ? (
                <div className="admin-page-loading">
                    <p>Loading Deep Analytics...</p>
                </div>
            ) : (
                <div className="revenue-details-container">
                    <div className="chart-wrapper glass-morphism">
                        <h3>Item Revenue Leaderboard</h3>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={revenueData.slice(0, 10)}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                >
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="#ccc" />
                                    <YAxis stroke="#ccc" />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                    <Bar dataKey="revenue" name="Revenue ($)">
                                        {revenueData.slice(0, 10).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="admin-table-container glass-morphism mt-4">
                        <h3>All Historical Orders</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items Ordered</th>
                                    <th>Total Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td className="order-id">{order._id.slice(-6).toUpperCase()}</td>
                                        <td>{order.firstName} {order.lastName}</td>
                                        <td className="description-cell">
                                            {order.items.map(i => i.name).join(', ')}
                                        </td>
                                        <td className="price">${order.totalAmount}</td>
                                        <td className="date-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RevenueDetails;
