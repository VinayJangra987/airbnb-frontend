import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddListing() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((k) => formData.append(k, form[k]));
    for (let img of images) formData.append("images", img);

    await api.post("/listings", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Location"
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
      <button>Add</button>
    </form>
  );
}

export default AddListing;