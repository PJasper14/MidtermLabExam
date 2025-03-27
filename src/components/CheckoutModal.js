import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CheckoutModal = ({ show, onClose, items, total, clearCart }) => {
  const [successModal, setSuccessModal] = useState(false);

  const handleConfirmOrder = () => {
    // Close checkout modal
    onClose();

    // Clear cart items
    clearCart();

    // Show success modal
    setSuccessModal(true);

    // Auto-close success modal after 3 seconds
    setTimeout(() => {
      setSuccessModal(false);
    }, 3000);
  };

  return (
    <>
      {/* Checkout Modal */}
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Items in Your Order:</h5>
          <ul className="list-group">
            {items.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} <span>x{item.quantity}</span>
                <strong>₱{(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
          <h4 className="mt-3">Total: ₱{total.toFixed(2)}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={successModal} onHide={() => setSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          ✅ Your order has been confirmed. Thank you for shopping with us!
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CheckoutModal;
