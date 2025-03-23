import React from 'react';

function CartItem({ item, removeFromCart }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>${item.price.toFixed(2)} x {item.quantity}</p>
        <p className="cart-item-subtotal">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <button 
        className="remove-item-btn"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
