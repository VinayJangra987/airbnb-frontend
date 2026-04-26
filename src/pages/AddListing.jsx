import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

    try {

      const formData = new FormData();

      Object.keys(form).forEach((k) =>
        formData.append(k, form[k])
      );

      // append images
      for (let img of images) {
        formData.append("images", img);
      }

      await api.post("/api/listings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Listing added successfully");

      navigate("/");

    } catch (error) {

      console.log(error);
      toast.error("Failed to add listing");

    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-4">
        Add Listing
      </h1>

      <form onSubmit={submitHandler} className="flex flex-col gap-4">

        <input
          placeholder="Title"
          className="input"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          placeholder="Price"
          type="number"
          className="input"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          required
        />

        <input
          placeholder="Location"
          className="input"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          className="input"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <input
          type="file"
          multiple
          onChange={(e) =>
            setImages([...e.target.files])
          }
        />

        <button className="btn-primary">
          Add Listing
        </button>

      </form>

    </div>
  );
}

export default AddListing;