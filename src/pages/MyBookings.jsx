import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("https://airbnb-backend-rvq9.onrender.com/api/bookings/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map(b => (
        <div key={b._id}>
          <h4>{b.listing.title}</h4>
          <p>{b.listing.location}</p>
          <p>Total: ₹{b.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}