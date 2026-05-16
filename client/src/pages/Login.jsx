import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Get all users
    const users =
      JSON.parse(localStorage.getItem('users')) || []

    console.log('All Users:', users)

    // Find matching user
    const foundUser = users.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password
    )

    console.log('Found User:', foundUser)

    // If not found
    if (!foundUser) {
      alert('Invalid Credentials')
      return
    }

    // Save logged-in user
    localStorage.setItem(
      'user',
      JSON.stringify(foundUser)
    )

    alert('Login Successful')

    // Redirect manually
    window.location.href = '/dashboard'
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>

      <form
        onSubmit={handleSubmit}
        className='w-96 bg-white p-8 shadow-lg rounded-lg'
      >

        <h1 className='text-3xl font-bold mb-6 text-center'>
          Login
        </h1>

        <input
          type='email'
          name='email'
          placeholder='Email'
          className='w-full border p-3 mb-4 rounded'
          onChange={handleChange}
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          className='w-full border p-3 mb-4 rounded'
          onChange={handleChange}
          required
        />

        <button className='bg-black text-white w-full py-3 rounded'>
          Login
        </button>

        <p className='text-center mt-4'>
          Don&apos;t have an account?{' '}

          <Link
            to='/signup'
            className='text-blue-600 font-semibold'
          >
            Signup
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Login