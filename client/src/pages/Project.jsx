import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");

  // Load Projects
  useEffect(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    setProjects(savedProjects);
  }, []);

  // Save Projects
  const saveProjects = (updatedProjects) => {
    setProjects(updatedProjects);

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );
  };

  // Add Project
  const addProject = () => {
    if (!title || !description || !members) {
      alert("Please fill all fields");
      return;
    }

    const newProject = {
      title,
      description,
      members: members.split(",").map((m) => m.trim()),
      status: "Active",
    };

    const updatedProjects = [...projects, newProject];

    saveProjects(updatedProjects);

    setTitle("");
    setDescription("");
    setMembers("");
  };

  // Toggle Active/Inactive
  const toggleStatus = (index) => {
    const updatedProjects = [...projects];

    updatedProjects[index].status =
      updatedProjects[index].status === "Active"
        ? "Inactive"
        : "Active";

    saveProjects(updatedProjects);
  };

  // Delete Project
  const deleteProject = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    const updatedProjects = projects.filter(
      (_, i) => i !== index
    );

    saveProjects(updatedProjects);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-5xl font-bold">
            Project Management
          </h1>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
            {user?.role}
          </span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Back
        </button>
      </div>

      {/* Admin Section */}
      {user?.role === "admin" && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-3xl font-bold mb-6">
            Add New Project
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-4 rounded-lg"
            />

            <input
              type="text"
              placeholder="Members (comma separated)"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              className="border p-4 rounded-lg"
            />
          </div>

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-4 rounded-lg w-full h-32 mb-4"
          />

          <button
            onClick={addProject}
            className="bg-blue-600 text-white px-6 py-4 rounded-lg w-full"
          >
            Add Project
          </button>
        </div>
      )}

      {/* Projects List */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow"
            >
              {/* Top */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">
                  {project.title}
                </h2>

                <span
                  className={`px-3 py-1 rounded-lg text-sm ${
                    project.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                {project.description}
              </p>

              {/* Members */}
              <h3 className="font-bold mb-3 text-lg">
                Team Members:
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.members.map((member, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-4 py-2 rounded-full"
                  >
                    {member}
                  </span>
                ))}
              </div>

              {/* Admin Controls */}
              {user?.role === "admin" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleStatus(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Toggle Status
                  </button>

                  <button
                    onClick={() => deleteProject(index)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-xl">
            No Projects Added Yet
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;