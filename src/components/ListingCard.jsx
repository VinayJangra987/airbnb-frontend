// import { Link } from "react-router-dom";
// import SafeImage from "./SafeImage";

// const ListingCard = ({ listing }) => {
//   return (
//     <Link
//       to={`/listing/${listing._id}`}
//       className="min-w-[260px] max-w-[260px]"
//     >
//       <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden">
        
//         <div className="h-44 w-full">
//           <SafeImage
//             src={listing.images?.[0]}
//             alt={listing.title}
//             className="h-full w-full object-cover"
//           />
//         </div>

//         <div className="p-3 space-y-1">
//           <h3 className="font-semibold text-sm truncate">
//             {listing.title}
//           </h3>

//           <p className="text-gray-500 text-xs truncate">
//             {listing.location}
//           </p>

//           <p className="font-semibold">
//             ₹{listing.price}
//             <span className="text-gray-500 font-normal text-sm">
//               {" "} / night
//             </span>
//           </p>
//         </div>

//       </div>
//     </Link>
//   );
// };

// export default ListingCard;


import { Link } from "react-router-dom";
import SafeImage from "./SafeImage";
import WishlistButton from "./WishlistButton";

const ListingCard = ({ listing }) => {
  return (
    <Link
      to={`/listing/${listing._id}`}
      className="min-w-[260px] max-w-[260px] relative"
    >
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden relative">

        <WishlistButton
          listingId={listing._id}
          initialSaved={listing.isWishlisted}
        />

        <div className="h-44">
          <SafeImage
            src={listing.images?.[0]}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
        </div>

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