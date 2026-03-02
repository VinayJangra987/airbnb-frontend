import { useRef } from "react";
import ListingCard from "./ListingCard";
import ScrollButton from "./ScrollButton";

const HorizontalSection = ({ title, listings }) => {
  const scrollRef = useRef(null);

  const handleScroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (!listings?.length) return null;

  return (
    <section className="relative mt-10">
      <h2 className="text-xl font-semibold mb-4 px-1">
        {title}
      </h2>

      <ScrollButton direction="left" onClick={() => handleScroll("left")} />
      <ScrollButton direction="right" onClick={() => handleScroll("right")} />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-1"
      >
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

export default HorizontalSection;