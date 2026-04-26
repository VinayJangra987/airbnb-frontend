import placeholder from "../assets/placeholder.jpg";

const FALLBACKS = [
  placeholder,
  "https://picsum.photos/600/400?1",
  "https://picsum.photos/600/400?2",
];

function SafeImage({ src, alt }) {
  const randomFallback =
    FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];

  return (
    <img
      src={src || randomFallback}
      alt={alt}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = randomFallback;
      }}
      className="w-full h-full object-cover"
    />
  );
}

export default SafeImage;