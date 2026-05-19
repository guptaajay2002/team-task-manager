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
    };

    const updatedProjects = [...projects, newProject];

    setProjects(updatedProjects);

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );

    setTitle("");
    setDescription("");
    setMembers("");
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

      {/* Only Admin Can Add Projects */}
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

      {/* Everyone Can View Projects */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">
                  {project.title}
                </h2>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                  Active
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                {project.description}
              </p>

              <h3 className="font-bold mb-3 text-lg">
                Team Members:
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.members.map((member, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-4 py-2 rounded-full"
                  >
                    {member}
                  </span>
                ))}
              </div>
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