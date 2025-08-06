import React, { useEffect, useState } from 'react'
import lord from '../axios'

const Product = () => {
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [editProductId, setEditProductId] = useState(null)
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        price: ''
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await lord.get('/products')
            setProducts(res.data)
        } catch (err) {
            console.error('GET xatolik:', err.response?.data || err.message)
        }
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            const newProduct = {
                name,
                userId: 3,
                price: Number(price),
            }
            const res = await lord.post('/products', newProduct)
            console.log('Qo‘shildi:', res.data)
            fetchProducts()
            setName('')
            setPrice('')
        } catch (err) {
            console.error('POST xatolik:', err.response?.data || err.message)
        }
    }

    const handleDeleteProduct = async (id) => {
        try {
            await lord.delete(`/products/${id}`)
            fetchProducts()
        } catch (err) {
            console.error('DELETE xatolik:', err.response?.data || err.message)
        }
    }

    const handleEditClick = (product) => {
        setEditProductId(product.id)
        setEditedProduct({
            name: product.name,
            price: product.price
        })
    }

    const handleEditChange = (e) => {
        setEditedProduct({
            ...editedProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleSaveClick = async (id) => {
        try {
            const updated = {
                ...editedProduct,
                price: Number(editedProduct.price),
            }
            await lord.put(`/products/${id}`, updated)
            setEditProductId(null)
            fetchProducts()
        } catch (err) {
            console.error('PUT xatolik:', err.response?.data || err.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="flex flex-col md:flex-row justify-between items-center mb-5 bg-white max-w-[800px] w-full py-3 px-5 rounded-2xl m-auto gap-4">
                <div>
                    <h1 className='py-1 px-5 text-center bg-blue-800 rounded-xl text-white font-extrabold w-[100px]'>Login</h1>
                    <h1 className='py-1 px-5 bg-red-800 text-white rounded-xl font-extrabold ml-5'>Register</h1>
                </div>

                <ul className='flex items-center justify-around gap-10'>
                    <li><a className='text-2xl font-bold text-black' href="/">Home</a></li>
                    <li><a className='text-black font-bold text-2xl mr-10' href="/product">Products</a></li>
                </ul>

                <button onClick={handleLogout} className="bg-red-600 px-4 py-2 text-white font-extrabold rounded hover:bg-red-800">
                    Logout
                </button>
            </div>

            <h1 className="text-3xl font-bold text-center mb-6">Mahsulotlar</h1>

            <form
                onSubmit={handleAddProduct}
                className="bg-white max-w-md mx-auto p-4 rounded shadow space-y-3 mb-8"
            >
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mahsulot nomi"
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Narx"
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Qo‘shish
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-4 rounded shadow flex flex-col justify-between"
                    >
                        {editProductId === product.id ? (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-2"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleEditChange}
                                    className="w-full border border-gray-300 p-2 rounded mb-2"
                                />
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() => setEditProductId(null)}
                                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleSaveClick(product.id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h2 className="text-xl font-bold">{product.name}</h2>
                                    <p className="text-gray-600">{product.description}</p>
                                    <p className="font-bold text-green-700 mt-2">
                                        {product.price} so‘m
                                    </p>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(product)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product
