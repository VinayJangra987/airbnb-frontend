import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import ListingSkeleton from "../components/ListingSkeleton";
import SafeImage from "../components/SafeImage";
import HorizontalSection from "../components/HorizontalSection";

const LIMIT = 8;

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState("");

  const fetchListings = async (p = 1) => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/api/listings?page=${p}&limit=${LIMIT}&location=${location}`
      );
      setListings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(page);
  }, [page]);

  const searchListings = () => {
    setPage(1);
    fetchListings(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-[#f7f7f7] overflow-x-hidden">

      {/* AIRBNB SEARCH BAR */}
      <div className="bg-white rounded-full shadow-lg px-6 py-4 mb-12 flex items-center justify-between gap-4 max-w-4xl mx-auto">

        <div className="flex-1">
          <p className="text-xs font-semibold">Where</p>
          <input
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        <div className="flex-1">
          <p className="text-xs font-semibold">When</p>
          <input
            type="text"
            placeholder="Add dates"
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        <div className="flex-1">
          <p className="text-xs font-semibold">Who</p>
          <input
            type="text"
            placeholder="Add guests"
            className="w-full outline-none text-sm"
          />
        </div>

        <button
          onClick={searchListings}
          className="bg-rose-500 text-white p-3 rounded-full"
        >
          🔍
        </button>
      </div>

      {/* 🔥 HORIZONTAL SECTIONS */}
      {!loading && (
        <>
          <HorizontalSection
            title="Trending stays"
            listings={listings.slice(0, 8)}
          />

          <HorizontalSection
            title="Budget friendly"
            listings={listings.filter(l => l.price < 2000)}
          />

          <HorizontalSection
            title="Luxury stays"
            listings={listings.filter(l => l.price >= 5000)}
          />
        </>
      )}

      {/* GRID LISTINGS */}
      <h2 className="text-xl font-semibold mt-14 mb-6">
        All stays
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: LIMIT }).map((_, i) => (
              <ListingSkeleton key={i} />
            ))
          : listings.map((l) => (
              <Link key={l._id} to={`/listing/${l._id}`}>
                <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                  <div className="h-56 w-full overflow-hidden rounded-t-2xl">
                    <SafeImage src={l.images?.[0]} alt={l.title} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">
                      {l.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {l.location}
                    </p>
                    <p className="font-semibold mt-1 text-gray-900">
                      ₹{l.price} / day
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-5 py-2 rounded-lg bg-rose-500 text-white"
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Home;