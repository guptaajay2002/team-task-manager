import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Task() {

  const user =
    JSON.parse(localStorage.getItem('user'))

  // Load tasks
  const [tasks, setTasks] = useState(() => {

    const savedTasks =
      localStorage.getItem('tasks')

    return savedTasks
      ? JSON.parse(savedTasks)
      : []
  })

  const [formData, setFormData] = useState({
    title: '',
    assignedTo: '',
    priority: 'Medium',
    deadline: '',
  })

  // Save tasks
  useEffect(() => {

    localStorage.setItem(
      'tasks',
      JSON.stringify(tasks)
    )

  }, [tasks])

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addTask = (e) => {

    e.preventDefault()

    const newTask = {
      id: Date.now(),

      title: formData.title,

      assignedTo: formData.assignedTo,

      priority: formData.priority,

      deadline: formData.deadline,

      status: 'Pending',
    }

    setTasks([...tasks, newTask])

    setFormData({
      title: '',
      assignedTo: '',
      priority: 'Medium',
      deadline: '',
    })
  }

  const updateStatus = (id, status) => {

    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status }
        : task
    )

    setTasks(updatedTasks)
  }

  const deleteTask = (id) => {

    const updatedTasks =
      tasks.filter((task) => task.id !== id)

    setTasks(updatedTasks)
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>

      {/* Header */}
      <div className='flex justify-between items-center mb-8'>

        <div className='flex items-center gap-4'>

          <h1 className='text-4xl font-bold'>
            Task Management
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
            Create Task
          </h2>

          <form
            onSubmit={addTask}
            className='grid grid-cols-1 md:grid-cols-2 gap-4'
          >

            {/* Task Title */}
            <input
              type='text'
              name='title'
              placeholder='Task Title'
              value={formData.title}
              onChange={handleChange}
              className='border p-3 rounded'
              required
            />

            {/* Manual Assign */}
            <input
              type='text'
              name='assignedTo'
              placeholder='Assign To'
              value={formData.assignedTo}
              onChange={handleChange}
              className='border p-3 rounded'
              required
            />

            {/* Priority */}
            <select
              name='priority'
              value={formData.priority}
              onChange={handleChange}
              className='border p-3 rounded'
            >

              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>

            </select>

            {/* Deadline */}
            <input
              type='date'
              name='deadline'
              value={formData.deadline}
              onChange={handleChange}
              className='border p-3 rounded'
              required
            />

            {/* Submit */}
            <button className='bg-blue-600 text-white py-3 rounded hover:bg-blue-700'>
              Add Task
            </button>

          </form>

        </div>

      )}

      {/* Task Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        {tasks.map((task) => (

          <div
            key={task.id}
            className='bg-white p-6 rounded-lg shadow'
          >

            <div className='flex justify-between items-center mb-4'>

              <h2 className='text-2xl font-bold'>
                {task.title}
              </h2>

              <span className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded'>
                {task.priority}
              </span>

            </div>

            <p className='mb-2'>
              <strong>Assigned To:</strong>{' '}
              {task.assignedTo}
            </p>

            <p className='mb-2'>
              <strong>Deadline:</strong>{' '}
              {task.deadline}
            </p>

            <p className='mb-4'>
              <strong>Status:</strong>{' '}
              {task.status}
            </p>

            {/* Status Buttons */}
            <div className='flex gap-2 flex-wrap mb-4'>

              <button
                onClick={() =>
                  updateStatus(task.id, 'Pending')
                }
                className='bg-gray-500 text-white px-3 py-2 rounded'
              >
                Pending
              </button>

              <button
                onClick={() =>
                  updateStatus(task.id, 'In Progress')
                }
                className='bg-blue-500 text-white px-3 py-2 rounded'
              >
                In Progress
              </button>

              <button
                onClick={() =>
                  updateStatus(task.id, 'Completed')
                }
                className='bg-green-500 text-white px-3 py-2 rounded'
              >
                Completed
              </button>

            </div>

            {/* ADMIN ONLY */}
            {user?.role === 'admin' && (

              <button
                onClick={() => deleteTask(task.id)}
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

export default Task