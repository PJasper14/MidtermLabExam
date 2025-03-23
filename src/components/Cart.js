import React, { Component } from 'react';
import CartItem from './CartItem';

class Cart extends Component {
  calculateTotal() {
    return this.props.items.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  }

  render() {
    const { items, removeFromCart, clearCart } = this.props;
    const total = this.calculateTotal();

    if (items.length === 0) {
      return (
        <div className="cart-empty">
          <h2>Your Cart</h2>
          <p>Your cart is empty.</p>
        </div>
      );
    }

    return (
      <div className="cart">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
        <div className="cart-items">
          {items.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              removeFromCart={removeFromCart} 
            />
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }
}

export default Cart;