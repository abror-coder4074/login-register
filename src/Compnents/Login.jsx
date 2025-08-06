import React, { useState } from 'react';
import lord from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await lord.post('/auth/login', { username, password });

      console.log('Login javobi:', res.data);

      const token = res.data.token || res.data.accessToken || res.data.data?.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setError('Token topilmadi. Login muvaffaqiyatsiz.');
      }
    } catch (err) {
      console.log('Xatolik:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Username yoki parol xato!');
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center px-4 sm:px-6"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/df/c3/b7/dfc3b7937b7d365c0c2ed9df334cb713.jpg')",
      }}
    >
      <div className="bg-transparent w-full max-w-[400px] p-6 sm:p-8 rounded border border-gray-400 shadow hover:bg-gray-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Login</h2>
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-green-600 w-full py-2 rounded text-white hover:bg-green-800 transition"
          >
            Kirish
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-3 text-sm text-center text-white">
          Ro‘yxatdan o‘tmaganmisiz?
          <a href="/register" className="text-blue-400 underline ml-1 hover:text-blue-600 transition">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
