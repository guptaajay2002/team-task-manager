import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Existing users
    const users =
      JSON.parse(localStorage.getItem('users')) || []

    // Check duplicate email
    const userExists = users.find(
      (user) => user.email === formData.email
    )

    if (userExists) {
      alert('User already exists')
      return
    }

    // Save new user
    const updatedUsers = [...users, formData]

    localStorage.setItem(
      'users',
      JSON.stringify(updatedUsers)
    )

    alert('Signup Successful')

    navigate('/')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>

      <form
        onSubmit={handleSubmit}
        className='w-96 bg-white p-8 shadow-lg rounded-lg'
      >

        <h1 className='text-3xl font-bold mb-6 text-center'>
          Signup
        </h1>

        <input
          type='text'
          name='name'
          placeholder='Name'
          className='w-full border p-3 mb-4 rounded'
          onChange={handleChange}
          required
        />

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

        <select
          name='role'
          className='w-full border p-3 mb-4 rounded'
          onChange={handleChange}
        >
          <option value='member'>
            Member
          </option>

          <option value='admin'>
            Admin
          </option>

        </select>

        <button className='bg-black text-white w-full py-3 rounded'>
          Signup
        </button>

        <p className='text-center mt-4'>
          Already have an account?{' '}

          <Link
            to='/'
            className='text-blue-600 font-semibold'
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Signup