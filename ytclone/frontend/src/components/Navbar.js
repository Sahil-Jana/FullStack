// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-red-400">YTClone</Link>
      </div>

      <div className="space-x-4 text-sm sm:text-base">
        <Link to="/" className="hover:text-red-400">Home</Link>
        {token && <Link to="/upload" className="hover:text-red-400">Upload</Link>}
        {token && <Link to="/dashboard" className="hover:text-red-400">Dashboard</Link>}
        {!token && <Link to="/login" className="hover:text-red-400">Login</Link>}
        {!token && <Link to="/register" className="hover:text-red-400">Register</Link>}
        {token && (
          <button onClick={handleLogout} className="hover:text-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
