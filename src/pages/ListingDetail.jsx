import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch single listing
  useEffect(() => {
    axios
      .get(`https://airbnb-backend-rvq9.onrender.com/:5000/api/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => {
        console.log(err);
        alert("Failed to load listing");
      });
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

      await axios.post(
        "https://airbnb-backend-rvq9.onrender.com/:5000/api/bookings",
        {
          listingId: listing._id,
          startDate,
          endDate,
          totalPrice: listing.price * days,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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

      <p>
        <b>Location:</b> {listing.location}
      </p>

      <p>
        <b>Price per day:</b> ₹{listing.price}
      </p>

      {/* 🔹 Images */}
      {listing.images && listing.images.length > 0 && (
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

      <label>Start Date:</label>
      <br />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <br /><br />

      <label>End Date:</label>
      <br />
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