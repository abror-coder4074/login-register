import React, { useEffect, useState } from 'react'
import lord from '../axios'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaPhoneAlt } from "react-icons/fa"
import { FaUserCheck } from "react-icons/fa6"

const Home = () => {
  const [users, setUsers] = useState([])
  const [editUserId, setEditUserId] = useState(null)
  const [editedUser, setEditedUser] = useState({
    fullname: '',
    phone_number: '',
    username: ''
  })
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      getUsers()
    }
  }, [])

  const getUsers = async () => {
    try {
      const res = await lord.get('/users')
      setUsers(res.data)
    } catch (err) {
      console.error("Xatolik:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleEditClick = (user) => {
    setEditUserId(user.id)
    setEditedUser({
      fullname: user.fullname,
      phone_number: user.phone_number,
      username: user.username
    })
  }

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveClick = async (id) => {
    try {
      await lord.put(`/users/${id}`, editedUser)
      setEditUserId(null)
      getUsers()
    } catch (err) {
      console.error("Tahrirlashda xatolik:", err)
    }
  }

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Rostdan ham o'chirmoqchimisiz?")
    if (!isConfirmed) return

    try {
      await lord.delete(`/users/${id}`)
      getUsers()
    } catch (err) {
      console.error("O‘chirishda xatolik:", err)
    }
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white p-5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 bg-white dark:bg-gray-900 max-w-[800px] w-full py-3 px-5 rounded-2xl m-auto gap-4">
          <div>
            <h1 className='py-1 px-5 text-center bg-blue-800 rounded-xl text-white font-extrabold w-[100px]'>Login</h1>
            <h1 className='py-1 px-5 bg-red-800 text-white rounded-xl font-extrabold ml-5'>Register</h1>
          </div>

          <ul className='flex items-center justify-around gap-10'>
            <li><a className='text-2xl font-bold dark:text-white text-black' href="/">Home</a></li>
            <li><a className='text-black dark:text-white font-bold text-2xl mr-10' href="/product">Products</a></li>
          </ul>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold"
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 font-extrabold rounded hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center">
          {users.map(user => (
            <div key={user.id} className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 shadow rounded-xl flex flex-col gap-2">
              {editUserId === user.id ? (
                <>
                  <input
                    type="text"
                    name="fullname"
                    value={editedUser.fullname}
                    onChange={handleChange}
                    className='border px-2 py-1 rounded dark:bg-gray-700 dark:text-white'
                  />
                  <input
                    type="text"
                    name="phone_number"
                    value={editedUser.phone_number}
                    onChange={handleChange}
                    className='border px-2 py-1 rounded dark:bg-gray-700 dark:text-white'
                  />
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleChange}
                    className='border px-2 py-1 rounded dark:bg-gray-700 dark:text-white'
                  />
                  <div className='flex justify-between mt-3'>
                    <button
                      onClick={() => setEditUserId(null)}
                      className='py-1 px-4 rounded font-extrabold text-white bg-gray-600'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveClick(user.id)}
                      className='py-1 px-4 rounded font-extrabold text-white bg-blue-700'
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span className='font-extrabold'>{user.fullname}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt />
                    <span className='font-extrabold'>{user.phone_number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserCheck />
                    <span className='font-extrabold'>{user.username}</span>
                  </div>
                  <div className='flex justify-between mt-3'>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className='py-1 px-4 rounded font-extrabold text-white bg-red-800'>
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditClick(user)}
                      className='py-1 px-4 rounded font-extrabold text-white bg-yellow-600'>
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
