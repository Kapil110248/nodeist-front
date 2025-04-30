import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/authService";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Default image if not found
  ); // Initialize with image from localStorage or default image
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch profile data on component mount
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
      const imageUrl = URL.createObjectURL(file); // Create URL for the selected image
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl); // Store the new image URL in localStorage
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <img
        src={profileImage} // Use profile image from state (or localStorage)
        alt="Profile"
        width="120"
        height="120"
        style={{ cursor: "pointer", borderRadius: "50%" }}
        onClick={handleImageClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />
      <h3>{profile.name}</h3>
      <p>{profile.email}</p>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
