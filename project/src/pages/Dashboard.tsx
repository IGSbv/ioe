import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Calendar, User, CreditCard } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/search"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Plane className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Search Flights</h2>
              <p className="text-gray-600">Find and book new flights</p>
            </div>
          </div>
        </Link>

        <Link
          to="/bookings"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">My Bookings</h2>
              <p className="text-gray-600">View your flight bookings</p>
            </div>
          </div>
        </Link>

        <Link
          to="/profile"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <User className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Profile</h2>
              <p className="text-gray-600">Manage your account</p>
            </div>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              <p className="text-gray-600">Manage payment options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}