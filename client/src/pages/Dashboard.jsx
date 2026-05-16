import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate()

  const user =
    JSON.parse(localStorage.getItem('user'))

  const logoutHandler = () => {

    // Remove logged in user
    localStorage.removeItem('user')

    // Redirect to login
    navigate('/')

    // Force refresh
    window.location.reload()
  }

  return (
    <div className='min-h-screen bg-gray-100'>

      {/* Navbar */}
      <div className='bg-black text-white p-4 flex justify-between items-center'>

        <div className='flex items-center gap-4'>

          <h1 className='text-2xl font-bold'>
            Team Task Manager
          </h1>

          <span className='bg-blue-500 px-3 py-1 rounded'>
            {user?.role}
          </span>

        </div>

        <div className='flex gap-4 items-center'>

          <span>
            Welcome, {user?.name}
          </span>

          <button
            onClick={logoutHandler}
            className='bg-red-500 px-4 py-2 rounded'
          >
            Logout
          </button>

        </div>

      </div>

      {/* Dashboard */}
      <div className='p-8'>

        <h2 className='text-3xl font-bold mb-8'>
          Dashboard
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

          <Link
            to='/projects'
            className='bg-white p-8 rounded-lg shadow hover:shadow-xl transition'
          >

            <h3 className='text-2xl font-bold mb-2'>
              Projects
            </h3>

            <p>
              Manage all projects and teams
            </p>

          </Link>

          <Link
            to='/tasks'
            className='bg-white p-8 rounded-lg shadow hover:shadow-xl transition'
          >

            <h3 className='text-2xl font-bold mb-2'>
              Tasks
            </h3>

            <p>
              Create and track tasks
            </p>

          </Link>

          <div className='bg-white p-8 rounded-lg shadow'>

            <h3 className='text-2xl font-bold mb-2'>
              Role Access
            </h3>

            <p>
              {user?.role === 'admin'
                ? 'Full Access'
                : 'Limited Access'}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard