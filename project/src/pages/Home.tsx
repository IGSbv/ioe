import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, MapPin } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    from: '',
    to: '',
    date: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/booking', { state: search });
  };

  return (
    <div className="relative">
      <div
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-indigo-900/70" />
        <div className="relative max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Your Journey Begins with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Iron Wings
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Book your flight today and experience comfort at new heights
            </p>
          </div>

          <div className="mt-10">
            <form
              onSubmit={handleSearch}
              className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-indigo-500" />
                    </div>
                    <input
                      type="text"
                      required
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Departure City"
                      value={search.from}
                      onChange={(e) =>
                        setSearch({ ...search, from: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-indigo-500" />
                    </div>
                    <input
                      type="text"
                      required
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Arrival City"
                      value={search.to}
                      onChange={(e) => setSearch({ ...search, to: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-indigo-500" />
                    </div>
                    <input
                      type="date"
                      required
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      value={search.date}
                      onChange={(e) =>
                        setSearch({ ...search, date: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose Iron Wings?
            </h2>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1540339832862-46d6f6c8b596?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Comfort"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Ultimate Comfort
                </h3>
                <p className="mt-2 text-gray-600">
                  Experience luxury at 30,000 feet with our premium seats and
                  service.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Safety"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Safety First
                </h3>
                <p className="mt-2 text-gray-600">
                  Your safety is our top priority with state-of-the-art aircraft
                  and trained crew.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Destinations"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Global Reach
                </h3>
                <p className="mt-2 text-gray-600">
                  Connect to over 150 destinations worldwide with our extensive
                  network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}