import React, { useState, useContext, useEffect } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { StoreContext } from '../../context/StoreContext'

const Home = () => {
    const [category, setCategory] = useState("All")
    const { food_list } = useContext(StoreContext)
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        // Get top 3 rated products
        const sorted = [...food_list]
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 3)
        setTopRated(sorted)
    }, [food_list])

    return (
        <div>
            <Header />

            {/* Featured Section */}
            <section className='featured-section'>
                <div className='featured-container'>
                    <h2 className='featured-title'>✨ Featured Today</h2>
                    <div className='featured-grid'>
                        {topRated.map(item => (
                            <Link key={item._id} to='#' className='featured-card'>
                                <div className='featured-image'>
                                    <img src={item.image} alt={item.name} />
                                    <div className='featured-badge'>⭐ {item.rating}</div>
                                </div>
                                <div className='featured-info'>
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
        </div>
    )
}

export default Home