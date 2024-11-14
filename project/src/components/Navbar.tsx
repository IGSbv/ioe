import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-yellow-400" />
            <span className="font-bold text-xl">Iron Wings</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 hover:text-yellow-200"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-yellow-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-yellow-50 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}