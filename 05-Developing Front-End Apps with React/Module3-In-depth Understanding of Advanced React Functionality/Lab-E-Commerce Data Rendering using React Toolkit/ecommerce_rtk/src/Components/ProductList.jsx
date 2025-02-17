import React from 'react';
import './ProductList.css'; 
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addItemToCart } from './CartSlice';

const ProductList = () => {
  
  const dispatch = useDispatch();
  const [disabledProducts, setDisabledProducts] = useState([]);


  const products = [
    { id: 1, name: 'Product A', price: 60 },
    { id: 2, name: 'Product B', price: 75 },
    { id: 3, name: 'Product C', price: 30 },
  ];

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    setDisabledProducts([...disabledProducts, product.id]);
  };

  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
        {products.map(product=>(
          <li key={product.id} className='product-list-item'>
            <span>{product.name} - ${product.price}</span>
            <button
              className={`add-to-cart-btn ${disabledProducts.includes(product.id) ? 'disabled' : ''}`}
              onClick={() => handleAddToCart(product)}
              disabled={disabledProducts.includes(product.id)} // Disable button if product is in disabledProducts
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
