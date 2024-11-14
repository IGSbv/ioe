import React, { useState, useEffect } from 'react';
import { Booking, Flight } from '../types';

export default function Bookings() {
  const [bookings, setBookings] = useState<(Booking & { flight: Flight })[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{booking.flight.airline}</h3>
                <p className="text-sm text-gray-500">Flight {booking.flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">
                  ₹{booking.totalAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.seatType} - {booking.passengers} passenger(s)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold">{booking.flight.departure}</p>
                <p className="text-sm text-gray-600">{booking.flight.departureTime}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">{booking.flight.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{booking.flight.arrival}</p>
                <p className="text-sm text-gray-600">{booking.flight.arrivalTime}</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <p>Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p className="capitalize">Status: {booking.paymentStatus}</p>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}