import React from "react";
import { Modal, Button } from "react-bootstrap";

const CheckoutModal = ({ show, onClose, items, total }) => {
  return (
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
        <Button variant="success">
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
    