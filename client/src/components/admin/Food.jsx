import axios from "axios";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const FoodList = ({ foods, setFoods }) => {
  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`http://localhost:3000/api/food/delete/${foodId}`);
      setFoods(foods.filter(f => f._id !== foodId));
      toast.success("Food item deleted!");
    } catch (error) {
      toast.error("Failed to delete food item.");
      console.log(error);
      
    }
    // toast.warn(`Delete functionality for ${foodId} is not yet implemented on the backend.`);
  };

  return (
    <div className="mt-14 lg:mt-0">
      <h2 className="text-2xl font-semibold mb-6 text-white text-center lg:text-left">
        Available Items
      </h2>
      <div className="relative flex flex-wrap gap-6 max-w-6xl mx-auto">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div
              key={food._id}
              className="w-55 rounded-lg overflow-hidden h-full bg-primary/10 border border-primary/20 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:border-primary/60 relative group"
            >
              {food.image && (
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="p-3">
                <h3 className="text-lg font-semibold truncate">{food.name}</h3>
                {food.description && (
                  <p className="text-zinc-400 text-sm mt-1 h-10 overflow-hidden">
                    {food.description}
                  </p>
                )}
                <p className="text-primary font-semibold text-lg mt-2">₹{food.price}</p>
              </div>
              <button
                onClick={() => handleDelete(food._id)}
                className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full group-hover:opacity-100 opacity-90 transition-opacity duration-300 hover:bg-red-600"
                title="Delete Item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 col-span-1 sm:col-span-2 text-center py-10">
            No food items found.
          </p>
        )}
      </div>
    </div>
  );

};
export default FoodList;