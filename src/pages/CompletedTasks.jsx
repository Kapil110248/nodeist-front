import React, { useEffect, useState } from "react";
import axios from "axios";

const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");

      const filtered = response.data.filter((task) => {
        if (task.status !== "Complete") return false;

        const completedDate = new Date(task.completedAt || task.updatedAt);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        if (from && completedDate < from) return false;
        if (to && completedDate > to) return false;

        return true;
      });

      setCompletedTasks(filtered);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
    const interval = setInterval(fetchCompletedTasks, 2000);
    return () => clearInterval(interval);
  }, [fromDate, toDate]);

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-warning fw-semibold">🎯 Completed Tasks</h3>

      {/* Compact Filter Section */}
      <div className="border rounded-4 p-3 mb-4 bg-white shadow-sm" style={{ borderColor: "#ffc078" }}>
        <h6 className="text-warning mb-3">📅 Filter by Date</h6>
        <div className="d-flex gap-3">
          <div className="flex-grow-1">
            <label className="form-label text-muted">From Date</label>
            <input
              type="date"
              className="form-control form-control-sm border-warning"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="flex-grow-1">
            <label className="form-label text-muted">To Date</label>
            <input
              type="date"
              className="form-control form-control-sm border-warning"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {completedTasks.length === 0 ? (
        <p className="text-muted">No completed tasks in this range.</p>
      ) : (
        <div className="vstack gap-3">
          {completedTasks.map((task) => (
            <div
              key={task._id}
              className="p-3 border rounded-4 shadow-sm d-flex justify-content-between align-items-start"
              style={{ backgroundColor: "#fff7ed", borderColor: "#ffc078" }}
            >
              <div>
                <h6 className="mb-1 text-decoration-line-through" style={{ color: "#cc5c00" }}>
                  {task.title}
                </h6>
                <small className="text-muted">
                  {task.date} at {task.time} <br />
                  ✅ Completed at:{" "}
                  <strong>{task.completedAt && formatTime(task.completedAt)}</strong>
                </small>
              </div>
              <span className="badge" style={{ backgroundColor: "#ffa94d", color: "#fff" }}>
                Complete
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;
