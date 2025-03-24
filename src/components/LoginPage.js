import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([
    { email: "admin", password: "admin123" },
    { email: "user", password: "user123" }
  ]);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email);

    if (user && user.password === password) {
      setError("");
      onLogin(email === "admin" ? "admin" : "user");
      navigate(email === "admin" ? "/admin" : "/app"); // Redirect based on role
    } else {
      setError("Invalid credentials! Please try again.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setUsers([...users, { email, password }]);
    setIsRegistering(false);
    setError("");
    alert("Registration successful! You can now log in.");
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
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control login-input"
                  placeholder="Username"
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
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src="shop.png" alt="E-commerce" className="login-image" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
