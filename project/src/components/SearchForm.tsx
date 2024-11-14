import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

interface SearchFormProps {
  onSearch: (searchData: any) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 mr-2" />
            From
          </label>
          <input
            type="text"
            placeholder="Departure City"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 mr-2" />
            To
          </label>
          <input
            type="text"
            placeholder="Arrival City"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Users className="w-4 h-4 mr-2" />
            Passengers
          </label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>1 Passenger</option>
            <option>2 Passengers</option>
            <option>3 Passengers</option>
            <option>4+ Passengers</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Search Flights
      </button>
    </form>
  );
}