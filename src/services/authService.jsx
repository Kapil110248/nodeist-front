import axios from "axios";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      userData
    );
    return res.data; // Response jo backend se milega
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Login user and return JWT token
export const loginUser = async (userData) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      userData
    );
    return res.data; // JWT token jo backend se milega
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get user profile


export const getUserProfile = async (token) => {
  const response = await axios.get("http://localhost:5000/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
