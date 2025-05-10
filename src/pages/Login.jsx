import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";
import axios from "axios";

const Login = ({ setToken }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Enter valid 10-digit phone number");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        phone,
        password,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKLhpF90FNSYq7H8onLEJB40mzNDtg3xx-Cx3TlntFHc4LkNZYgcaq9gYlumepxHmUCdc&usqp=CAU"
          alt="Todoist Logo"
          className="logo"
        />
        <h2 className="logo-text">Todoist</h2>
      </div>
      <div className="auth-card">
        <h2 className="auth-title">Login to Todoist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter 10-digit phone number"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d*$/.test(input)) setPhone(input);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
              >
                <i className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "blue" }}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
    
  );
};

export default Login;
