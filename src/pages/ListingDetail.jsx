import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/api/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch(() => alert("Failed to load listing"));
  }, [id]);

  const bookNow = async () => {
    if (!startDate || !endDate) return;

    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24)
    );

    if (days <= 0) return;

    try {
      setLoading(true);

      await API.post("/api/bookings", {
        listingId: listing._id,
        startDate,
        endDate,
        totalPrice: listing.price * days,
      });

      alert("Booking successful");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!listing) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      <p>{listing.location}</p>
      <p>₹{listing.price} / day</p>

      {listing.images?.map((img, i) => (
        <img key={i} src={img} width="200" />
      ))}

      <hr />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={bookNow} disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}

export default ListingDetail;