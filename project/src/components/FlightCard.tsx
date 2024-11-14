import React from 'react';
import { Clock, Plane } from 'lucide-react';

interface FlightCardProps {
  flight: {
    airline: string;
    flightNumber: string;
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
  };
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{flight.airline}</h3>
          <p className="text-sm text-gray-500">Flight {flight.flightNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
          <p className="text-sm text-gray-500">per person</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center flex-1">
          <p className="text-xl font-bold">{flight.departureTime}</p>
          <p className="text-sm text-gray-600">{flight.departure}</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full flex items-center">
            <div className="h-[2px] flex-1 bg-gray-300"></div>
            <Plane className="mx-2 text-blue-600 rotate-90" />
            <div className="h-[2px] flex-1 bg-gray-300"></div>
          </div>
        </div>

        <div className="text-center flex-1">
          <p className="text-xl font-bold">{flight.arrivalTime}</p>
          <p className="text-sm text-gray-600">{flight.arrival}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {flight.duration}
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Select
        </button>
      </div>
    </div>
  );
}