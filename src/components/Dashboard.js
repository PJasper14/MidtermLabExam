import React from 'react';

function Dashboard({ cartItemCount, setActiveView, activeView }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>ShopEasy</h1>
      </div>
      <div className="dashboard-menu">
        <button 
          className={`dashboard-item ${activeView === 'products' ? 'active' : ''}`}
          onClick={() => setActiveView('products')}
        >
          <span className="dashboard-icon">📦</span>
          <span>Products</span>
        </button>
        <button 
          className={`dashboard-item ${activeView === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveView('cart')}
        >
          <span className="dashboard-icon">🛒</span>
          <span>Cart</span>
          {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
        </button>
      </div>
      <div className="dashboard-footer">
        <p>© 3-ITB DreamTeam</p>
      </div>
    </div>
  );
}

export default Dashboard;