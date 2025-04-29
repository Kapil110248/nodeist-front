import React, { useState } from "react";
import { v4 as uuid } from "uuid";


const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState("#007bff");
  const [selectedProject, setSelectedProject] = useState(null);
  const [dummyTasks, setDummyTasks] = useState([
    {
      id: 1,
      title: "Sample Task 1",
      date: "2025-04-21",
      time: "10:00",
      completed: false,
    },
    {
      id: 2,
      title: "Sample Task 2",
      date: "2025-04-22",
      time: "14:30",
      completed: false,
    },
  ]);

  const handleAddProject = () => {
    if (projectName.trim() === "") return;

    const newProject = {
      id: uuid(),
      name: projectName,
      color: color,
      tasks: [],
    };

    setProjects([...projects, newProject]);
    setProjectName("");
    setColor("#007bff");
  };

  const handleDeleteProject = (id) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    if (selectedProject?.id === id) setSelectedProject(null);
  };

  const toggleComplete = (id) => {
    const updatedTasks = dummyTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setDummyTasks(updatedTasks);
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Sidebar */}
        <div className="col-md-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-3">Projects</h5>
            <div className="mb-3 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: "45px", height: "45px", border: "none" }}
              />
              <button className="btn btn-dark" onClick={handleAddProject}>
                +
              </button>
            </div>
            <ul className="list-group">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    selectedProject?.id === project.id ? "active" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedProject?.id === project.id
                        ? project.color
                        : "",
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  <span>
                    <span
                      className="me-2"
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        backgroundColor: project.color,
                        borderRadius: "50%",
                      }}
                    ></span>
                    {project.name}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-8">
          <div className="bg-white p-4 rounded shadow-sm">
            {selectedProject ? (
              <>
                <h5 className="mb-3">{selectedProject.name} - Tasks</h5>
                {dummyTasks.length > 0 ? (
                  <div className="vstack gap-3">
                    {dummyTasks.map((task) => (
                      <div
                        key={task.id}
                        className="d-flex justify-content-between align-items-center p-3 border rounded-3 shadow-sm"
                        style={{ opacity: task.completed ? 0.6 : 1 }}
                      >
                        <div>
                          <h6
                            className="mb-1"
                            style={{
                              textDecoration: task.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {task.title}
                          </h6>
                          <small className="text-muted">
                            {task.date} at {task.time}
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className={`btn btn-sm ${
                              task.completed
                                ? "btn-success"
                                : "btn-outline-success"
                            }`}
                            onClick={() => toggleComplete(task.id)}
                          >
                            {task.completed ? (
                              <i className="fas fa-check-circle" />
                            ) : (
                              <i className="far fa-circle" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No tasks in this project.</p>
                )}
              </>
            ) : (
              <p className="text-muted">Select a project to view tasks.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
