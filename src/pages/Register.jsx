import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // ✅ Same CSS file used for common styles
import { toast } from "react-toastify";
import axios from "axios";

const Register = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [passwordVisible, setPasswordVisible] = useState(false); // For toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // For toggle confirm password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password && name && confirmPassword) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      try {
        // Sending data to backend API for registration
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
        });

        // On success, show success message and navigate to login page
        toast.success("Registration successful! Please login now.");
        navigate("/login");
      } catch (err) {
        // Handle errors from backend, like duplicate email etc.
        toast.error(
          err.response?.data?.message || "Registration failed. Try again."
        );
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle visibility state for password
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible); // Toggle visibility state for confirm password
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
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"} // Toggle between text and password
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

          <div className="mb-3">
            <label>Confirm Password</label>
            <div className="password-input-container">
              <input
                type={confirmPasswordVisible ? "text" : "password"} // Toggle between text and password
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleConfirmPasswordVisibility}
              >
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
