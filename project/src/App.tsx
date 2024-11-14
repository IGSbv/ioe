import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;