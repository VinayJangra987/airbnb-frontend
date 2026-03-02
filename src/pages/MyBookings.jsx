import { useEffect, useState } from "react";
import api from "../api/axios";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/api/bookings/my")
      .then((res) => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"));
  }, []);

  const cancelBooking = async (id) => {
    try {
      await api.put(`/api/bookings/${id}/cancel`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "cancelled" } : b
        )
      );
    } catch {
      alert("Cancel failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings yet</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* LEFT */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {b.listing?.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {formatDate(b.startDate)} → {formatDate(b.endDate)}
              </p>

              <p className="font-semibold mt-2">
                ₹{b.totalPrice}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  b.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {b.status}
              </span>

              {b.status === "active" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;