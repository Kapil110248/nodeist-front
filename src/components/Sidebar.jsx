import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove token from localStorage to log the user out
    localStorage.removeItem("token");
    setToken(null); // Update state for token

    // Remove profile info from localStorage
    localStorage.removeItem("profileImage");
    localStorage.removeItem("username");

    // Redirect to login page
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false); // Hide the confirmation dialog
  };

  // Get profile photo and username from localStorage
  const profileImage = localStorage.getItem("profileImage");
  const username = localStorage.getItem("username");

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      <div className="d-flex justify-content-end">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Show content only if sidebar is open */}
      {isOpen && (
        <>
          {/* Logo */}
          <Link
            to="/"
            className="logo d-flex align-items-center my-3 text-decoration-none"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKLhpF90FNSYq7H8onLEJB40mzNDtg3xx-Cx3TlntFHc4LkNZYgcaq9gYlumepxHmUCdc&usqp=CAU"
              alt="Logo"
              width="30"
              height="30"
              className="me-2"
            />
            <span className="fs-5 fw-bold text-dark">Todoist</span>
          </Link>

          {/* Profile Section */}
          <div className="profile-section d-flex align-items-center my-3">
            <img
              src={profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Profile"
              width="40"
              height="40"
              className="rounded-circle me-2"
            />
            <span className="fw-bold">{username || "User"}</span> {/* Display username or default "User" */}
          </div>

          {/* Main nav links */}
          <ul className="nav flex-column flex-grow-1">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark">
                <i className="fas fa-home me-2"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link text-dark">
                <i className="fas fa-tasks me-2"></i> Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reminders" className="nav-link text-dark">
                <i className="fas fa-bell me-2"></i> Reminders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/completed" className="nav-link text-dark">
                <i className="fas fa-check-circle me-2"></i> Completed Tasks
              </Link>
            </li>
          </ul>

          {/* Settings fixed at bottom */}
          <div className="settings-link mt-auto">
            <Link to="/settings" className="nav-link text-dark">
              <i className="fas fa-cog me-2"></i> Settings
            </Link>
          </div>

          {/* Logout Button at the bottom */}
          <div className="logout-btn mt-3">
            <button onClick={() => setShowConfirmation(true)} className="nav-link text-dark">
              <i className="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </div>

          {/* Logout Confirmation Modal */}
          {showConfirmation && (
            <div className="confirmation-modal">
              <div className="modal-content">
                <p>Are you sure you want to logout?</p>
                <div className="modal-buttons">
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                  <button onClick={handleCancelLogout} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
