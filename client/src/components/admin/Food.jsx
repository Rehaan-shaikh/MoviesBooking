import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const FoodList = ({ foods, setFoods }) => {
  const handleDelete = async (foodId) => {
    // Note: The backend doesn't have a delete route yet.
    // This is a placeholder for when you implement it.
    // try {
    //   await axios.delete(`http://localhost:3000/api/food/delete/${foodId}`);
    //   setFoods(foods.filter(f => f._id !== foodId));
    //   toast.success("Food item deleted!");
    // } catch (error) {
    //   toast.error("Failed to delete food item.");
    // }
    toast.warn(`Delete functionality for ${foodId} is not yet implemented on the backend.`);
  };

  return (
    <div className="mt-14 lg:mt-0">
      <h2 className="text-2xl font-semibold mb-6 text-white text-center lg:text-left">Available Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {foods.length > 0 ? foods.map((food) => (
          <div
            key={food._id}
            className="bg-zinc-900/50 group relative text-white rounded-2xl overflow-hidden shadow-lg border border-zinc-700 transition-all duration-300 hover:border-primary/60 hover:-translate-y-1"
          >
            {food.image && (
              <div className="overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold truncate">{food.name}</h3>
              {food.description && (
                <p className="text-zinc-400 text-sm mt-1 h-10 overflow-hidden">{food.description}</p>
              )}
              <p className="text-primary font-semibold text-xl mt-3">₹{food.price}</p>
            </div>
             <button
                onClick={() => handleDelete(food._id)}
                className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity- transition-opacity duration-300 hover:bg-red-600"
                title="Delete Item"
              >
                <Trash2 size={16} />
              </button>
          </div>
        )) : (
            <p className="text-zinc-500 col-span-1 sm:col-span-2 text-center py-10">No food items found.</p>
        )}
      </div>
    </div>
  );
};
export default FoodList;