import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const DEMO_FLIGHTS = [
  { id: 1, time: '06:00', price: 199 },
  { id: 2, time: '10:30', price: 299 },
  { id: 3, time: '14:45', price: 249 },
  { id: 4, time: '19:15', price: 179 },
];

// Exchange rate from USD to INR (example: 1 USD = 85 INR)
const EXCHANGE_RATE = 85;

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const addBooking = useAuthStore((state) => state.addBooking);
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const searchParams = location.state as {
    from: string;
    to: string;
    date: string;
  };

  const handlePayment = () => {
    const flight = DEMO_FLIGHTS.find((f) => f.id === selectedFlight);
    if (!flight) return;

    addBooking({
      id: Math.random().toString(36).substr(2, 9),
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
      price: flight.price,
      status: 'upcoming',
    });

    navigate('/profile');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900">
          Available Flights
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {searchParams.from} to {searchParams.to} on {searchParams.date}
        </p>

        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {DEMO_FLIGHTS.map((flight) => (
              <li key={flight.id}>
                <div
                  className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${
                    selectedFlight === flight.id ? 'bg-indigo-50' : ''
                  }`}
                  onClick={() => setSelectedFlight(flight.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-indigo-600">
                        Departure: {flight.time}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duration: ~2h 30min
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ₹{(flight.price * EXCHANGE_RATE).toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedFlight && !showPayment && (
          <div className="mt-6">
            <button
              onClick={() => setShowPayment(true)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {showPayment && (
          <div className="mt-6 bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="card-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="card-number"
                    id="card-number"
                    placeholder="4242 4242 4242 4242"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="expiration-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiration date
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="expiration-date"
                    id="expiration-date"
                    placeholder="MM/YY"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cvc"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVC
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    placeholder="123"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handlePayment}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Complete Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
