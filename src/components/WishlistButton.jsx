import { useState } from "react";
import api from "../api/axios";

const WishlistButton = ({ listingId, initialSaved }) => {
  const [saved, setSaved] = useState(initialSaved);

  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // ✅ FIX: /api/wishlist
      const { data } = await api.post(
        `/api/wishlist/${listingId}`
      );
      setSaved(data.saved);
    } catch (err) {
      console.error("Wishlist error:", err.response?.data || err.message);
    }
  };

  return (
    <button
      onClick={toggle}
      className="absolute top-3 right-3 text-2xl z-10"
    >
      {saved ? "❤️" : "🤍"}
    </button>
  );
};

export default WishlistButton;