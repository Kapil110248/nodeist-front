import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/authService";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
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

        // 👇 Save name to localStorage
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

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <img
        src={profileImage}
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
