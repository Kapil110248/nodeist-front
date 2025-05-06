import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "../services/authService";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") ||
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const data = await getUserProfile(token);
        setProfile(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
        localStorage.setItem("username", data.user.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const updated = await updateUserProfile({ name, email }, token);
      alert("Profile updated successfully!");
      setProfile(updated.user);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await deleteUserAccount(token);
        localStorage.removeItem("token");
        alert("Account deleted");
        navigate("/login");
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-wrapper">
      <h2>My Profile</h2>
      <div className="profile-image-section">
        <img
          src={profileImage}
          alt="Profile"
          className="profile-img"
          onClick={handleImageClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="profile-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="profile-buttons">
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
          <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
