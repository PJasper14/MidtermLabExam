import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState(""); // Add name for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setError("");
        onLogin(data.user.is_admin ? "admin" : "user");
        navigate(data.user.is_admin ? "/admin" : "/app");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, // Include name in registration request
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsRegistering(false);
        setError("");
        alert("Registration successful! You can now log in.");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="login-container">
      <div className="row w-100 h-100">
        {/* Left Side - Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card p-4 shadow-lg login-card">
            <div className="text-center">
              {/* User Icon */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                alt="User Icon"
                className="mb-3 login-icon"
              />
              <h3 className="mb-3">{isRegistering ? "Create an Account" : "Welcome Back!"}</h3>
              <p className="text-muted">{isRegistering ? "Sign up to get started" : "Sign in to continue"}</p>
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
              {/* Show Name Field Only for Registration */}
              {isRegistering && (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control login-input"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control login-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {isRegistering && (
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control login-input"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 login-btn">
                {isRegistering ? "Register" : "Login"}
              </button>
            </form>

            <div className="text-center mt-3">
              <p className="text-muted">
                {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                <button className="btn btn-link p-0 toggle-btn" onClick={() => setIsRegistering(!isRegistering)}>
                  {isRegistering ? "Login" : "Register"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center text-center">
          <img src="shoplogo.png" alt="E-commerce" className="login-image" /> 
          <h2 className="shop-title mt-3">SHOPEASY</h2>
          <p className="shop-subtitle ">Shop with confidence</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
