import { useEffect, useState } from "react";
import api from "../api/axios";
import ListingCard from "../components/ListingCard";

const Wishlist = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/wishlist").then((res) => setItems(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6">
        My Wishlist ❤️
      </h1>

      <div className="flex flex-wrap gap-6">
        {items.map((l) => (
          <ListingCard key={l._id} listing={l} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;