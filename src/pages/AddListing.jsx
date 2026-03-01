import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddListing() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: ""
  });

  const [images, setImages] = useState([]); // ✅ ADD
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // ✅ FormData use karna hoga
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("location", form.location);
      formData.append("description", form.description);

      // ✅ images append
      for (let img of images) {
        formData.append("images", img);
      }

      const res = await axios.post(
        "https://airbnb-backend-rvq9.onrender.com/:5000/api/listings",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        }
      );

      console.log("ADD LISTING RESPONSE 👉", res.data);
      alert("Listing added successfully");
      navigate("/");
    } catch (err) {
      console.log("ADD LISTING ERROR 👉", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Add Listing</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />

      <input
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      {/* ✅ IMAGE INPUT */}
      <input
        type="file"
        multiple
        onChange={(e) => setImages(e.target.files)}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddListing;