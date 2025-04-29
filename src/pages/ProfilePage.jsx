import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting to login
import { getUserProfile } from "../services/authService"; // Corrected here
import "./ProfilePage.css"; // Correct path here (assuming it's in src/styles)

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate(); // Hook to navigate

  // Fetch profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if not logged in
          return;
        }
        const data = await getUserProfile(token); // Corrected here
        setProfile(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Profile"
        width="120"
        height="120"
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
