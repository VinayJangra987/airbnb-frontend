import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });

  useEffect(() => {
    api.get(`/listings/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/listings/${id}`, form);
    navigate(`/listing/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} />
      <input name="location" value={form.location} onChange={handleChange} />
      <input name="price" value={form.price} onChange={handleChange} />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditListing;