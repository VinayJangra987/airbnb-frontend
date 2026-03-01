import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  // 🔹 helper: future booking check
  const isFutureBooking = (startDate) => {
    return new Date(startDate) > new Date();
  };

  // 🔹 cancel booking handler
  const cancelBookingHandler = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://airbnb-backend-rvq9.onrender.com/:5000/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔥 update UI instantly (no refresh)
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  // 🔹 fetch listings (owner)
  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "https://airbnb-backend-rvq9.onrender.com/:5000/api/listings/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setListings(data);
    };

    fetchListings();
  }, []);

  // 🔹 fetch my bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "https://airbnb-backend-rvq9.onrender.com/:5000/api/bookings/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Dashboard</h2>

      {/* ===================== */}
      {/* MY LISTINGS */}
      {/* ===================== */}
      <h3>My Listings</h3>
      {listings.length === 0 && <p>No listings</p>}
      {listings.map((l) => (
        <div key={l._id}>
          <Link to={`/listing/${l._id}`}>{l.title}</Link>
        </div>
      ))}

      <hr />

      {/* ===================== */}
      {/* MY BOOKINGS */}
      {/* ===================== */}
      <h3>My Bookings</h3>
      {bookings.length === 0 && <p>No bookings</p>}

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p>
            <strong>{b.listing?.title}</strong>
          </p>
          <p>
            Dates: {b.startDate.slice(0, 10)} →{" "}
            {b.endDate.slice(0, 10)}
          </p>
          <p>Total: ₹{b.totalPrice}</p>

          <p>
            Status:{" "}
            <strong
              style={{
                color: b.status === "active" ? "green" : "red",
              }}
            >
              {b.status}
            </strong>
          </p>

          {/* ✅ Cancel button only for future active bookings */}
          {b.status === "active" &&
            isFutureBooking(b.startDate) && (
              <button
                onClick={() => cancelBookingHandler(b._id)}
                style={{
                  background: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel Booking
              </button>
            )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;