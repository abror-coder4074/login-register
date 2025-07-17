import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import lord from '../../axios'

const Home = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://dummyjson.com/users ")
      .then(res => res.json())
      .then(data => {
        setUsers(data.users)
      })
      .catch(error => {
        console.log(error);

      })
  }, [])

  const handleSubmit = (id) => {
    navigate(`details/${id}`)
  }

  const handleDelete = (id) => {
    lord.delete(`/user/${id}`)
    .then(res => {
      console.log("iser deleted" , res.data);
      setUsers(users.filter(user => user.id !== id))
    })
    .catch(error =>{
      console.log("Error deleting user", error);
    })
  }

  return (
    <div className='bg-gradient-to-br from to-blue-900 to bg-red-900 w-full py-60 flex flex-wrap items-start justify-center gap-2.5'>
      {
        users.map((value, index) => {
          return (
            <div className=' border-blue-100' >
              <div className='w-80 h-28 flex flex-col items-center justify-center text-2xl text-white border-2 border-red-500 py-2.5 px-11 bg-gradient-to-br from bg-red-700 to-blue-700'>
                <button onClick={() => { handleSubmit(value.id) }} key={index} >
                  <h2>{value.firstName} {value.lastName} {value.maidenName}</h2>
                  <h3>{value.age}</h3>
                </button>
                <div>
                  <button className='px-5 py-2 bg-red-600 rounded-xl' onClick={() =>{ handleDelete(value.id)}}>Delete</button>
                  <button className='px-5 py-2 bg-yellow-600 rounded-xl ' onClick={() =>{ handleEdit(value.id)}}>Edit</button>
                </div>
              </div>
            </div>
          )
        })
      }
    </div >
  )
}

export default Home
