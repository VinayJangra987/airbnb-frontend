import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden">
        
        <img
          src={listing.images?.[0]}
          alt=""
          className="h-56 w-full object-cover"
        />

        <div className="p-4 space-y-1">
          <h3 className="font-semibold text-lg">
            {listing.title}
          </h3>

          <p className="text-gray-500 text-sm">
            {listing.location}
          </p>

          <p className="font-semibold">
            ₹{listing.price}
            <span className="text-gray-500 font-normal"> / night</span>
          </p>
        </div>

      </div>
    </Link>
  );
};

export default ListingCard;