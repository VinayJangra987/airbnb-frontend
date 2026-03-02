import { useEffect, useState } from "react";

function DarkToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-700"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default DarkToggle;