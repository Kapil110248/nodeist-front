import React, { useState, useEffect } from "react";
import axios from "axios";

const ReminderPage = () => {
  const [tasks, setTasks] = useState([]);
  const [reminderBefore, setReminderBefore] = useState("today");

  useEffect(() => {
    fetchTasks();
  }, [reminderBefore]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      const allTasks = res.data.filter((task) => task.status === "Pending");

      const now = new Date();

      const filteredTasks = allTasks.filter((task) => {
        const taskDateTime = new Date(`${task.date}T${task.time}`);
        const timeDiff = (taskDateTime - now) / 60000; // in minutes
        const dayDiff = timeDiff / 1440; // in days

        switch (reminderBefore) {
          case "10":
            return timeDiff > 0 && timeDiff <= 10;
          case "30":
            return timeDiff > 0 && timeDiff <= 30;
          case "60":
            return timeDiff > 0 && timeDiff <= 60;
          case "300":
            return timeDiff > 0 && timeDiff <= 300;
          case "today":
            return (
              taskDateTime.toDateString() === now.toDateString() &&
              timeDiff >= 0
            );
          case "5days":
            return dayDiff >= 0 && dayDiff <= 5;
          default:
            return false;
        }
      });

      setTasks(filteredTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "800px", backgroundColor: "#fffaf0" }}
    >
      <h2 className="fw-semibold text-warning">Upcoming Tasks with Reminder</h2>

      <div className="mt-3">
        <label className="form-label text-warning">Remind me before</label>
        <select
          className="form-select border-warning"
          value={reminderBefore}
          onChange={(e) => setReminderBefore(e.target.value)}
        >
          <option value="10">10 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="300">5 hours</option>
          <option value="today">Today</option>
          <option value="5days">Next 5 days</option>
        </select>
      </div>

      <div className="vstack gap-3 mt-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="d-flex justify-content-between align-items-center p-3 shadow-sm rounded-4 border bg-white"
              style={{ borderColor: "#ffb74d" }}
            >
              <div className="d-flex align-items-start gap-3">
                <div>
                  <h6 className="mb-1">{task.title}</h6>
                  <small className="text-muted">
                    {task.date} at {task.time}
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-warning text-dark">Reminder</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No tasks in this time range.</p>
        )}
      </div>
    </div>
  );
};

export default ReminderPage;
