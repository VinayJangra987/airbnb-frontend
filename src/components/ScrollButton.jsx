const ScrollButton = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-10
                 bg-white dark:bg-zinc-800 shadow-lg rounded-full
                 h-9 w-9 items-center justify-center"
      style={{ [direction === "left" ? "left" : "right"]: "-16px" }}
    >
      {direction === "left" ? "‹" : "›"}
    </button>
  );
};

export default ScrollButton;