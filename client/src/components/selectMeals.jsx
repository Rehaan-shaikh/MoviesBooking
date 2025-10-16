import React from "react";
import { Minus, Plus } from "lucide-react";

const SelectMeals = ({ foods, selectedFoods, setSelectedFoods }) => {
  if (!foods?.length)
    return (
      <div className="mt-16 text-center text-gray-400">
        <p>No food items available.</p>
      </div>
    );

  // ✅ helper: get quantity for each food
  const getQuantity = (foodId) => {
    const found = selectedFoods.find((f) => f.foodId === foodId);
    return found ? found.quantity : 0;
  };

  // ✅ helper: handle add/remove logic
  const updateQuantity = (foodId, change) => {
    setSelectedFoods((prev) => {
      const exists = prev.find((f) => f.foodId === foodId);

      if (exists) {
        const updated = prev.map((f) =>
          f.foodId === foodId
            ? { ...f, quantity: Math.max(0, f.quantity + change) }
            : f
        );
        return updated.filter((f) => f.quantity > 0);
      } else if (change > 0) {
        return [...prev, { foodId, quantity: 1 }];
      }
      return prev;
    });
  };

  return (
    <div className="mt-20 w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-6 text-center">🍿 Select Meals & Snacks</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => {
          const quantity = getQuantity(food._id);
          return (
            <div
              key={food._id}
              className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex flex-col items-center justify-between shadow-md hover:bg-primary/20 transition"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-20 h-20 object-cover rounded-full mb-3"
              />
              <h3 className="text-sm font-semibold text-center">{food.name}</h3>
              <p className="text-xs text-gray-400 mb-3">₹{food.price}</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(food._id, -1)}
                  className="p-1 border border-gray-500 rounded-full hover:bg-gray-700 active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => updateQuantity(food._id, +1)}
                  className="p-1 border border-gray-500 rounded-full hover:bg-gray-700 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectMeals;
