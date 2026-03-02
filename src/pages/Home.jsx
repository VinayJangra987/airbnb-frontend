import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import ListingSkeleton from "../components/ListingSkeleton";
import SafeImage from "../components/SafeImage";

const LIMIT = 8;

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchListings = async (p = 1) => {
    setLoading(true);
    const { data } = await api.get(
      `/api/listings?page=${p}&limit=${LIMIT}`
    );
    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings(page);
  }, [page]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-[#f7f7f7] overflow-x-hidden">

      {/* HERO */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-3xl p-10 mb-8">
        <h1 className="text-4xl font-bold mb-2">Find your next stay</h1>
        <p className="opacity-90">Homes, stays & experiences</p>
      </div>

      {/* LISTINGS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: LIMIT }).map((_, i) => (
              <ListingSkeleton key={i} />
            ))
          : listings.map((l) => (
              <Link key={l._id} to={`/listing/${l._id}`}>
                <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                  <div className="h-56">
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