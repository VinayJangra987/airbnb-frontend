import placeholder from "../assets/placeholder.jpg";

function SafeImage({ src, alt }) {
  return (
    <img
      src={src || placeholder}
      alt={alt}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholder;
      }}
      className="w-full h-full object-cover"
    />
  );
}

export default SafeImage;