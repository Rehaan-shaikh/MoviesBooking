import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodList from "../../components/admin/Food";
import { toast } from "react-toastify";

const AddFood = () => {
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);

  // Fetch all foods on component mount
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food");
        setFoods(res.data.foods);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFile(files[0]); // for file input
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (file) data.append("image", file);

      const res = await axios.post("http://localhost:3000/api/food/add", data, {
        // this below line Tells the backend: “Hey, this request contains file data along with text data.”
        // Without this, the server wouldn’t know how to parse the incoming file.
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast("Added Successfuly");
      setMessage(res.data.message);
      setFormData({ name: "", description: "", price: "" });
      setFile(null);

      // Refresh food list after adding new food
      setFoods((prev) => [res.data.food, ...prev]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error adding food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Add Food Form */}
      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-xl border border-gray-700 mx-auto mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-400">Add New Food Item 🍔</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Food Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-orange-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-orange-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-orange-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-orange-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white py-2 rounded font-semibold"
          >
            {loading ? "Adding..." : "Add Food"}
          </button>
        </form>

        {message && <p className="text-center mt-4 text-sm text-green-400">{message}</p>}
      </div>

      {/* Render Food List */}
      <FoodList foods={foods} />
    </div>
  );
};

export default AddFood;
