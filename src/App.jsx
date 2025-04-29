// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // useNavigate ki ab jarurat nahi
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ReminderPage from "./pages/ReminderPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingPage";
import CompletedTasks from "./pages/CompletedTasks";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem("token"));
    }, 1000); // ✅ Every second token check (real-time update)

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="d-flex">
        {token && <Sidebar setToken={setToken} />} {/* ✅ Pass setToken */}
        <div
          className="flex-grow-1 p-4"
          style={{ marginLeft: token ? "250px" : "0px" }}
        >
          <Routes>
            <Route
              path="/login"
              element={
                !token ? <Login setToken={setToken} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/register"
              element={!token ? <Register /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={token ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/completed"
              element={token ? <CompletedTasks /> : <Navigate to="/login" />}
            />
            <Route
              path="/projects"
              element={token ? <ProjectsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/reminders"
              element={token ? <ReminderPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={token ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={token ? <SettingsPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
