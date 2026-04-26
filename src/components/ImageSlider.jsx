import { useState } from "react";
import SafeImage from "./SafeImage";

const ImageSlider = ({ images = [], height = "h-56" }) => {
  const [index, setIndex] = useState(0);

  // fallback even when array empty
  const safeImages =
    images && images.length ? images : [null];

  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) =>
      i === 0 ? safeImages.length - 1 : i - 1
    );
  };

  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) =>
      i === safeImages.length - 1 ? 0 : i + 1
    );
  };

  return (
    <div className={`relative ${height} overflow-hidden`}>

      {/* 🔥 SAFE IMAGE */}
      <SafeImage
        src={safeImages[index]}
        className="h-full w-full object-cover"
      />

      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2
                       bg-white/80 h-8 w-8 rounded-full flex items-center justify-center"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2
                       bg-white/80 h-8 w-8 rounded-full flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;