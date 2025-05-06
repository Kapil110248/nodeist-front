import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("username");
    setToken(null);
    navigate("/login");
  };

  const handleCancelLogout = () => setShowConfirmation(false);

  const profileImage = localStorage.getItem("profileImage");
  const username = localStorage.getItem("username");

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"} position-fixed d-flex flex-column`} >
      {/* ✅ Toggle Button at Top Right */}
      <div className="d-flex justify-content-end p-2">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* ✅ Profile Section (only if sidebar is open) */}
      {isOpen && (
        <Link
          to="/profile"
          className="top-profile d-flex align-items-center justify-content-end px-3 text-decoration-none"
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            width="35"
            height="35"
            className="rounded-circle me-2"
          />
          <span className="fw-bold text-dark">{username || "User"}</span>
        </Link>
      )}

      {/* ✅ Sidebar Content */}
      {isOpen && (
        <div className="d-flex flex-column flex-grow-1">
          {/* Removed Logo Section */}
          {/* <div style={{ marginTop: "60px" }}> */}
          {/*   <Link to="/" className="logo d-flex align-items-center my-3 text-decoration-none"> */}
          {/*     <img */}
          {/*       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKLhpF90FNSYq7H8onLEJB40mzNDtg3xx-Cx3TlntFHc4LkNZYgcaq9gYlumepxHmUCdc&usqp=CAU" */}
          {/*       alt="Logo" */}
          {/*       width="30" */}
          {/*       height="30" */}
          {/*       className="me-2" */}
          {/*     /> */}
          {/*     <span className="fs-5 fw-bold text-dark">Todoist</span> */}
          {/*   </Link> */}
          {/* </div> */}

          <ul className="nav flex-column">
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
          <div className="mt-auto">
            <div className="settings-link" style={{marginLeft : "15px"}}>
              <Link to="/settings" className="nav-link text-dark" style={{marginBottom : "-10px"}}>
                <i className="fas fa-cog me-2"></i> Settings
              </Link>
            </div>
            <div className="logout-btn mt-3 mb-3">
              <button
                onClick={() => setShowConfirmation(true)}
                className="nav-link text-dark"
              style={{marginBottom : "-30px"}}>
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </button>
            </div>
          </div>
          {/* Logout Confirmation */}
          {showConfirmation && (
            <div className="confirmation-modal">
              <div className="modal-content">
                <p>Are you sure you want to logout?</p>
                <div className="modal-buttons">
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                  <button
                    onClick={handleCancelLogout}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
