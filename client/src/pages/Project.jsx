import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Project() {

  const user =
    JSON.parse(localStorage.getItem('user'))

  // Load projects
  const [projects, setProjects] = useState(() => {

    const savedProjects =
      localStorage.getItem('projects')

    return savedProjects
      ? JSON.parse(savedProjects)
      : []
  })

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    members: '',
  })

  // Save projects
  useEffect(() => {

    localStorage.setItem(
      'projects',
      JSON.stringify(projects)
    )

  }, [projects])

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addProject = (e) => {

    e.preventDefault()

    const newProject = {
      id: Date.now(),

      title: formData.title,

      description: formData.description,

      status: 'Active',

      // FIXED MEMBERS ARRAY
      members: formData.members
        .split(',')
        .map((member) => member.trim())
        .filter((member) => member !== ''),
    }

    setProjects([...projects, newProject])

    setFormData({
      title: '',
      description: '',
      members: '',
    })
  }

  const deleteProject = (id) => {

    const updatedProjects =
      projects.filter(
        (project) => project.id !== id
      )

    setProjects(updatedProjects)
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>

      {/* Header */}
      <div className='flex justify-between items-center mb-8'>

        <div className='flex items-center gap-4'>

          <h1 className='text-4xl font-bold'>
            Project Management
          </h1>

          <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded'>
            {user?.role}
          </span>

        </div>

        <Link
          to='/dashboard'
          className='bg-black text-white px-4 py-2 rounded'
        >
          Back
        </Link>

      </div>

      {/* ADMIN ONLY */}
      {user?.role === 'admin' && (

        <div className='bg-white p-6 rounded-lg shadow mb-10'>

          <h2 className='text-2xl font-bold mb-4'>
            Add New Project
          </h2>

          <form
            onSubmit={addProject}
            className='grid grid-cols-1 md:grid-cols-2 gap-4'
          >

            {/* Project Title */}
            <input
              type='text'
              name='title'
              placeholder='Project Title'
              value={formData.title}
              onChange={handleChange}
              className='border p-3 rounded'
              required
            />

            {/* Members */}
            <input
              type='text'
              name='members'
              placeholder='Members (Ajay, Rahul, Aman)'
              value={formData.members}
              onChange={handleChange}
              className='border p-3 rounded'
              required
            />

            {/* Description */}
            <textarea
              name='description'
              placeholder='Project Description'
              value={formData.description}
              onChange={handleChange}
              className='border p-3 rounded md:col-span-2'
              rows='4'
              required
            />

            {/* Submit */}
            <button className='bg-blue-600 text-white py-3 rounded hover:bg-blue-700'>
              Add Project
            </button>

          </form>

        </div>

      )}

      {/* Project Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        {projects.map((project) => (

          <div
            key={project.id}
            className='bg-white p-6 rounded-lg shadow'
          >

            <div className='flex justify-between items-center mb-4'>

              <h2 className='text-2xl font-bold'>
                {project.title}
              </h2>

              <span className='bg-green-100 text-green-700 px-3 py-1 rounded'>
                {project.status}
              </span>

            </div>

            <p className='mb-4 text-gray-600'>
              {project.description}
            </p>

            {/* Team Members */}
            <h3 className='font-semibold mb-2'>
              Team Members:
            </h3>

            <div className='flex flex-wrap gap-2 mb-4'>

              {project.members.map((member, index) => (

                <span
                  key={index}
                  className='bg-gray-200 px-3 py-1 rounded-full'
                >
                  {member}
                </span>

              ))}

            </div>

            {/* ADMIN ONLY */}
            {user?.role === 'admin' && (

              <button
                onClick={() =>
                  deleteProject(project.id)
                }
                className='bg-red-500 text-white px-4 py-2 rounded'
              >
                Delete
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  )
}

export default Project