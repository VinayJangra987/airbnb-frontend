import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const cancelBookingHandler = async (id) => {
    await API.put(`/api/bookings/${id}/cancel`);
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
    );
  };

  useEffect(() => {
    API.get("/api/listings/me").then((res) => setListings(res.data));
    API.get("/api/bookings/my").then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>My Listings</h3>
      {listings.map((l) => (
        <Link key={l._id} to={`/listing/${l._id}`}>
          {l.title}
        </Link>
      ))}

      <h3>My Bookings</h3>
      {bookings.map((b) => (
        <div key={b._id}>
          <p>{b.listing?.title}</p>
          <p>{b.status}</p>
          {b.status === "active" && (
            <button onClick={() => cancelBookingHandler(b._id)}>
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;