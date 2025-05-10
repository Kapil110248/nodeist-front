import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    newPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    // Get user profile
    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { name, email, phone } = res.data.user;
        setUser({ name, email, phone });
      })
      .catch((err) => {
        toast.error("Failed to fetch user profile"); // Error notification
        navigate("/login");
      });
  }, [navigate]);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/users/update",
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
          newPassword: user.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile updated successfully!"); // Success notification
    } catch (err) {
      toast.error("Failed to update profile"); // Error notification
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/users/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      toast.success("Account deleted successfully!"); // Success notification
      navigate("/register");
    } catch (err) {
      toast.error("Failed to delete account"); // Error notification
    }
  };

  return (
    <div className="settings-page container py-4">
      <h2 className="mb-4">Settings</h2>
      
      {/* Profile Update Form */}
      <div className="settings-section mb-5">
        <h5 className="section-title">Profile</h5>
        <div className="form-group mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="form-control"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group mb-3">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="form-control"
            placeholder="Your email"
          />
        </div>
        <div className="form-group mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="form-control"
            placeholder="Your phone number"
          />
        </div>
        <button
          onClick={handleProfileUpdate}
          className="btn btn-outline-primary"
        >
          Save Profile
        </button>
      </div>

      {/* Change Password Form */}
      <div className="settings-section mb-5">
        <h5 className="section-title">Change Password</h5>
        <div className="form-group mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={user.newPassword}
            onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
            className="form-control"
            placeholder="********"
          />
        </div>
        <button
          onClick={handleProfileUpdate}
          className="btn btn-outline-warning"
        >
          Update Password
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="settings-section danger-zone mt-5">
        <h5 className="section-title text-danger">Danger Zone</h5>
        <button
          onClick={handleDelete}
          className="btn btn-outline-danger"
        >
          Delete Account
        </button>
      </div>

      {/* Toast Notifications Container */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default Settings;
