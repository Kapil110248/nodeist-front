import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-page container py-4">
      <h2 className="mb-4">Settings</h2>

      {/* Profile Info */}
      <div className="settings-section mb-5">
        <h5 className="section-title">Profile</h5>
        <div className="form-group mb-3">
          <label>Full Name</label>
          <input type="text" className="form-control" placeholder="username" />
        </div>
        <div className="form-group mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="kapil@example.com"
          />
        </div>
        <button className="btn btn-outline-primary">Save Profile</button>
      </div>

      {/* Password Change */}
      <div className="settings-section mb-5">
        <h5 className="section-title">Password</h5>
        <div className="form-group mb-3">
          <label>Current Password</label>
          <input type="password" className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>New Password</label>
          <input type="password" className="form-control" />
        </div>
        <button className="btn btn-outline-warning">Change Password</button>
      </div>

      {/* Notifications */}
      <div className="settings-section mb-5">
        <h5 className="section-title">Notifications</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailNotifications"
          />
          <label className="form-check-label" htmlFor="emailNotifications">
            Email Notifications
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="settings-section danger-zone mt-5">
        <h5 className="section-title text-danger">Danger Zone</h5>
        <p className="text-muted small">
          Permanently delete your account and all associated data.
        </p>
        <button className="btn btn-outline-danger">Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;
