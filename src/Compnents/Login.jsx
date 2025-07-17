import React, { useRef } from 'react'
import { data, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import lord from '../../axios'

const Login = () => {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        const obj = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        // fetch('', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(obj),
        // })

        //     .then(res => res.json())
        //     .then(data => {
        //         Cookies.set("token", JSON.stringify(data.accessToken))
        //         navigate("/home")
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         console.log(error);

        //     })

        try {
            lord.post("https://dummyjson.com/auth/login", obj)

                .then((res) => {
                    console.log("Login success", res.data);
                    navigate("/home")
                })
                .catch((error) => {
                    console.log("Login failed", error);

                })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='bg-blue-900 w-full h-[100vh] pt-40'>
            <form className='w-md rounded-2xl bg-gradient-to-br from-blue-800 to-pink-700 px-10 py-5 flex flex-col items-center mx-auto gap-5 shadow-xl shadow-white'>
                <div className='flex flex-col gap-2 w-max'>
                    <label htmlFor="username"
                        className='text-xl 
                        font-bold
                        text-white'>
                        Username
                    </label>
                    <input className='border-2 outline-none border-white
                     py-2 px-5 text-lg rounded-xl
                      text-white placeholder:text-white  '
                        ref={usernameRef}
                        type="text"
                        placeholder='Enter Username ...' />
                </div>
                <div className='flex flex-col gap-2 w-max'>
                    <label htmlFor="password"
                        className='text-xl 
                        font-bold
                        text-white'>
                        Username
                    </label>
                    <input className='border-2 outline-none border-white
                     py-2 px-5 text-lg rounded-xl
                      text-white placeholder:text-white  '
                        ref={passwordRef}
                        type="password"
                        placeholder='Enter Password ...' />
                </div>
                <button
                    onClick={handleLogin}
                    className='w=[70%] border-2
                    border-white py-2 px-10 
                    font-bold uppercase
                    text-white rounded-xl
                    hover:bg-blue-900 
                    hover:border-transparent transition-all
                     duration-500 ease-initial
                    cursor-pointer'>
                    Login</button>
            </form>
        </div>
    )
}

export default Login
