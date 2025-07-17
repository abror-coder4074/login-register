import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'

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

  return (
    <div className='bg-gradient-to-br from to-blue-900 to bg-red-900 w-full py-60 flex flex-wrap items-start justify-center gap-2.5'>
      {
        users.map((value, index) => {
          return <button onClick={()=>{handleSubmit(value.id)}} key={index} className=' border-blue-100 '>
            <div className='w-80 h-28 flex flex-col items-center justify-center text-2xl text-white border-2 border-red-500 py-2.5 px-11 bg-gradient-to-br from bg-red-700 to-blue-700'>
              <h2>{value.firstName} {value.lastName} {value.maidenName}</h2>
              <h3>{value.age}</h3>
              <div>
              </div>
            </div>
          </button>
        })
      }
    </div>
  )
}

export default Home
