import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/api/bookings/my").then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      {bookings.map((b) => (
        <div key={b._id}>
          <h4>{b.listing.title}</h4>
          <p>{b.listing.location}</p>
          <p>₹{b.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}