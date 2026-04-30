import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { API_BASE_URL } from '../../services/api';
import './FoodAnalytics.css';

const FoodAnalytics = ({ setCurrentPage }) => {
    const [foods, setFoods] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff416c', '#667eea'];

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/food`);
                if (response.data.success) {
                    const fetchedFoods = response.data.data;
                    setFoods(fetchedFoods);
                    
                    // Group by category
                    const categories = {};
                    fetchedFoods.forEach(food => {
                        const cat = food.category || 'Uncategorized';
                        if (categories[cat]) {
                            categories[cat] += 1;
                        } else {
                            categories[cat] = 1;
                        }
                    });

                    const formattedData = Object.keys(categories).map(name => ({
                        name,
                        value: categories[name]
                    }));

                    setCategoryData(formattedData);
                }
            } catch (error) {
                console.error("Error fetching foods", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    return (
        <div className="admin-page fade-in">
            <div className="page-header">
                <div>
                    <button className="back-btn" onClick={() => setCurrentPage('dashboard')}>← Back</button>
                    <h1>Food Catalogue Analytics</h1>
                    <p>Visual mapping of total food distributions across categories.</p>
                </div>
            </div>

            {loading ? (
                <div className="admin-page-loading">
                    <p>Analyzing Catalogue...</p>
                </div>
            ) : (
                <div className="food-analytics-container">
                    <div className="analytics-layout">
                        <div className="chart-container glass-morphism">
                            <h3>Category Distribution</h3>
                            <div style={{ width: '100%', height: 350 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="stats-container">
                            <div className="stat-highlight glass-morphism">
                                <h3>Total Items</h3>
                                <p className="highlight-val">{foods.length}</p>
                            </div>
                            <div className="stat-highlight glass-morphism">
                                <h3>Total Categories</h3>
                                <p className="highlight-val">{categoryData.length}</p>
                            </div>
                            <div className="stat-highlight glass-morphism">
                                <h3>Average Price</h3>
                                <p className="highlight-val">
                                    ${foods.length > 0 ? (foods.reduce((acc, curr) => acc + curr.price, 0) / foods.length).toFixed(2) : '0.00'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodAnalytics;
