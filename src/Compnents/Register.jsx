import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(username, password);
      alert("Ro‘yxatdan o‘tildi, login qiling");
      navigate('/login');
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError('Ro‘yxatdan o‘tishda xatolik');
    }
  };

  return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-pink-800">
      <div className="bg-white p-8 rounded shadow w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-3">
          <input value={username} onChange={e=>setUsername(e.target.value)}
           placeholder="Username" required
           className="w-full border p-2 rounded"/>
          <input value={password} onChange={e=>setPassword(e.target.value)}
           placeholder="Password" type="password" required
           className="w-full border p-2 rounded"/>
          <button type="submit"
           className="bg-blue-600 w-full py-2 rounded text-white hover:bg-blue-800">Ro‘yxatdan o‘tish</button>
        </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        <p className="mt-3 text-sm text-center">
          Allaqachon login qilganmisiz?
          <a href="/login" className="text-blue-600 underline ml-1">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
