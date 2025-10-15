import React from "react";

const FoodList = ({ foods }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {foods.map((food) => (
        <div
          key={food._id}
          className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg border border-gray-700"
        >
          {food.image && (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{food.name}</h3>
            {food.description && (
              <p className="text-gray-300 text-sm mb-2">{food.description}</p>
            )}
            <p className="text-orange-400 font-semibold">₹{food.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
