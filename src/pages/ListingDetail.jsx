import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageSlider from "../components/ImageSlider";
import Reviews from "../components/Reviews";

function ListingDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  // FETCH LISTING
  useEffect(() => {

    api.get(`/api/listings/${id}`)
      .then(res => setListing(res.data))
      .catch(() => toast.error("Failed to load listing"));

  }, [id]);

  // FETCH BOOKED DATES
  useEffect(() => {

    api.get(`/api/bookings/listing/${id}`)
      .then(res => setBookedDates(res.data))
      .catch(() => {});

  }, [id]);


  // DELETE LISTING
  const deleteListing = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/api/listings/${listing._id}`);

      toast.success("Listing deleted successfully");

      navigate("/");

    } catch (err) {

      toast.error("Delete failed");

    }

  };


  // BOOK PROPERTY
  const bookNow = async () => {

    if (!startDate || !endDate) {
      return toast.error("Select dates");
    }

    const selectedStart = new Date(startDate);
    const selectedEnd = new Date(endDate);

    const days = Math.ceil(
      (selectedEnd - selectedStart) /
      (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      return toast.error("Invalid dates");
    }

    // CHECK OVERLAP
    for (let booking of bookedDates) {

      const bookedStart = new Date(booking.startDate);
      const bookedEnd = new Date(booking.endDate);

      if (
        selectedStart <= bookedEnd &&
        selectedEnd >= bookedStart
      ) {
        return toast.error("Selected dates already booked ❌");
      }

    }

    try {

      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 2000));

      await api.post("/api/bookings", {
        listingId: listing._id,
        startDate,
        endDate,
        totalPrice: listing.price * days
      });

      toast.success("Payment successful 🎉 Booking confirmed!");

      setStartDate("");
      setEndDate("");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };


  if (!listing) return <div className="p-6">Loading...</div>;


  const days =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate) - new Date(startDate)) /
          (1000 * 60 * 60 * 24)
        )
      : 0;

  const total =
    days > 0 ? listing.price * days : 0;


  return (

    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* LEFT SIDE */}
      <div className="md:col-span-2">

        <h1 className="text-3xl font-semibold">
          {listing.title}
        </h1>

        <p className="text-gray-500">
          {listing.location}
        </p>

        <div className="mt-6">
          <ImageSlider
            images={listing.images || []}
            height="h-[420px]"
          />
        </div>


        {/* OWNER ACTIONS */}
        {userId && (userId === (listing.owner?._id || listing.owner)) && (

          <div className="flex gap-3 mt-4">

            <button
              onClick={() => navigate(`/listing/${listing._id}/edit`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit Listing
            </button>

            <button
              onClick={deleteListing}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete Listing
            </button>

          </div>

        )}

        <p className="mt-6">
          {listing.description}
        </p>


        {/* ⭐ REVIEWS SECTION */}
        <Reviews listingId={listing._id} />

      </div>


      {/* BOOKING CARD */}
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

        {days > 0 && (

          <div className="mt-4 text-sm text-gray-600">
            {days} days × ₹{listing.price} =
            <span className="font-semibold text-black">
              ₹{total}
            </span>
          </div>

        )}

        <button
          onClick={bookNow}
          disabled={loading}
          className="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl transition"
        >
          {loading
            ? "Processing Payment..."
            : "Pay & Book"}
        </button>

      </div>

    </div>

  );

}

export default ListingDetail;