import React, { useState } from "react";
import { Button, Table, Modal, Form, Card } from "react-bootstrap";
import { FaBoxOpen, FaShoppingCart, FaSignOutAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./EmployeePanel.css";

const EmployeePanel = ({ products, setProducts, transactions }) => {
  // State management
  const [activeTab, setActiveTab] = useState("products"); // Controls which tab is active
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    description: "", 
    price: "", 
    stock: "", 
    image: "",
    imageFile: null
  }); // For adding new products
  const [editingProduct, setEditingProduct] = useState(null); // Stores product being edited
  const [showEditModal, setShowEditModal] = useState(false); // Controls edit modal visibility
  const [errors, setErrors] = useState({}); // For validation errors

  // Handle product input change for adding new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    
    // Clear this field's error when a value is provided
    if (errors[name]) {
      const newErrors = {...errors};
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle editing input change
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  // Hangle image upload in edit mdoal
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      
      console.log('File selected:', file);
    }
  };
  

  // Add product - Used in Add Product tab
  const handleAddProduct = () => {
    // Validate fields
    const newErrors = {};
    if (!newProduct.name.trim()) newErrors.name = "Product name is required";
    if (!newProduct.description.trim()) newErrors.description = "Description is required";
    if (!newProduct.price || newProduct.price <= 0) newErrors.price = "Valid price is required";
    if (!newProduct.stock || newProduct.stock <= 0) newErrors.stock = "Valid stock quantity is required";
    if (!newProduct.imageFile) newErrors.imageFile = "Product image is required";
    
    // If there are errors, update state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear any previous errors
    setErrors({});
    
    // Proceed with adding the product
    setProducts([...products, { 
      ...newProduct, 
      id: products.length + 1,
      image: newProduct.image 
    }]);
    
    // Reset the form
    setNewProduct({ 
      name: "", 
      description: "", 
      price: "", 
      stock: "", 
      image: "",
      imageFile: null 
    });
  };

  // Open edit modal - Used in Manage Products tab
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  // Save edited product - Used in Manage Products tab (edit modal)
  const handleSaveEdit = () => {
    setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
    setShowEditModal(false);
  };

  // Delete product - Used in Manage Products tab
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Logout function
  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="employee-panel">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="text-brand">Admin Panel</h2>
        </div>
        <div className="sidebar-menu">
          {/* Navigation buttons for each tab */}
          <button
            className={`sidebar-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <FaBoxOpen className="sidebar-icon" /> Manage Products
          </button>
          <button
            className={`sidebar-item ${activeTab === "addProduct" ? "active" : ""}`}
            onClick={() => setActiveTab("addProduct")}
          >
            <FaPlus className="sidebar-icon" /> Add Product
          </button>
          <button
            className={`sidebar-item ${activeTab === "transactions" ? "active" : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            <FaShoppingCart className="sidebar-icon" /> View Transactions
          </button>
        </div>
        <div className="sidebar-footer">
          <Button variant="danger" className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" /> Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="content">
        {/* Manage Products Tab */}
        {activeTab === "products" && (
          <div className="products-section">
            <h3>Manage Products</h3>

            {/* Product Table */}
            <Table striped bordered hover className="shadow-sm mt-3">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price (₱)</th>
                  <th>Stock</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>₱{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <img src={product.image} alt={product.name} width="50" className="rounded" />
                    </td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditProduct(product)}>
                        <FaEdit />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === "addProduct" && (
          <div className="product-form">
            <Card className="form-card">
              <Card.Body>
                <h3>Add New Product</h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter product name"
                      isInvalid={errors.name}
                    />
                    {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter product description"
                      isInvalid={errors.description}
                    />
                    {errors.description && <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Price (₱)</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter product price"
                      isInvalid={errors.price}
                    />
                    {errors.price && <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>}
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter stock quantity"
                      isInvalid={errors.stock}
                    />
                    {errors.stock && <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>}
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="imageFile"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setNewProduct({...newProduct, image: imageUrl, imageFile: file});
                          // Clear this field's error when a value is provided
                          if (errors.imageFile) {
                            const { imageFile, ...restErrors } = errors;
                            setErrors(restErrors);
                          }
                        }
                      }}
                      required
                      accept="image/*"
                      isInvalid={errors.imageFile}
                    />
                    {errors.imageFile && <Form.Control.Feedback type="invalid">{errors.imageFile}</Form.Control.Feedback>}
                    {newProduct.image && (
                      <div className="mt-2">
                        <p>Preview:</p>
                        <img 
                          src={newProduct.image} 
                          alt="Product preview" 
                          className="img-thumbnail" 
                          style={{maxHeight: "150px"}} 
                        />
                      </div>
                    )}
                  </Form.Group>
                  
                  <Button variant="success" onClick={handleAddProduct} className="mt-2">
                    Add Product
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* View Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="transactions-section">
            <h3>Checkout Transactions</h3>
            <Table striped bordered hover className="shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Transaction ID</th>
                  <th>Customer</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.customer}</td>
                      <td>₱{transaction.total}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">No transactions yet.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
        
      </div>

      {/* Edit Product Modal (Used with Manage Products tab) */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editingProduct?.name || ""}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editingProduct?.description || ""}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₱)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editingProduct?.price || ""}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={editingProduct?.stock || ""}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image Upload</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageUpload}
                required
              />
            </Form.Group>
            <Button variant="success" onClick={handleSaveEdit}>Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default EmployeePanel;