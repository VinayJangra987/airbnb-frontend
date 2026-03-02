import { Link, useLocation, useNavigate } from "react-router-dom";
import DarkToggle from "./DarkToggle";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const link = (p) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium ${
      pathname === p
        ? "bg-rose-100 text-rose-600"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
   <nav className="bg-white border-b sticky top-0 z-50 w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 h-16 flex items-center justify-between overflow-x-hidden">
        
        <Link to="/" className="text-xl font-bold text-rose-500">
          StayBnB
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/" className={link("/")}>Home</Link>

          {token && (
            <>
              <Link to="/dashboard" className={link("/dashboard")}>Dashboard</Link>
              <Link to="/add" className={link("/add")}>Add</Link>
              <Link to="/bookings" className={link("/bookings")}>Bookings</Link>
            </>
          )}

          <DarkToggle />

          {!token ? (
            <>
              <Link to="/login" className={link("/login")}>Login</Link>
              <Link
                to="/signup"
                className="ml-1 bg-rose-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="ml-2 bg-gray-100 px-4 py-1.5 rounded-lg text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;