import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './ProductCard.css';

const ProductCard = ({ product, onDelete = null, onEdit = null, isAdmin = false }) => {
    const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);

    const itemCount = cartItems[product._id] || 0;

    const handleAddClick = (e) => {
        e.preventDefault();
        addToCart(product._id);
    };

    const handleRemoveClick = (e) => {
        e.preventDefault();
        removeFromCart(product._id);
    };

    return (
        <div className='product-card'>
            <div className='card-image-container'>
                <img
                    src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                    alt={product.name}
                    className='card-image'
                />
                <div className='card-overlay'>
                    {!isAdmin && (
                        <div className='card-actions'>
                            {itemCount > 0 && (
                                <div className='quantity-control'>
                                    <button
                                        className='qty-btn'
                                        onClick={handleRemoveClick}
                                        title='Remove'
                                    >
                                        −
                                    </button>
                                    <span className='qty-display'>{itemCount}</span>
                                    <button
                                        className='qty-btn'
                                        onClick={handleAddClick}
                                        title='Add'
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                            {itemCount === 0 && (
                                <button
                                    className='add-btn'
                                    onClick={handleAddClick}
                                >
                                    🛒 Add
                                </button>
                            )}
                        </div>
                    )}

                    {isAdmin && onEdit && onDelete && (
                        <div className='admin-actions'>
                            <button
                                className='admin-btn edit-btn'
                                onClick={onEdit}
                                title='Edit'
                            >
                                ✎ Edit
                            </button>
                            <button
                                className='admin-btn delete-btn'
                                onClick={onDelete}
                                title='Delete'
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    )}
                </div>

                {product.rating && (
                    <div className='card-rating'>
                        ⭐ {product.rating.toFixed(1)}
                    </div>
                )}
            </div>

            <div className='card-content'>
                <h3 className='card-name'>{product.name}</h3>

                <p className='card-description'>
                    {product.description?.slice(0, 60)}...
                </p>

                {product.reviews && (
                    <p className='card-reviews'>
                        {product.reviews} reviews
                    </p>
                )}

                <div className='card-footer'>
                    <span className='card-price'>₹{product.price}</span>
                    {product.size && (
                        <span className='card-size'>{product.size}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
