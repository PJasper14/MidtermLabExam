import React from 'react';
import Product from './Product';

function ProductList({ products, addToCart }) {
  if (products.length === 0) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-list">
      <h2>Available Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <Product 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;