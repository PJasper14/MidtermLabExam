import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import SearchBar from "./components/SearchBar";
import LoginPage from "./components/LoginPage";
import EmployeePanel from "./components/EmployeePanel";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userRole: "", // Ensure userRole is defined
      products: [], // Ensure products is an empty array by default
      cart: [],
      searchTerm: "",
      activeView: "products",
    };
  }

  componentDidMount() {
    // Simulating API fetch
    setTimeout(() => {
      this.setState({
        products: [
          {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image:
              "https://www.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwd6661a5e/450BT_black_angle_01-1606x1606px.png",
          },
          {
            id: 2,
            name: "Smartphone",
            price: 699.99,
            image:
              "https://www.pngarts.com/files/16/iPhone-13-Free-PNG-Image.png",
          },
          {
            id: 3,
            name: "Laptop",
            price: 1299.99,
            image:
              "https://dlcdnwebimgs.asus.com/files/media/8B74E7EE-B66A-4420-894E-3C3B980312EE/v1/img/design/color/strix-g-2022-pink.png",
          },
          {
            id: 4,
            name: "Smartwatch",
            price: 249.99,
            image:
              "https://www.pngmart.com/files/13/Smartwatch-PNG-File.png",
          },
        ],
      });
    }, 1000);
  }

  handleLogin = (role) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    this.setState({ isAuthenticated: true, userRole: role });
  };

  handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    this.setState({ isAuthenticated: false, userRole: "" });
    window.location.href = "/login";
  };

  addToCart = (product) => {
    const existingCartItem = this.state.cart.find(
      (item) => item.id === product.id
    );

    if (existingCartItem) {
      this.setState({
        cart: this.state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      this.setState({
        cart: [...this.state.cart, { ...product, quantity: 1 }],
      });
    }
  };

  removeFromCart = (productId) => {
    const existingCartItem = this.state.cart.find((item) => item.id === productId);

    if (existingCartItem.quantity === 1) {
      this.setState({
        cart: this.state.cart.filter((item) => item.id !== productId),
      });
    } else {
      this.setState({
        cart: this.state.cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      });
    }
  };

  clearCart = () => {
    this.setState({ cart: [] });
  };

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
  };

  setActiveView = (view) => {
    this.setState({ activeView: view });
  };

  render() {
    if (!this.state.isAuthenticated) {
      return <LoginPage onLogin={this.handleLogin} />;
    }
    
    if (this.state.userRole === "admin") {
      return <EmployeePanel products={this.state.products} setProducts={(products) => this.setState({ products })} transactions={[]} />;
    }
    

    const { products, cart, searchTerm, activeView } = this.state;
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="app">
        <Dashboard
          cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
          setActiveView={this.setActiveView}
          activeView={activeView}
          onLogout={this.handleLogout}
        />
        <div className="main-content">
          {activeView === "products" && (
            <>
              <SearchBar onSearch={this.handleSearch} />
              <ProductList products={filteredProducts} addToCart={this.addToCart} />
            </>
          )}
          {activeView === "cart" && (
            <Cart items={cart} removeFromCart={this.removeFromCart} clearCart={this.clearCart} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
