import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import lord from '../axios'

const Details = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        lord.get(`/product/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error("Error loading product:", err))
    }, [id])

    if (!product) return <p className='text-white text-center mt-20'>Loading...</p>

    return (
        <div className='bg-gradient-to-br from-blue-900 to-red-900 min-h-screen py-20 px-5 flex justify-center'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-md text-center'>
                <img src={product.images} alt={product.title} className='w-full h-64 object-cover rounded mb-4' />
                <h1 className='text-2xl font-bold'>{product.title}</h1>
                <p className='mt-2'>Brand: {product.brand}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}</p>
            </div>
        </div>
    )
}

export default Details
