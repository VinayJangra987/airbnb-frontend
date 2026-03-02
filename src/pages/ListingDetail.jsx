import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/api/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch(() => toast.error("Failed to load listing"));
  }, [id]);

  const bookNow = async () => {
    if (!startDate || !endDate) return toast.error("Select dates");

    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24)
    );
    if (days <= 0) return toast.error("Invalid dates");

    try {
      setLoading(true);
      await api.post("/api/bookings", {
        listingId: listing._id,
        startDate,
        endDate,
        totalPrice: listing.price * days,
      });
      toast.success("Booking successful");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!listing) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-semibold">{listing.title}</h1>
        <p className="text-gray-500">{listing.location}</p>

        {listing.images?.[0] && (
          <img
            src={listing.images[0]}
            className="w-full h-[420px] object-cover rounded-2xl mt-6"
          />
        )}

        <div className="grid grid-cols-2 gap-3 mt-3">
          {listing.images?.slice(1).map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-48 w-full object-cover rounded-xl"
            />
          ))}
        </div>

        <p className="mt-6">{listing.description}</p>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-lg h-fit sticky top-24">
        <p className="text-xl font-semibold">
          ₹{listing.price}
          <span className="text-gray-500"> / day</span>
        </p>

        <input
          type="date"
          className="input mt-4"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="input mt-3"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          onClick={bookNow}
          disabled={loading}
          className="btn-primary w-full mt-4"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
}

export default ListingDetail;