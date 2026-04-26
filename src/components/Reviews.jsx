import { useState, useEffect } from "react";
import api from "../api/axios";

function Reviews({ listingId }) {

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {

    api.get(`/api/reviews/${listingId}`)
      .then(res => setReviews(res.data));

  }, [listingId]);

  const submitReview = async () => {
  try {
    await api.post(`/api/reviews/${listingId}`, {
      rating,
      comment
    });

    window.location.reload();

  } catch (err) {
    console.log(err);
    alert("Review failed");
  }
};

  return (

    <div className="mt-10">

      <h2 className="text-xl font-semibold mb-4">
        Reviews
      </h2>

      <div className="space-y-3">

        {reviews.map(r => (

          <div key={r._id} className="border p-3 rounded">

            <p className="font-semibold">
              {r.user.name}
            </p>

            <p>⭐ {r.rating}</p>

            <p>{r.comment}</p>

          </div>

        ))}

      </div>

      <div className="mt-6 space-y-2">

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />

        <textarea
          placeholder="Write review"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <button
          onClick={submitReview}
          className="bg-rose-500 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>

      </div>

    </div>

  );

}

export default Reviews;