import React from 'react';

function Product({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p className="product-price">Php {product.price.toFixed(2)}</p>
      <button 
        className="add-to-cart-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;