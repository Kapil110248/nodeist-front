import axios from "axios";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      userData
    );
    return res.data;
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
    return res.data;
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

// Update user profile
export const updateUserProfile = async (profileData, token) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/api/users/update",
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Delete user account
export const deleteUserAccount = async (token) => {
  try {
    const response = await axios.delete("http://localhost:5000/api/users/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};
