import React from "react";
import { FaTrash } from "react-icons/fa";

function CartItem({ item, removeFromCart }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="cart-item-price">
          ₱{item.price.toFixed(2)} × {item.quantity}
        </p>
        <p className="cart-item-subtotal">
          <strong>Subtotal: ₱{ (item.price * item.quantity).toFixed(2) }</strong>
        </p>
      </div>
      <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
        <FaTrash className="remove-icon" /> Remove
      </button>
    </div>
  );
}

export default CartItem;
