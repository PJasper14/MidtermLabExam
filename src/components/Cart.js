import React, { Component } from "react";
import CartItem from "./CartItem";
import CheckoutModal from "./CheckoutModal"; // Import modal
import { FaTrash, FaArrowRight } from "react-icons/fa";

class Cart extends Component {
  state = { showModal: false }; // Manage modal state

  calculateTotal() {
    return this.props.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { items, removeFromCart, clearCart } = this.props;
    const total = this.calculateTotal();
    const { showModal } = this.state;

    if (items.length === 0) {
      return (
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to see them here.</p>
        </div>
      );
    }

    return (
      <div className="cart">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="clear-cart-btn" onClick={clearCart}>
            <FaTrash className="icon" /> Clear Cart
          </button>
        </div>

        <div className="cart-items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
          ))}
        </div>

        <div className="cart-footer">
          <h3 className="cart-total">
            Total: <span>₱{total.toFixed(2)}</span>
          </h3>
          <button className="checkout-btn" onClick={this.handleShowModal}>
            Proceed to Checkout <FaArrowRight className="icon" />
          </button>
        </div>

        {/* Checkout Modal */}
        <CheckoutModal 
          show={showModal} 
          onClose={this.handleCloseModal} 
          items={items} 
          total={total} 
        />
      </div>
    );
  }
}

export default Cart;
