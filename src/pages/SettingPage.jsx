// SettingsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: localStorage.getItem("username") || "",
    email: localStorage.getItem("useremail") || "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/users/update",
        {
          name: user.name,
          email: user.email,
          newPassword: user.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("username", user.name);
      localStorage.setItem("useremail", user.email);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/api/users/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      navigate("/register");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="settings-page container py-4">
      <h2 className="mb-4">Settings</h2>

      {/* Profile Info */}
      <div className="settings-section mb-5">
        <h5 className="section-title">Profile</h5>
        <div className="form-group mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            placeholder="username"
          />
        </div>
        <div className="form-group mb-3">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            placeholder="kapil@example.com"
          />
        </div>
        <button onClick={handleProfileUpdate} className="btn btn-outline-primary">
          Save Profile
        </button>
      </div>

      {/* Password Change */}
      <div className="settings-section mb-5">
        <h5 className="section-title">Password</h5>
        <div className="form-group mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button onClick={handleProfileUpdate} className="btn btn-outline-warning">
          Change Password
        </button>
      </div>

      {/* Danger Zone */}
      <div className="settings-section danger-zone mt-5">
        <h5 className="section-title text-danger">Danger Zone</h5>
        <p className="text-muted small">
          Permanently delete your account and all associated data.
        </p>
        <button onClick={handleDelete} className="btn btn-outline-danger">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
