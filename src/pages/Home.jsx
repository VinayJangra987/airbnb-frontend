import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Home() {
  const [listings, setListings] = useState([]);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

 useEffect(() => {
  api.get("/api/listings")
    .then((res) => setListings(res.data))
    .catch(() => alert("Failed to load listings"));
}, []);

const searchListings = async () => {
  try {
    const { data } = await api.get(
      `/api/listings?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    setListings(data);
  } catch {
    alert("Search failed");
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>All Listings</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ marginLeft: 10 }}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ marginLeft: 10 }}
        />

        <button onClick={searchListings} style={{ marginLeft: 10 }}>
          Search
        </button>
      </div>

      {listings.length === 0 && <p>No listings found</p>}

      {listings.map((l) => (
        <div
          key={l._id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            borderRadius: 8,
            marginBottom: 15,
            maxWidth: 400,
          }}
        >
          <Link to={`/listing/${l._id}`} style={{ textDecoration: "none" }}>
            <h3>{l.title}</h3>
          </Link>

          <p>{l.location}</p>
          <p>₹{l.price} / day</p>

          {l.images?.length > 0 && (
            <img
              src={l.images[0]}
              alt={l.title}
              style={{ width: "100%", borderRadius: 6 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;