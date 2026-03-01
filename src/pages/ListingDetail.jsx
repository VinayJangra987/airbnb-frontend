import { useEffect, useState } from "react";
import API from "../api/axios"; // ✅ central axios
import { useParams } from "react-router-dom";

function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch single listing
  useEffect(() => {
    API.get(`/api/listings/${id}`)   // ✅ axios → API
      .then((res) => setListing(res.data))
      .catch(() => alert("Failed to load listing"));
  }, [id]);

  // 🔹 Book Now handler
  const bookNow = async () => {
    if (!startDate || !endDate) {
      alert("Please select start and end date");
      return;
    }

    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      alert("End date must be after start date");
      return;
    }

    try {
      setLoading(true);

      await API.post("/api/bookings", {   // ✅ axios → API
        listingId: listing._id,
        startDate,
        endDate,
        totalPrice: listing.price * days,
      });

      alert("Booking successful 🎉");
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
      <p><b>Location:</b> {listing.location}</p>
      <p><b>Price per day:</b> ₹{listing.price}</p>

      {listing.images?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          {listing.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="listing"
              width="200"
              style={{ marginRight: 10 }}
            />
          ))}
        </div>
      )}

      <hr />

      <h3>Book this place</h3>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <br /><br />

      <button onClick={bookNow} disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}

export default ListingDetail;