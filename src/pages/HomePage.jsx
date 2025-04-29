import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      const pendingTasks = res.data.filter((t) => t.status === "Pending");
      setTasks(pendingTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task && date && time) {
      try {
        const res = await axios.post("http://localhost:5000/tasks", {
          title: task,
          date,
          time,
        });
        setTasks((prev) => [...prev, res.data]);
        setTask("");
        setDate("");
        setTime("");

        // Toast on adding task
        toast.success("Task added successfully! 🎉", {
          style: {
            backgroundColor: "#ffb74d",
            color: "#4e342e",
            fontWeight: "bold",
          },
        });
      } catch (err) {
        console.error("Error adding task:", err);
        toast.error("Error adding task!", {
          style: {
            backgroundColor: "#ffe0b2",
            color: "#d32f2f",
            fontWeight: "bold",
          },
        });
      }
    }
  };

  const toggleStatus = async (id) => {
    const target = tasks.find((t) => t._id === id);
    const newStatus = target.status === "Pending" ? "Complete" : "Pending";

    try {
      await axios.patch(`http://localhost:5000/tasks/${id}`, {
        status: newStatus,
        completedAt: newStatus === "Complete" ? new Date() : null,
      });

      if (newStatus === "Complete") {
        setTasks((prev) => prev.filter((t) => t._id !== id));
        toast.success("Task marked as complete ✅", {
          style: {
            backgroundColor: "#c8e6c9",
            color: "#256029",
            fontWeight: "bold",
          },
        });
      } else {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
        );
      }
    } catch (err) {
      console.error("Error updating task status:", err);
      toast.error("Error updating task status!", {
        style: {
          backgroundColor: "#ffe0b2",
          color: "#d32f2f",
          fontWeight: "bold",
        },
      });
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.info("Task deleted 🗑️", {
        style: {
          backgroundColor: "#fff3e0",
          color: "#6d4c41",
          fontWeight: "bold",
        },
      });
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Error deleting task!", {
        style: {
          backgroundColor: "#ffe0b2",
          color: "#d32f2f",
          fontWeight: "bold",
        },
      });
    }
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "800px", backgroundColor: "#fffaf0" }}
    >
      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="text-center mb-4">
        <h2 className="fw-semibold text-warning">Your Daily Dashboard</h2>
        <p className="text-muted">Stay focused, stay organized.</p>
      </div>

      {/* Add Task Box */}
      <div
        className="bg-light rounded-4 shadow-sm p-4 mb-4"
        style={{ backgroundColor: "#fff7ed", borderColor: "#ffb74d" }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Task title"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              style={{ borderColor: "#ffb74d" }}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ borderColor: "#ffb74d" }}
            />
          </div>
          <div className="col-md-3">
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ borderColor: "#ffb74d" }}
            />
          </div>
        </div>
        <div className="text-end mt-3">
          <button
            className="btn"
            style={{
              backgroundColor: "#ffa94d",
              color: "#fff",
              borderColor: "#ffb74d",
            }}
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Show Tasks */}
      {tasks.length > 0 ? (
        <div className="vstack gap-3">
          {tasks.map((t) => (
            <div
              key={t._id}
              className={`d-flex justify-content-between align-items-center p-3 shadow-sm rounded-4 border ${
                t.status === "Complete"
                  ? "bg-success bg-opacity-10"
                  : "bg-white"
              }`}
              style={{ borderColor: "#ffb74d" }}
            >
              <div className="d-flex align-items-start gap-3">
                <input
                  type="checkbox"
                  checked={t.status === "Complete"}
                  onChange={() => toggleStatus(t._id)}
                />
                <div>
                  <h6
                    className={`${
                      t.status === "Complete"
                        ? "text-decoration-line-through text-muted"
                        : ""
                    } mb-1`}
                  >
                    {t.title}
                  </h6>
                  <small className="text-muted">
                    {t.date} at {t.time}
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span
                  className={`badge ${
                    t.status === "Pending"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                >
                  {t.status}
                </span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeTask(t._id)}
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center">No tasks added yet.</p>
      )}

      {/* Reminders link */}
      <div className="text-center mt-3">
        <Link
          to="/reminders"
          className="btn"
          style={{
            backgroundColor: "#ffa94d",
            color: "#fff",
            borderColor: "#ffb74d",
          }}
        >
          View Reminders
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
