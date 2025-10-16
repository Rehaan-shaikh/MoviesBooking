/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BlurCircle from "../components/BlurCircle";
import { dateFormat } from "../lib/dateFormat";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    const res = await axios.get(`http://localhost:3000/api/booking/user`, {
      withCredentials: true,
    });
    setBookings(res.data.bookings); 
       
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  const baseUrl = "https://image.tmdb.org/t/p/w500";

  if (isLoading) {
    return <div className="text-center py-20 text-gray-400">Loading...</div>;
  }
    console.log(bookings);


  return (
    <div className="relative px-6 md:px-16 lg:px-40 md:pt-32">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="300px" left="500px" />

      <h1 className="text-lg font-semibold mb-6">My Bookings</h1>

      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-start bg-primary/8 border border-primary/20 rounded-lg mt-4 p-3 max-w-3xl w-full"
        >
          {/* Left section */}
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <img
              src={`${baseUrl}${item.show.movie.poster_path}`}
              alt="movie poster"
              className="w-full md:w-[150px] h-[200px] object-cover rounded-lg"
            />

            <div className="flex flex-col space-y-2 justify-between md:ml-3 mt-2 md:mt-0">
              <p className="text-lg font-semibold text-white">
                {item.show.movie.title}
              </p>              
              <p className="text-lg font-semibold text-white">
                Per ticket: ₹{item.show.showPrice}
              </p>
              <p className="text-gray-400 text-sm">
                {item.show.movie.runtime} min
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {dateFormat(item.show.showDateTime)}
              </p>

              {/* 🎟️ Seats Info */}
              <div className="text-sm mt-2 space-y-1">
                <p>
                  <span className="text-gray-400">Tickets:</span>{" "}
                  {item.bookedSeats.length}
                </p>
                <p>
                  <span className="text-gray-400">Seats:</span>{" "}
                  {item.bookedSeats.join(", ")}
                </p>
              </div>

              {/* 🍔 Food Items */}
              {item.foods && item.foods.length > 0 && (
                <div className="mt-3">
                  <p className="text-gray-300 font-medium mb-1">
                    Food Items Ordered:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    {item.foods.map((foodItem, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <img
                          src={foodItem.food.image}
                          alt={foodItem.food.name}
                          className="w-8 h-8 rounded object-cover border border-primary/20"
                        />
                        <span className="text-white">
                          {foodItem.food.name.trim()}
                        </span>
                        <span className="text-gray-400">x{foodItem.quantity}</span>
                        <span className="ml-auto text-gray-300">
                          ₹{foodItem.food.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col space-y-2 md:items-end md:text-right justify-between mt-3 md:mt-0 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold text-white">
                Total ₹{item.amount}
              </p>
              {!item.isPaid && (
                <button className="bg-gradient-to-r from-[#ff4b5c] to-[#ff728b] px-3 py-1 text-sm rounded-full font-medium cursor-pointer text-white shadow-md">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
