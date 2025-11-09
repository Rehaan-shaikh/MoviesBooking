import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodList from "../../components/admin/Food";
import { toast } from "react-toastify";
import Title from "./component/Title";
import { useForm } from "react-hook-form";
// import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, FileText, Package, UploadCloud } from "lucide-react";
import { foodSchema } from "../../lib/zod";


const AddFood = () => {
  const [preview, setPreview] = useState(null);
  const [foods, setFoods] = useState([]);

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(foodSchema),
  });

  // ✅ Fetch all foods function
  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/food");
      setFoods(res.data.foods);
    } catch (err) {
      toast.error("Could not fetch food items.");
      console.log(err);
    }
  };

  // ✅ Fetch foods on first render
  useEffect(() => {
    fetchFoods();
  }, []); // empty array ensures it runs only once


  // Watch file for preview
  const fileWatch = watch("image");
  useEffect(() => {
    if (fileWatch && fileWatch[0]) {
      const file = fileWatch[0];
      
      const reader = new FileReader(); // a built-in browser object that reads files (like images) from the user’s computer.
      reader.readAsDataURL(file);   // Start reading the selected file as a Data URL (base64 encoded string)
      // When the file is fully read, this event triggers
      reader.onloadend = () => // Store the read file data (base64 string) in preview state to show image preview
        setPreview(reader.result);
    } else {
      setPreview(null);
    }
  }, [fileWatch]);

  // ✅ Handle form submit
  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("image", data.image[0]);

      const res = await axios.post("http://localhost:3000/api/food/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Inform server about the data that it contains file
      });

      toast.success(res.data.message || "Food added successfully!");
      // setFoods((prev) => [res.data.food, ...prev]);
      reset();
      setPreview(null);
      fetchFoods(); // Refresh the food list to include the newly added item
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Error adding food";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-full p-2">
      <Title text1="Manage" text2="Food Items" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Add Food Form */}
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-white text-center lg:text-left">
            Add New Item
          </h2>
          <div className="bg-zinc-900/50 text-white p-6 rounded-xl shadow-lg border border-zinc-700/80">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="relative">
                <Package
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Food Name (e.g., Large Popcorn)"
                  className="w-full pl-10 p-2.5 rounded-md bg-zinc-800 border border-zinc-700 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="relative">
                <FileText
                  className="absolute left-3 top-3 text-zinc-500"
                  size={18}
                />
                <textarea
                  rows="3"
                  placeholder="A short description..."
                  className="w-full pl-10 p-2.5 rounded-md bg-zinc-800 border border-zinc-700 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="number"
                  placeholder="Price in ₹"
                  className="w-full pl-10 p-2.5 rounded-md bg-zinc-800 border border-zinc-700 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">Item Image</label>
                <div className="mt-1 flex justify-center rounded-lg border border-dashed border-zinc-500 px-4 py-6 hover:border-primary transition">
                  <div className="text-center">
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto h-20 w-20 object-cover rounded-lg"
                      />
                    )}

                    <div className="mt-3 text-sm leading-6 text-zinc-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-zinc-900 hover:text-primary-dull"
                      >
                        <span>Upload a file</span>
                        {!preview && (
                          <UploadCloud
                            className="mx-auto h-8 w-8 text-zinc-500"
                            aria-hidden="true"
                          />
                        )}
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          {...register("image")}
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
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dull transition-all text-white py-2.5 rounded-md font-semibold text-sm disabled:bg-zinc-600 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding..." : "Add Food Item"}
              </button>
            </form>
          </div>
        </div>

        {/* Render Food List */}
        <FoodList foods={foods} setFoods={setFoods}/>
      </div>
    </div>
  );

};

export default AddFood;
