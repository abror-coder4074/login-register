import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'

const Details = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <div className='bg-gradient-to-br from to-blue-900 to bg-red-900 w-full py-60 flex flex-wrap items-start justify-center gap-2.5'>
            {
                <button className=' border-blue-100 '>
                    <div className='w-80 flex flex-col items-center justify-center text-2xl text-white border-2 border-red-500 py-2.5 px-11 bg-gradient-to-br from bg-red-700 to-blue-700'>
                        <img src={users.images} alt="" />
                        <h1 className='mb-4'>{users.title}</h1>
                        <h2>Brand: {users.brand}</h2>
                        <h3>Price: {users.price}</h3>
                        <h5>Rating: {users.rating}</h5>
                        <div>
                        </div>
                    </div>
                </button>
            }
        </div>
    )
}

export default Details
