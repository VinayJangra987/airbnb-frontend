import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import AddListing from "./pages/AddListing";
import ListingDetail from "./pages/ListingDetail";
import EditListing from "./pages/EditListing";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

// 🔐 Protected Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listing/:id" element={<ListingDetail />} />

        {/* Protected */}
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddListing />
            </PrivateRoute>
          }
        />

        <Route
          path="/listing/:id/edit"
          element={
            <PrivateRoute>
              <EditListing />
            </PrivateRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;