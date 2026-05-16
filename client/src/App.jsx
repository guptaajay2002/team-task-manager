import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Project'
import Tasks from './pages/Task'

function App() {

  // Get logged-in user
  const user =
    JSON.parse(localStorage.getItem('user'))

  return (

    <Routes>

      {/* Login */}
      <Route
        path='/'
        element={
          user
            ? <Navigate to='/dashboard' />
            : <Login />
        }
      />

      {/* Signup */}
      <Route
        path='/signup'
        element={
          user
            ? <Navigate to='/dashboard' />
            : <Signup />
        }
      />

      {/* Dashboard */}
      <Route
        path='/dashboard'
        element={
          user
            ? <Dashboard />
            : <Navigate to='/' />
        }
      />

      {/* Projects */}
      <Route
        path='/projects'
        element={
          user
            ? <Projects />
            : <Navigate to='/' />
        }
      />

      {/* Tasks */}
      <Route
        path='/tasks'
        element={
          user
            ? <Tasks />
            : <Navigate to='/' />
        }
      />

    </Routes>

  )
}

export default App