import React from 'react';
import { Button } from 'react-bootstrap';
import { FaBoxOpen, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

function Dashboard({ cartItemCount, setActiveView, activeView, onLogout }) {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="text-brand">ShopEasy</h1>
      </div>

      {/* Sidebar Menu */}
      <div className="dashboard-menu">
        <button 
          className={`dashboard-item ${activeView === 'products' ? 'active' : ''}`}
          onClick={() => setActiveView('products')}
        >
          <FaBoxOpen className="dashboard-icon" /> Products
        </button>

        <button 
          className={`dashboard-item ${activeView === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveView('cart')}
        >
          <FaShoppingCart className="dashboard-icon" /> Cart
          {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
        </button>
      </div>

      {/* Logout Button */}
      <div className="dashboard-footer">
        <Button variant="danger" className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
