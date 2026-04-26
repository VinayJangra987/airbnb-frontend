import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function MyListings() {

  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  // fetch owner listings
  const fetchListings = async () => {
    try {
      const res = await api.get("/api/listings/me");
      setListings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // DELETE
  const deleteListing = async (id) => {

    const confirmDelete = window.confirm("Delete this listing?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/api/listings/${id}`);

      setListings(
        listings.filter((item) => item._id !== id)
      );

    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <h1 className="text-3xl font-semibold mb-6">
        My Listings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {listings.map((listing) => (

          <div
            key={listing._id}
            className="bg-white rounded-2xl shadow p-4"
          >

            <img
              src={listing.images?.[0]}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-semibold mt-3">
              {listing.title}
            </h3>

            <p className="text-gray-500">
              {listing.location}
            </p>

            <p className="font-bold">
              ₹ {listing.price}
            </p>

            <div className="flex gap-2 mt-3">

              {/* EDIT */}
              <button
                onClick={() =>
                  navigate(`/listing/${listing._id}/edit`)
                }
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() =>
                  deleteListing(listing._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default MyListings;