import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodList from "../../components/admin/Food";
import { toast } from "react-toastify";
import Title from "./component/Title";
import { DollarSign, FileText, Package, UploadCloud } from "lucide-react";

const AddFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
        toast.error("Could not fetch food items.");
      }
    };
    fetchFoods();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
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
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Added Successfully");

      setFormData({ name: "", description: "", price: "" });
      setFile(null);
      setPreview(null);
      e.target.reset(); // Reset file input

      // Refresh food list after adding new food
      setFoods((prev) => [res.data.food, ...prev]);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Error adding food";
      toast.error(errorMessage);
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full p-2">
      <Title text1="Manage" text2="Food Items" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Add Food Form */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center lg:text-left">
            Add New Item
          </h2>
          <div className="bg-zinc-900/50 text-white p-8 rounded-2xl shadow-xl border border-zinc-700/80">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <Package
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Food Name (e.g., Large Popcorn)"
                  className="w-full pl-10 p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition"
                />
              </div>

              <div className="relative">
                <FileText
                  className="absolute left-3 top-3 text-zinc-500"
                  size={20}
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="A short description..."
                  className="w-full pl-10 p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition"
                />
              </div>

              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={20}
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Price in ₹"
                  className="w-full pl-10 p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Item Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-zinc-500 px-6 py-10 hover:border-primary transition">
                  <div className="text-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto h-24 w-24 object-cover rounded-lg"
                      />
                    ) : (
                      <UploadCloud
                        className="mx-auto h-12 w-12 text-zinc-500"
                        aria-hidden="true"
                      />
                    )}
                    <div className="mt-4 text-sm leading-6 text-zinc-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-zinc-900 hover:text-primary-dull"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-zinc-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dull transition-all text-white py-3 rounded-lg font-semibold text-base disabled:bg-zinc-600 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Add Food Item"}
              </button>
            </form>

            {message && (
              <p
                className={`text-center mt-4 text-sm ${
                  message.includes("Error") ? "text-red-400" : "text-green-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Render Food List */}
        <FoodList foods={foods} setFoods={setFoods} />
      </div>
    </div>
  );
};

export default AddFood;
