import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";
import axios from "axios";

const Register = ({ setToken }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Enter valid 10-digit phone number");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        phone,
        password,
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
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
        <h2 className="auth-title">Register to Todoist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="password-toggle-btn" onClick={() => setPasswordVisible(!passwordVisible)}>
                <i className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <div className="password-input-container">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="button" className="password-toggle-btn" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                <i className={confirmPasswordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>

          <p className="mt-3 text-center">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
