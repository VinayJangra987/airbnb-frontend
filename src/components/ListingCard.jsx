import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";

const ListingCard = ({ listing }) => {
  return (
    <Link
      to={`/listing/${listing._id}`}
      className="min-w-[260px] max-w-[260px]"
    >
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

        {/* IMAGE SLIDER */}
        <ImageSlider
          images={listing.images || []}
          height="h-44"
        />

        <div className="p-3">
          <h3 className="font-semibold text-sm truncate">
            {listing.title}
          </h3>

          <p className="text-xs text-gray-500 truncate">
            {listing.location}
          </p>

          <p className="font-semibold">
            ₹{listing.price}
            <span className="text-sm font-normal"> / night</span>
          </p>
        </div>

      </div>
    </Link>
  );
};

export default ListingCard;