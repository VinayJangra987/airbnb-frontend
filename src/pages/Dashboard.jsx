import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* My Listings */}
        <Link to="/dashboard" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">My Listings</h3>
          <p className="text-gray-500">View & manage your properties</p>
        </Link>

        {/* Add Listing */}
        <Link to="/add" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Add Listing</h3>
          <p className="text-gray-500">Create a new property listing</p>
        </Link>

        {/* My Bookings */}
        <Link to="/bookings" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">My Bookings</h3>
          <p className="text-gray-500">View your booking history</p>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;